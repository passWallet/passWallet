var gulp   = require('gulp');

gulp.task('prod', function() {
  process.env.NODE_ENV = 'production';
  gulp.start('build');
});
