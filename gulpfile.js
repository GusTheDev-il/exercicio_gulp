const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const obfuscate = require('gulp-obfuscate')
const imagemin = require('gulp-imagemin')

gulp.task('default', watchFunction)
gulp.task('sass', compilationSass)
gulp.task('javaS', comprimeJS)
gulp.task('images', miniimagem)

function comprimeJS(){
    return gulp.src('./source/scripts/soma.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/'))
}

function miniimagem (){
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
}

function compilationSass() {
    return gulp.src('./source/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build'))
}

function watchFunction(){
    gulp.watch('src/source/*.scss', compilationSass)
}

exports.sass = compilationSass
exports.javascript = comprimeJS
exports.default = function(){
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(minificationjavascript))
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(minificationImages))   
}