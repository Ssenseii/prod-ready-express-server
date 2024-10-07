const { red, yellow, blue, green, gray, bgRed } = require("colorette");
const winston = require("winston");

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.printf(({ level, message, timestamp }) => {
				const logLevel = level.toUpperCase();
				const time = blue(`[${new Date().toLocaleString()}]`);
				const levelColored =
					{
						info: green(logLevel),
						warn: yellow(logLevel),
						error: red(logLevel),
						critical: bgRed(logLevel),
					}[level] || gray(logLevel);

				return `${time} ${levelColored}: ${message}`;
			}),
		}),
	],
});
module.exports = logger;
