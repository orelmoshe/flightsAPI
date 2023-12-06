import winston from 'winston';
import dateFormat from 'dateformat';
import path from 'path';
import fs from 'fs';
import os from 'os';

const LOGGER_PATH = 'log';
const ConsoleLogFormatter = (options) => `${options.timestamp()} ${options.level} ${os.hostname()} : ${options.message ? options.message : ''}`;

const FileLogFormatter = (options) => `${options.timestamp()} ${options.level} ${os.hostname()} : ${options.message ? options.message : ''}`;

const loggerData = {
	levels: {
		fatal: 0,
		error: 1,
		warn: 2,
		info: 3,
		debug: 4,
		trace: 5,
	},
	colors: {
		fatal: 'bgRed',
		error: 'red',
		warn: 'yellow',
		info: 'green',
		debug: 'blue',
		trace: 'grey',
	},
};
const consoleOptions = {
	colorize: true,
	handleExceptions: false,
	humanReadableUnhandledException: true,
	level: 'trace',
	formatter: ConsoleLogFormatter,
	timestamp: () => dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss.l'),
};

const fileOptions = {
	json: false,
	filename: `${LOGGER_PATH}/log-${new Date().getTime()}.log`,
	tailable: true,
	timestamp: () => dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss.l'),
	formatter: FileLogFormatter,
	level: 'trace',
	levelOld: 'info',
	maxsize: 1000000,
	maxFiles: 10,
};

const logFilePath = path.dirname(fileOptions.filename);
if (!fs.existsSync(logFilePath)) {
	fs.mkdirSync(logFilePath, { recursive: true });
}

const logger = new winston.Logger({
	levels: loggerData.levels,
	colors: loggerData.colors,
	transports: [],
});

winston.addColors(loggerData);
logger.add(winston.transports.Console, consoleOptions);
logger.add(winston.transports.File, fileOptions);

export default logger;
