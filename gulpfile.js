const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');



function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  })
}


function fileInclude() {
  return src(['app/html/pages/*'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    // .pipe(dest('dist/html'))
    .pipe(dest('app'))
    // .pipe(dest('.'))
    .pipe(browserSync.stream());
}


function styles() {
  return src('app/scss/*.scss')
    .pipe(scss({ outputStyle: 'extanded' }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('app/css')) //
    // .pipe(dest('dist/css')) 
    // .pipe(dest('css'))

    .pipe(browserSync.stream())
}


function images() {
  return src('app/images/**/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    // .pipe(dest('dist/images'))
    .pipe(dest('images'))
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/zurb-twentytwenty/js/jquery.event.move.js',
    'node_modules/zurb-twentytwenty/js/jquery.twentytwenty.js',
    'node_modules/slick-slider/slick/slick.js',
    'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
    'app/js/main.js'

  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))//
    // .pipe(dest('dist/js'))
    // .pipe(dest('js'))
    .pipe(browserSync.stream())
}


function build() {
  return src([
    'app/html/**/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js'
  ], { base: 'app' })
    .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['app/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/html/**/*.html'], fileInclude);
}


exports.fileInclude = fileInclude;
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, fileInclude, scripts, browsersync, watching);