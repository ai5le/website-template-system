var gulp = require('gulp');
const chalk = require('chalk');
var panini = require('panini');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var sketch = require('gulp-sketch');

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "dist"
    });
});


gulp.task('images', function(){
  return gulp.src('src/assets/img/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/assets/img'))
});

gulp.task('fonts', function() {
  return gulp.src('src/assets/fonts/**/*')
  .pipe(gulp.dest('dist/assets/fonts'))
})

gulp.task('scripts:main', function() {
  return gulp.src('src/assets/js/**/*')
  .pipe(gulp.dest('dist/assets/js'))
})

gulp.task('scripts:vendor', function() {
  return gulp.src('src/assets/js/vendor/**/*')
  .pipe(gulp.dest('dist/assets/js/vendor/'))
})

gulp.task('sass', function () {
  return gulp.src('./src/assets/scss/**/*.scss')
    .pipe(sass({ 'outputStyle': 'compact'}))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('panini', function() {
  gulp.src('src/pages/**/*.html')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      helpers: 'src/helpers/',
      data: 'src/data/'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});


gulp.task('clean:js', function() {
  return del.sync('dist/*.js');
})

gulp.task('watch', function() {
  gulp.watch(['src/{pages,layouts,partials,helpers,data}/**/*'], ['panini', panini.refresh]);
  gulp.watch('src/assets/scss/**/*.scss', ['sass']);
  gulp.watch('dist/**/*.html').on('change', browserSync.reload);
  gulp.watch('src/assets/js/**/*.js', function() {runSequence('clean:js','scripts:main', 'scripts:vendor')});
  gulp.watch('src/assets/fonts/**/*', ['fonts']);
  gulp.watch('src/assets/img/**/*.+(png|jpg|jpeg|gif|svg)', ['images']);
});

gulp.task('default', function(cb) {
  runSequence(['clean:dist'], ['scripts:main', 'scripts:vendor'], ['panini', 'sass', 'images', 'fonts', 'sketch'], 'serve', 'watch', cb);
});

gulp.task('build', function(cb) {
  runSequence(['clean:dist', 'clean:data'], ['scripts:main', 'scripts:vendor'], ['panini', 'sass', 'images', 'fonts', 'sketch'], cb);
});

// SKETCH SLICES: to PNG
gulp.task('sketch', function () {
    return gulp.src('src/assets/design/*.sketch')
        .pipe(sketch({
            export: 'slices',
            formats: 'png'
        }))
        .pipe(gulp.dest('dist/assets/img/'));
        
});
