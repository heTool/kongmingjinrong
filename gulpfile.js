var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename  = require('gulp-rename');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var cache  = require('gulp-cache');
var livereload = require('gulp-livereload');


//编译SCSS并压缩
gulp.task('styles-SCSS',function(){
    return sass('src/css/*.scss',{style:'expanded'})
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({suffix:'.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({message:'SCSS样式文件编译完成!'}));
});

//压缩CSS
gulp.task('styles',function(){
    return gulp.src('css/*')
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({suffix:'.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({message:'样式文件编译完成!'}));
});

gulp.task('scripts',function(){
    //TODO 压缩脚本
    return gulp.src('javascripts/webMobile/*.js')
                .pipe(jshint('.jshintrc'))
                .pipe(jshint.reporter('default'))
                .pipe(concat('main.js'))
                .pipe(gulp.dest('dist/assets/js'))
                .pipe(rename({suffix:'.min'}))
                .pipe(uglify)
                .pipe(gulp.dest('dist/assets/js'))
                .pipe(notify({message:'Script task complete'}));
});

gulp.task('images',function(){
    //TODO 压缩图片
    return gulp.src('images/kmjrApp/*')
        .pipe(imagemin({optimization:3,progressive:true,interlaced:true}))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({message:'Images task complete'}));
});

gulp.task('clean',function(){
    //clean清除过时文件
    return gulp.src(['dist/assets/css','dist/assets/img','dist/assets/js'],{read:false})
        .pipe(clean());
});

gulp.task('default',['clean'],function(){
    //TODO启动执行默认任务
    gulp.start('styles','scripts','images');
});

gulp.task('watch',function(){
    //监听看守文件改动饼自动执行任务
    //看守css
    gulp.watch('css/*.sass',['styles']);
    //看守images
    gulp.watch('javascripts/webMobile/*.js',['scripts']);
    //看守图片
    gulp.watch('images/kmjrApp/*',['images'])

    //即使启动服务重整
    var _server = livereload();

    //监听看守所有在dist/目录下的文件，一旦有更新，便进行重整
    gulp.watch(['dist/**']).on('change',function(file){
        _server.changed(file.path);
    });
});

