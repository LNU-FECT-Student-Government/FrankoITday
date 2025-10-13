// CmdHandler.ts
import { textLine, textWord } from 'crt-terminal';
import type { Command } from './types/command';

// Preload all commands (Vite will bundle them automatically)
const commandModules = import.meta.glob('./Commands/*.ts', { eager: true });

function parseInput(input: string) {
    const parts = input.trim().split(/\s+/);
    const name = parts.shift() || '';
    const flags = parts.filter((p) => p.startsWith('-'));
    const args = parts.filter((p) => !p.startsWith('-'));
    return { name, args, flags, fullCommand: input };
}

export async function CmdHandler(
    input: string,
    handlers: {
        print: (lines: any[]) => void
        lock: (payload: boolean) => void
        loading: (payload: boolean) => void
        clear: (payload: boolean) => void
        focus: (payload: boolean) => void
    }
) {
    const { name, args, flags, fullCommand } = parseInput(input);

    // Capitalize first letter to match file names (Cow.ts, Encode.ts, etc.)
    const fileKey = `./Commands/${name}.ts`;

    const module = commandModules[fileKey] as { command: Command } | undefined;

    if (!module) {
        handlers.print([
            textLine({
                words: [textWord({ characters: `Unknown command: ${name}` })],
            }),
        ]);
    } else {
        const { command } = module;
        if (typeof command.execute === 'function') {
            await command.execute({
                args,
                flags,
                fullCommand,
                handlers
            });
        } else {

        }
    }
}

export default CmdHandler;
