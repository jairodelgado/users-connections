var path = require('path');

module.exports = (app) => {
	app.use('/api/roles', require('./role')(app.models));
	app.use('/api/users', require('./user')(app.models));
	app.use('/api/issues', require('./issue')(app.models));
	app.use('/api/replies', require('./reply')(app.models));

	app.use((req, res) => {
		res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
	});

	return app;
}