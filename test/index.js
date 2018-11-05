const fs = require('fs');
const should = require('should');
const Vinyl = require('vinyl');
const injectJS = require('../');

describe('gulp-inject-js', function () {
	it('should produce expected file', function (done) {

		const srcFile = new Vinyl({
			path: 'test/fixtures/index.html',
			base: 'test/fixtures/',
			contents: fs.readFileSync('test/fixtures/index.html')
		});

		const expectedFile = new Vinyl({
			path: 'test/expected/index.html',
			base: 'test/expected/',
			contents: fs.readFileSync('test/expected/index.html')
		});

		const stream = injectJS();

		stream.on('error', function (error) {
			should.exist(error);
			done(error);
		});

		stream.on('data', function (newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);

			String(newFile.contents).should.equal(String(expectedFile.contents));
			done();
		});

		stream.write(srcFile);
		stream.end();
	});

	it('should error on stream', function (done) {

		const srcFile = new Vinyl({
			path: 'test/fixtures/index.html',
			cwd: 'test/',
			base: 'test/fixtures',
			contents: fs.createReadStream('test/fixtures/index.html')
		});

		const stream = injectJS();

		stream.on('error', function (error) {
			should.exist(error);
			done();
		});

		stream.on('data', function (newFile) {
			newFile.contents.pipe(es.wait(function (error) {
				done(error);
			}));
		});

		stream.write(srcFile);
		stream.end();
	});
});