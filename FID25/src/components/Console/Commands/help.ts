import { textLine, textWord } from 'crt-terminal';
import type { Command } from '../types/command';

export const command: Command = {
    name: 'help',
    description: 'Shows a list of available commands.',
    usage: 'help [page | commandName]',
    async execute({ handlers, args }) {

        const commandModules = import.meta.glob('../Commands/*.ts', { eager: true });

        const blacklist = [''];
        const allCommands: Command[] = [];

        for (const path in commandModules) {
            const mod: any = commandModules[path];
            if (mod.command && !blacklist.includes(mod.command.name)) {
                allCommands.push(mod.command);
            }
        }

        if (args.length > 0) {
            const arg = args[0];
            const page = Number(arg);

            if (!isNaN(page)) {
                const pageSize = 5;
                const start = (page - 1) * pageSize;
                const end = start + pageSize;
                const commandsOnPage = allCommands.slice(start, end);

                if (commandsOnPage.length === 0) {
                    handlers.print([
                        textLine({
                            words: [textWord({ characters: `No commands found on page ${page}.` })],
                        }),
                    ]);
                    return;
                }

                handlers.print([
                    textLine({
                        words: [textWord({
                            characters: `help page ${page}`
                        })],
                    }),
                    textLine({
                        words: [
                            textWord({ characters: '' })
                        ],
                    }),
                ]);

                commandsOnPage.forEach(cmd => {
                    handlers.print([
                        textLine({
                            words: [
                                textWord({ characters: `${cmd.name} — ${cmd.description}` }),
                            ],
                        }),
                    ]);
                });

                return;
            }

            const target = allCommands.find(c => c.name.toLowerCase() === arg.toLowerCase());
            if (target) {
                handlers.print([
                    textLine({
                        words: [
                            textWord({ characters: `Command: ${target.name}` }),
                        ],
                    }),
                    textLine({
                        words: [
                            textWord({ characters: `Description: ${target.description}` }),
                        ],
                    }),
                    textLine({
                        words: [
                            textWord({ characters: `Usage: ${target.usage || 'No usage info'}` }),
                        ],
                    }),
                ]);
                return;
            }

            handlers.print([
                textLine({
                    words: [textWord({ characters: `Unknown command or page: ${arg}` })],
                }),
            ]);
            return;
        }

        const firstPage = allCommands.slice(0, 5);
        handlers.print([
            textLine({
                words: [
                    textWord({ characters: 'help page 1' })
                ],
            }),
            textLine({
                words: [
                    textWord({ characters: '' })
                ],
            }),
        ]);
        firstPage.forEach(cmd => {
            handlers.print([
                textLine({
                    words: [
                        textWord({ characters: `${cmd.name} — ${cmd.description}` }),
                    ],
                }),
            ]);
        });
    },
};
