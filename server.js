const next = require('next');
const { createServer } = require('http');
const { parse } = require('url');
const { createReadStream } = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	createServer((req, res) => {
		const parsedUrl = parse(req.url, true);
		const { pathname } = parsedUrl;

		if (pathname === '/sw.js') {
			res.setHeader('content-type', 'text/javascript');
			createReadStream('./static/serviceWorker.js').pipe(res);
		} else {
			handle(req, res, parsedUrl);
		}
	}).listen(3000, (err) => {
		if (err) throw err;
		console.log('> Ready on http://localhost:3000');
	});
});
