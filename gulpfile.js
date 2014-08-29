var gulp = require('gulp'),
  minify = require('gulp-minify-css'),
  // livereload = require('gulp-livereload'),
  // nodemon = require('gulp-nodemon'),
  less = require('gulp-less-sourcemap');
  

// var paths = {
//   // css: './assets/css/*.css',
//   js: '/.assets/js/*.js'
// };

gulp.task('less', function(){
  return gulp.src('./assets/less/style.less')
    .pipe(less())
    .pipe(minify())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function(){
  return gulp.src(paths.js)
    .pipe(minify())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('serve', function(){
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: ['/assets/**', '/public/**']
  }).on('restart', function() {
    console.log('restarted' + (new Date()));
  });
});

gulp.task('watch', function(){

  livereload.listen();
  gulp.watch('./assets/css/*css', ['css']);
  gulp.watch('/.public/**/*')
    .on('change', function(file){
        livereload.changed(file.path);
    });

});
gulp.task('build', ['css', 'js']);
gulp.task('default', ['css', 'watch']);