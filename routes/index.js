var path = require('path');

module.exports = (app) => {
	app.use('/api/users', require('./user')(app.models));
	app.use('/api/connections', require('./connection')(app.models));

	app.use((req, res) => {
		res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
	});

	return app;
}
