export interface CommandContext {
  args: string[];
  flags: string[];
  fullCommand: string;
  handlers: any;
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  execute: (context: CommandContext) => void;
}
