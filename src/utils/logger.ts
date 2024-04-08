import chalk from 'chalk';

type LogLevel = 'info' | 'error' | 'warning' | 'debug';

class Logger {
  private context: string;

  constructor(context = 'HADES') {
    this.context = context;
  }

  private getCurrentTimestamp(date = new Date()): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private log(level: string, message: string): void {
    const timestamp = this.getCurrentTimestamp();
    let coloredLevel: string;
    switch (level) {
      case 'info':
        coloredLevel = chalk.bold.blue(level.toUpperCase());
        break;
      case 'warning':
        coloredLevel = chalk.bold.yellow(level.toUpperCase());
        break;
      case 'error':
        coloredLevel = chalk.bold.red(level.toUpperCase());
        break;
      case 'debug':
        coloredLevel = chalk.bold.grey(level.toUpperCase());
        break;
      default:
        coloredLevel = level.toUpperCase();
    }
    console.log(
      `${chalk.dim.bold.green(timestamp)} ${coloredLevel} ${chalk.dim.bold(
        `[${this.context}]`,
      )} : ${message}`,
    );
  }

  public info(message: string): void {
    this.log('info', chalk.blue(message));
  }

  public warning(message: string): void {
    this.log('warning', chalk.yellow(message));
  }

  public error(message: string): void {
    this.log('error', chalk.red(message));
  }

  public debug(message: string): void {
    this.log('error', chalk.grey(message));
  }
}

export default new Logger();
