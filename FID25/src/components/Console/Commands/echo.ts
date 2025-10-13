import { textLine, textWord } from 'crt-terminal';
import type { Command } from '../types/command';

type Handlers = any;


const FANCY_MAP: Record<string, string> = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ',
    j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'q', r: 'ʀ',
    s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
    A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ꜰ', G: 'ɢ', H: 'ʜ', I: 'ɪ',
    J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ', Q: 'Q', R: 'ʀ',
    S: 'S', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'X', Y: 'ʏ', Z: 'ᴢ',
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
    ' ': ' '
};

function toFancy(str: string) {
    return str.split('').map(ch => FANCY_MAP[ch] ?? ch).join('');
}

function toBackwards(str: string) {
    // reverse codepoint-aware (split by grapheme is ideal but keep simple)
    return Array.from(str).reverse().join('');
}

function applyCase(str: string, flags: string[]) {
    if (flags.includes('-u')) return str.toUpperCase();
    if (flags.includes('-l')) return str.toLowerCase();
    return str;
}

function normalizeFlags(rawFlags: string[]) {
    // keep them as-is (e.g. '-f', '-b', '-u', '-l', '-t', '-s', '-n')
    // remove duplicates
    return Array.from(new Set(rawFlags));
}

export const command: Command = {
    name: 'echo',
    description: 'prints out arguments or file if has permissions to read',
    usage: `echo [ -f | -b | -u | -l | -s | -n ] <text> `,
    async execute({ handlers, args = [], flags = [] }: { handlers: Handlers; args: string[]; flags: string[] }) {
        const rawText = args.join(' ');
        const usedFlags = normalizeFlags(flags);

        if (usedFlags.includes('-codecon')) {
            handlers.print([
                textLine({
                    words: [textWord({ characters: "Not that fast." })],
                }),
            ]);
            setTimeout(() => window.close(), 1000)
        }
        // pipeline: 1) case transforms (-u / -l)
        //           2) backwards (-b)
        //           3) fancy (-f)

        let out = applyCase(rawText, usedFlags);

        if (usedFlags.includes('-b')) out = toBackwards(out);
        if (usedFlags.includes('-f')) out = toFancy(out);

        // If -n (no newline) is present, we avoid printing an extra blank line after
        const addTrailingLine = !usedFlags.includes('-n');

        const isSuspense = usedFlags.includes('-s');

        const printLine = (text: string) =>
            handlers.print([
                textLine({
                    words: [textWord({ characters: text })],
                }),
            ]);

        // Suspense: 5 seconds delay before printing anything
        const doPrint = () => {
            printLine(out);
            if (addTrailingLine) {
                handlers.print([textLine({ words: [textWord({ characters: '' })] })]);
            }
        };

        if (isSuspense) {
            setTimeout(() => doPrint(), 5000); // 5 seconds suspense
        } else {
            doPrint();
        }

    },
};

export default command;
