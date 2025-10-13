import { textLine, textWord } from 'crt-terminal';
import type { Command } from '../types/command';

const cowArt = "\n ________________________________________\n( The best cure for insomnia is to get a )\n( lot of sleep. -W.C. Fields             )\n ----------------------------------------\n        o   ^__^\n         o  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||";

export const command: Command = {
    name: 'cow',
    description: 'Display a wise cow',
    usage: 'cow',
    async execute({ handlers }) {
        handlers.print([
            textLine({
                words: [textWord({ characters: cowArt })],
            }),
        ]);
    },
};
