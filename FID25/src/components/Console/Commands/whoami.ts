// Commands/creepy-whoami.ts
import { textLine, textWord } from 'crt-terminal';
import type { Command } from '../types/command';

function line(s: string) {
    return textLine({ words: [textWord({ characters: s })] });
}
function short(s: string, max = 120) {
    if (!s) return '';
    return s.length > max ? s.slice(0, max - 3) + '...' : s;
}

/**
 * Attempt to get GPU renderer (may be blocked in some browsers)
 */
function getGPUInfo(): string {
    try {
        const canvas = document.createElement('canvas');
        // try webgl2 then webgl
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return 'unavailable';
        const ext = (gl as any).getExtension && (gl as any).getExtension('WEBGL_debug_renderer_info');
        if (ext) {
            // may reveal vendor/renderer
            const vendor = (gl as WebGLRenderingContext).getParameter(ext.UNMASKED_VENDOR_WEBGL);
            const renderer = (gl as WebGLRenderingContext).getParameter(ext.UNMASKED_RENDERER_WEBGL);
            return `${vendor || 'unknown'} / ${renderer || 'unknown'}`;
        }
        return 'webgl (masked)';
    } catch (e) {
        return 'error';
    }
}

/**
 * Try to gather local IPs via a WebRTC trick.
 * NOTE: browsers increasingly block this. May return [].
 */
async function getLocalIPs(timeoutMs = 3000): Promise<string[]> {
    const ips = new Set<string>();
    // Only run if RTCPeerConnection exists
    const RTCP = (window as any).RTCPeerConnection || (window as any).mozRTCPeerConnection || (window as any).webkitRTCPeerConnection;
    if (!RTCP) return [];
    try {
        const pc = new RTCP({
            iceServers: []
        });

        // create a bogus data channel to ensure ICE gathering
        try { pc.createDataChannel(''); } catch (e) { /* ignore */ }

        pc.onicecandidate = (evt: any) => {
            if (!evt || !evt.candidate) return;
            const candidate = evt.candidate.candidate || '';
            // candidate strings contain IPs; extract them
            const parts = candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3})|([a-f0-9:]{2,})/gi);
            if (parts) parts.forEach((p: string) => ips.add(p));
        };

        // create offer and set local description to trigger ICE
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        // wait up to timeoutMs for candidates
        await new Promise<void>((res) => setTimeout(() => res(), timeoutMs));

        try { pc.close(); } catch (e) { /* ignore */ }
        return Array.from(ips);
    } catch (e) {
        return [];
    }
}

/**
 * Try to enumerate media devices (labels require permission)
 */
async function getMediaDevicesInfo(): Promise<string[]> {
    try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return ['unavailable'];
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.map(d => `${d.kind}${d.label ? `: ${short(d.label, 80)}` : ''}`);
    } catch (e) {
        return ['permission-required-or-unavailable'];
    }
}

