const imagemin = require('imagemin-keep-folder');
const imageminWebp = require('imagemin-webp');
const imageminOptipng = require('imagemin-optipng');
const imageminMozjpeg = require('imagemin-mozjpeg');

(async () => {
	await imagemin(['dist/static/*.png'], {
		use: [imageminOptipng()]
	});

	await imagemin(['dist/static/*.jpg'], {
		use: [imageminMozjpeg()]
	});

	console.log(`image optimize complete`);
})();
