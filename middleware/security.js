const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const csurf = require("csurf");

module.exports = (app) => {
	app.use(helmet());
	app.use(xss());
	app.use(hpp());
	app.use(csurf({ cookie: true }));
};
