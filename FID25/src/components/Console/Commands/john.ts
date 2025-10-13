import { textLine, textWord } from 'crt-terminal';
import type { Command } from '../types/command';

const john = "\n█████████████████████████\n█████████████████████████\n██████████████████  █████\n█████  ███████████  █████\n█████  ██████████████████\n█████████████████████████\n█████████████████████████\n████ ████████████  ██████\n████   █████████  ███████\n██████           ████████\n█████████████████████████\n█████████████████████████\n"

export const command: Command = {
    name: 'john',
    description: 'john',
    usage: 'john',
    async execute({ handlers }) {
        handlers.print([
            textLine({
                words: [textWord({ characters: john })],
            }),
        ]);
    }
}

