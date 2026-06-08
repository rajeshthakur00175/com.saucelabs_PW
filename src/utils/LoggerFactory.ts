import winston from 'winston';
import path from 'path';
import fs from 'fs';

export class LoggerFactory {

    static createLogger(
        environment: string,
        browserName: string,
        testName: string
    ) {

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const timestamp =
            `${year}-${month}-${day}_` +
            `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;

        const safeTestName = testName
            .replace(/[<>:"/\\|?*]/g, '')
            .replace(/\s+/g, '_');

        const logDirectory = path.join(
            process.cwd(),
            'logs',
            environment.toUpperCase(),
            browserName,
            String(year),
            month,
            day
        );
        fs.mkdirSync(logDirectory, {
            recursive: true
        });
        const logFilePath = path.join(
            logDirectory,
            `${safeTestName}_${timestamp}.log`
        );
        return winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.printf(
                    ({ timestamp, level, message }) =>
                        `${timestamp} [${environment.toUpperCase()}] [${browserName.toUpperCase()}] [${safeTestName}] [${level.toUpperCase()}] ${message}`
                )
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: logFilePath
                })
            ]
        });
    }
}

export default LoggerFactory;