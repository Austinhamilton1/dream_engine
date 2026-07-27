export class Logger {
    static info(format: string, ...args: any[]) {
        console.log(format, ...args);
    }

    static warn(format: string, ...args: any[]) {
        console.warn(format, ...args);
    }

    static error(format: string, ...args: any[]) {
        console.error(format, ...args);
    }
}