export const command: Command = {
    name: 'whoami',
    description: 'shows information about user',
    usage: 'whoami',
    async execute({ handlers }) {
        // quick wrapper to print multiple lines
        const p = (s: string) => handlers.print([line(s)]);

        p(`— Who ${Math.random() < 1 / 3 ? "Are You" : "Am I"} —`);

        // Navigator / UA
        try {
            p(`userAgent: ${short(navigator.userAgent || 'unknown')}`);
            p(`platform: ${navigator.platform || 'unknown'}`);
            p(`vendor: ${(navigator as any).vendor || 'unknown'}`);
            p(`product: ${(navigator as any).product || 'unknown'}`);
            p(`language(s): ${Array.isArray(navigator.languages) ? navigator.languages.join(', ') : navigator.language || 'unknown'}`);
            p(`cookieEnabled: ${navigator.cookieEnabled ? 'yes' : 'no'}`);
            p(`doNotTrack: ${navigator.doNotTrack ?? (navigator as any).msDoNotTrack ?? 'unknown'}`);
            p(`online: ${navigator.onLine ? 'online' : 'offline'}`);
        } catch (e) {
            p('navigator: error reading properties');
        }

        // Timezone
        try { p(`timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown'}`); } catch (e) { p('timezone: error'); }

        // Screen
        try {
            p(`screen: ${screen.width}x${screen.height} @ ${screen.colorDepth}bit`);
            p(`pixelRatio: ${window.devicePixelRatio ?? 'unknown'}`);
            p(`touchPoints: ${navigator.maxTouchPoints ?? 0}`);
        } catch (e) { p('screen: error'); }

        // Hardware hints
        try {
            p(`hwConcurrency (logical CPU): ${navigator.hardwareConcurrency ?? 'unknown'}`);
            p(`deviceMemory (GB, approx): ${(navigator as any).deviceMemory ?? 'unknown'}`);
        } catch (e) { p('hardware: error'); }

        // Connection / battery
        try {
            const conn = (navigator as any).connection;
            if (conn) {
                p(`connection: type=${conn.effectiveType || 'unknown'} downlink=${conn.downlink ?? 'unknown'} rtt=${conn.rtt ?? 'unknown'}`);
            } else {
                p('connection: not-available');
            }
        } catch (e) { p('connection: error'); }

        try {
            if ((navigator as any).getBattery) {
                (navigator as any).getBattery().then((b: any) => {
                    p(`battery: level=${Math.round(b.level * 100)}% charging=${b.charging ? 'yes' : 'no'}`);
                }).catch(() => p('battery: error'));
            } else {
                p('battery: not-supported');
            }
        } catch {
            p('battery: error');
        }

        // Cookies / local storage / session storage keys count (no content)
        try {
            p(`cookies: ${document.cookie ? 'present' : 'none'}`);
            // count local/session storage keys but avoid reading values
            p(`localStorage keys: ${Object.keys(localStorage || {}).length}`);
            p(`sessionStorage keys: ${Object.keys(sessionStorage || {}).length}`);
        } catch (e) {
            p('storage: unavailable');
        }

        // GPU info (may be masked)
        try {
            p(`gpu: ${getGPUInfo()}`);
        } catch {
            p('gpu: error');
        }

        // MIME types and plugins (often empty/blocked)
        try {
            const mimes = navigator.mimeTypes ? Array.from(navigator.mimeTypes).slice(0, 6).map(m => m.type) : [];
            p(`mimeTypes (sample): ${mimes.length ? mimes.join(', ') : 'none'}`);
            const plugs = navigator.plugins ? Array.from(navigator.plugins).slice(0, 6).map(p => p.name) : [];
            p(`plugins (sample): ${plugs.length ? plugs.join(', ') : 'none'}`);
        } catch { p('plugins/mimetypes: error'); }

        // WebRTC: local IPs (may be blocked by browser)
        p('gathering local network candidates (may be blocked)...');
        const localIPs = await getLocalIPs().catch(() => []);
        if (localIPs.length) {
            p(`local IPs (raw): ${localIPs.join(', ')}`);
        } else {
            p('local IPs: none-revealed (browser likely blocked)');
        }

        // Media Devices (labels require camera/mic permission in many browsers)
        p('enumerating media devices (labels may be empty without permission)...');
        const mdev = await getMediaDevicesInfo().catch(() => ['error']);
        mdev.slice(0, 20).forEach(d => p(`media: ${d}`));

        // small "creepy id" — deterministic-ish using UA/time + randomness
        try {
            const seed = (navigator.userAgent || '') + (navigator.platform || '') + Math.round(Math.random() * 1e9);
            const id = '█' + Math.abs(hashCode(seed)).toString(16).padStart(8, '0');
            p(`creep-id: ${id}`);
        } catch { p('creep-id: error'); }


        // helper: simple hash
        function hashCode(s: string) {
            let h = 0;
            for (let i = 0; i < s.length; i++) {
                h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
            }
            return h;
        }
    },
};

export default command;
