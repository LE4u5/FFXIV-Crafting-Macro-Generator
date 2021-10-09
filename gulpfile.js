const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const processHtml = require('gulp-processhtml');
const cssmin = require('gulp-cssmin');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');

function cleanDist() {
    return gulp.src(['dist/**/*.*', 'dist/**'])
        .pipe(clean());
}
function copyHtml() {
    return gulp.src('src/*.html')
        .pipe(processHtml())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
};
function copyJs() {
    return gulp.src('src/**/*.js')
        .pipe(concat('main.min.js'))
        .pipe(replace('export',''))
        .pipe(replace(`import { ACTIONS } from './actions.js';`,''))
        .pipe(terser({toplevel:true}))
        .pipe(gulp.dest('dist/js'));
}
function copyCss() {
    return gulp.src('src/**/*.css')
        .pipe(concat('main.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
}
function copyAssets() {
    return gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('dist/assets'));
}
function copyDockerFile(){
    return gulp.src(['Dockerfile','one.bash','.dockerignore'])
        .pipe(gulp.dest('dist'));
}

exports.copyHtml = copyHtml;
exports.copyJs = copyJs;
exports.copyAssets = copyAssets;
exports.copyCss = copyCss;
exports.cleanDist = cleanDist;
exports.copyDockerFile = copyDockerFile;

exports.default = gulp.series(cleanDist, gulp.parallel(copyDockerFile, copyHtml, copyJs, copyAssets, copyCss));
