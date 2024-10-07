const logger = require("../config/logging");

const errorHandler = (err, req, res, next) => {
	const statusCode = err.status || 500;
	const isOperational = err.isOperational || false; // Custom operational error flag
	const severity = statusCode >= 500 ? "critical" : statusCode >= 400 ? "error" : "warn";

	const errorMessage = `
  ${red("Error:")} ${yellow(err.message || "An error occurred!")}
  ${red("Status Code:")} ${statusCode}
  ${red("Method:")} ${req.method} ${red("URL:")} ${req.url}
  ${red("Stack Trace:")} ${gray(err.stack || "No stack trace available")}
  `;

	// Log the error to the console using winston with different severity levels
	logger.log({
		level: severity,
		message: `${err.message || "Unknown error"} | Status: ${statusCode} | URL: ${req.url}`,
	});

	// Only show stack trace in development mode
	if (process.env.NODE_ENV === "development") {
		console.log(errorMessage);
	}

	// Send response
	if (!res.headersSent) {
		res.status(statusCode).json({
			success: false,
			message: err.message || "An internal server error occurred",
			stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
		});
	}
};


module.exports = errorHandler;
