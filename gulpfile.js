'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean');

gulp.task('scss', function () {
    gulp.src('./example/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                'last 2 version',
                'Firefox >= 20',
                'safari 5',
                'ie 8',
                'ie 9',
                'opera 12.1',
                'iOS 7',
                '> 5%',
                'ios 6',
                'android 4'
            ],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./example/css'))
        .pipe(browserSync.stream());
});
gulp.task('watch', function () {
    gulp.watch('./example/scss/*.scss', ['scss']);
    gulp.watch(['./example/js/*.js','./example/*.html']).on('change', browserSync.reload);
});
gulp.task('serve', ['nodemon'], function () {
    browserSync.init(null, {
        proxy: "localhost:4567",
        port: 4568,
        ui: {
          port:4569
        }
    });
});

gulp.task('default', ['serve','watch']);
gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon({script: './app.js'}).on('start', function () {
		if (!called) {
			called = true;
			cb();
		}
	});
});
//清理输出文件
gulp.task('clean',function () {
    gulp.src('./dist/')
        .pipe(clean({force: true}))
});

//js文件压缩
gulp.task('jsmin',function () {
    gulp.src('./example/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('./dist/js/'));
});
//css文件压缩
gulp.task('cssmin',function () {
    gulp.src('./example/scss/*.scss')
        .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                'last 2 version',
                'Firefox >= 20',
                'safari 5',
                'ie 8',
                'ie 9',
                'opera 12.1',
                'iOS 7',
                '> 5%',
                'ios 6',
                'android 4'
            ],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'))
});


gulp.task('dist',['jsmin','cssmin']);
