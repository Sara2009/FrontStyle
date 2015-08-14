var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('default', function() {
	// place code for your default task here
});

gulp.task('serve', [], function() {

	browserSync({
		server: {
			baseDir: './'
		},
		notify: false,
		port: 9091,
		files: ['script/*.js', 'css/*.css', './*.html']
	})

	
});