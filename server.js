require("express-async-errors");
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const timeout = require("connect-timeout");
const cors = require("cors");

// Import Config and Middlewares
const logger = require("./config/logging");
const i18n = require("./config/i18n");
const limiter = require("./middleware/limiter");
const errorHandler = require("./middleware/errorHandler");
const security = require("./middleware/security");
const routes = require("./routes/index");

const app = express();

// Middleware
app.use(morgan("combined"));
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(timeout("20s"));
app.use(i18n.init);
app.use(limiter);
security(app); // Apply security middleware

// Routes
app.use("/", routes);

// Error Handling
app.use(errorHandler);

// Session
app.use(
	session({
		secret: process.env.ASCII_WHORE,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	logger.info(`Server listening on port ${PORT}`);
});

module.exports = app;
