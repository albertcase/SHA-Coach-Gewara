var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    csslint = require('gulp-csslint'),
    rev = require('gulp-rev'),
    minifyCss = require('gulp-minify-css'),
    changed = require('gulp-changed'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    revCollector = require('gulp-rev-collector'),
    minifyHtml = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),                      // 文件重命名 
    concat = require('gulp-concat'),                      // 文件合并

    del = require('del');


var cssSrc = ['_settings.scss', '_reset.scss', '_style.scss'],
    cssDest = 'assets/css',
    jsSrc = [
        'src/js/vendor/jquery.js',
        'src/js/vendor/PxLoader.js',
        'src/js/custom.js',
        'src/js/main.js'
    ],
    jsDest = 'assets/js',
    fontSrc = 'src/fonts/*',
    fontDest = 'assets/font',
    imgSrc = 'src/img/*',
    imgDest = 'assets/img',
    cssRevSrc = 'src/css/revCss',
    condition = true;

function changePath(basePath){
    var nowCssSrc = [];
    for (var i = 0; i < cssSrc.length; i++) {
        nowCssSrc.push(cssRevSrc + '/' + cssSrc[i]);
    }
    return nowCssSrc;
}

//Fonts & Images 根据MD5获取版本号
gulp.task('revFont', function(){
    return gulp.src(fontSrc)
        .pipe(rev())
        .pipe(gulp.dest(fontDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/font'));
});
gulp.task('revImg', function(){
    return gulp.src(imgSrc)
        .pipe(rev())
        .pipe(gulp.dest(imgDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/img'));
});



//检测JS
gulp.task('lintJs', function(){
    return gulp.src(jsSrc)
        //.pipe(jscs())   //检测JS风格
        .pipe(jshint({
            "undef": false,
            "unused": false
        }))
        //.pipe(jshint.reporter('default'))  //错误默认提示
        .pipe(jshint.reporter(stylish))   //高亮提示
        .pipe(jshint.reporter('fail'));
});

//压缩JS/生成版本号
gulp.task('miniJs', function(){
    return gulp.src(jsSrc)
        .pipe(concat('main.js'))                  //合并所有js到main.js
        .pipe(rename({suffix: '.min'}))           //rename压缩后的文件名
        .pipe(gulpif(
            condition, uglify()
        ))
        .pipe(rev())
        .pipe(gulp.dest(jsDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/js'));
});

//CSS里更新引入文件版本号
gulp.task('revCollectorCss', function () {
    return gulp.src(['src/rev/**/*.json', 'src/css/*.scss'])
        .pipe(revCollector())
        .pipe(gulp.dest(cssRevSrc));
});

//检测CSS
gulp.task('lintCss', function(){
    return gulp.src(cssSrc)
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(csslint.failReporter());
});


//压缩/合并CSS/生成版本号
gulp.task('miniCss', function(){
    return gulp.src(changePath(cssRevSrc))
        .pipe(concat('main.css'))                  //合并所有css到main.css
        .pipe(rename({suffix: '.min'}))           //rename压缩后的文件名
        .pipe(sass())
        .pipe(gulpif(
            condition, minifyCss({
                compatibility: 'ie7'
            })
        ))
        .pipe(rev())
        .pipe(gulpif(
                condition, changed(cssDest)
        ))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
            remove: false       
        }))
        .pipe(gulp.dest(cssDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/css'));
});

//压缩Html/更新引入文件版本
gulp.task('miniHtml', function () {
    return gulp.src(['src/rev/**/*.json', 'src/*.html'])
        .pipe(revCollector())
        .pipe(gulpif(
            condition, minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            })
        ))
        .pipe(gulp.dest('assets'));
});

gulp.task('delRevCss', function(){
    del([cssRevSrc,cssRevSrc.replace('src/', 'assets/')]);    
});

//意外出错？清除缓存文件
gulp.task('clean', function(){
    del([cssRevSrc ,cssRevSrc.replace('src/', 'assets/')]);
});



//开发构建
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
         ['revFont', 'revImg'],
         //['lintJs'],
         ['revCollectorCss'],
         ['miniCss', 'miniJs'],
         ['miniHtml', 'delRevCss'],
    done);
});

//正式构建
gulp.task('build', function (done) {
    runSequence(
         ['revFont', 'revImg'],
         //['lintJs'],
         ['revCollectorCss'],
         ['miniCss', 'miniJs'],
         ['miniHtml', 'delRevCss'],
    done);
});


gulp.task('default', ['build']);
