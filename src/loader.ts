import chalk from "chalk";
import readline from "readline";

export class Loader {
  private frames: string[];
  private interval: Timer | undefined;
  private currentFrame: number;

  constructor() {
    this.frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    this.currentFrame = 0;
  }

  start(message = "thinking...") {
    this.currentFrame = 0;

    this.interval = setInterval(() => {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);

      const str = `${this.frames[this.currentFrame]} ${message}`;
      process.stdout.write(chalk.gray(str));

      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }, 80);
  }

  stop() {
    clearInterval(this.interval);

    readline.clearLine(process.stdout, 0);

    readline.cursorTo(process.stdout, 0);
  }
}

export const loader = new Loader();
