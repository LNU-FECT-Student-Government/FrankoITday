import { Terminal, useEventQueue, textLine, textWord } from 'crt-terminal';
import CmdHandler from '../Console/CmdHandler';

function Console() {
    const eventQueue = useEventQueue();
    const { print, lock, loading, clear, focus } = eventQueue.handlers; // Extract the print handler

    const handleCommand = async (input: string) => {
        await CmdHandler(input, { print, lock, loading, clear, focus });
    };



    return (
        <div className="h-screen w-screen bg-black hue-rotate-90">
            <Terminal
                queue={eventQueue}
                onCommand={handleCommand}
                banner={[
                    textLine({ words: [textWord({ characters: 'rejected' })] }),
                ]}
            />

        </div>
    );
}

export default Console;