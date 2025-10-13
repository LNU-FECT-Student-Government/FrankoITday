import { textLine, textWord } from 'crt-terminal';
import type { Command } from '../types/command';

export const command: Command = {
    name: 'yes',
    description: 'prints out "yes"',
    usage: 'yes [ -c | -n ] [ int | none ]',
    async execute({ handlers, args, flags }) {
        const response = flags.find(flags => flags === '-n') ? 'no' : 'yes';
        if (args.length > 0) {
            const arg = args[0];
            const count = Number(arg);

            if (!isNaN(count)) {
                for (let i = 0; i < count; i++) {
                    handlers.print([
                        textLine({
                            words: [textWord({ characters: response })],
                        }),
                    ]);
                }
            }
        } else {
            handlers.print([
                textLine({
                    words: [textWord({ characters: response })],
                }),
            ]);
        }
    }
}
