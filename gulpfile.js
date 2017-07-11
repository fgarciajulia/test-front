var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var gulp = require('gulp');
var gutil = require('gulp-util');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var strip_comments = require('gulp-strip-json-comments');

var listJsDependencies = [
  'src/js/dependencies/jquery.js',
  'src/js/dependencies/jquery-ui-sortable.js'
];
var listJs = [
  'src/js/loadig.js',
  'src/js/errors.js',
  'src/js/updateImage.js',
  'src/js/deleteItem.js',
  'src/js/updateDescription.js',
  'src/js/sortable.js',
  'src/js/showList.js',
  'src/js/addItem.js',
  'src/js/imageDisplayPreview.js',
];

gulp.task('jsDependencies', () => {
  return gulp
    .src(listJsDependencies)
    .pipe(concat('app.dependencies.js'))
    .pipe(minify({exclude: ['tasks']}))
    .pipe(gulp.dest('_dist/js'));
});

gulp.task('cleanDistAndDebug', () => {
  return gulp
    .src(['_dist', '_debug'])
    .pipe(clean());
});

gulp.task('copyStaticFolder', () => {
  
  gulp
    .src(['src/static/.*', 'src/static/**','!src/static/php/','!src/static/php/**.*','!src/static/imageItem/**.*','!src/static/imageItem/','!src/static/items.json'])
    .pipe(gulp.dest('_debug'));
  
  gulp
    .src(['src/static/.*', 'src/static/**'])
    .pipe(gulp.dest('_dist'));
});


gulp.task('js', () => {
  return gulp
    .src(listJs)
    .pipe(concat('app.js'))
    .pipe(minify({exclude: ['tasks']}))
    .pipe(gulp.dest('_dist/js'));
});

gulp.task('scss', () => {
  return gulp
    .src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(
      {outputStyle: 'compressed'}
      ).on('error', sass.logError))
    .pipe(concat('app.min.css'))
    .pipe(strip_comments())
    .pipe(autoprefixer())
    .pipe(gulp.dest('_dist/css'))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('_debug/css'))
});

gulp.task('fileInclude', () => {
  gulp
    .src('src/views/index.html')
    .pipe(fileinclude({
      context: {
        isDebug: true,
        folder: '../',
        listJsDependencies: listJsDependencies,
        listJs: listJs
      }
    }))
    .pipe(gulp.dest('_debug'));

  gulp
    .src('src/views/index.html')
    .pipe(fileinclude({
      context: {
        folder: '',
        isDebug: false,
        listJsDependencies: ['js/app.dependencies-min.js'],
        listJs: ['js/app-min.js']
      }
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('_dist'))
});

var watchLogger = (event) => {
  gutil.log('[' + event.type + '] ' + event.path);
};

gulp.task('watch', ['release'], () => {

  var wSASS = gulp.watch('src/scss/**/*scss', ['scss']);
  wSASS.on('change add unlink', watchLogger);

  var hHtml = gulp.watch(['src/views/**'], ['fileInclude']);
  hHtml.on('change add unlink', watchLogger);

  var hHtml = gulp.watch(['src/static/.*', 'src/static/**','!src/static/php/','!src/static/php/**.*','!src/static/imageItem/**.*','!src/static/imageItem/','!src/static/items.json'], ['release']);
  hHtml.on('change add unlink', watchLogger);
});

gulp.task('release', (cb) => {
  runSequence('cleanDistAndDebug', 'copyStaticFolder', 'fileInclude', 'scss', 'js', 'jsDependencies', cb);
});

gulp.task('default', ['watch']);