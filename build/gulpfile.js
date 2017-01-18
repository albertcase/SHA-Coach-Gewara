/*****************************
1.DEPENDENCIES 
*****************************/

var gulp = require('gulp'),                               // gulp core
    sass = require('gulp-sass'),                          // sass 编译
    uglify = require('gulp-uglify'),                      // js   压缩
    jshint = require('gulp-jshint'),                      // js   查错
    rename = require('gulp-rename'),                      // 文件重命名 
    concat = require('gulp-concat'),                      // 文件合并
    notify = require('gulp-notify'),                      // 任务提示
    plumber = require('gulp-plumber'),                    // disable interuption
    stylish = require('gulp-stylish'),                    // 美化错误提示 (make errors look good in shell)
    minifycss = require('gulp-minify-css'),               // css 压缩
    browserSync = require('browser-sync'),                // 动态浏览器刷新 (inject code to all devices)
    autoprefixer = require('gulp-autoprefixer'),          // 设置缺少的浏览器前缀 (sets missing browserprefixes)

    plugins = require('gulp-load-plugins')(),             //自动插件引用
    /* 
    注意： gulp-load-plugins在我们需要用到某个插件的时候，才去加载那个插件，
    并不是一开始就全部加载进来。因为gulp-load-plugins是依赖package.json文件来加载插件的，
    所以请确保你需要的插件已经加入package.json文件并已经安装完毕
    */
    cache = require('gulp-cache'),                        // 临时文件缓存
    imagemin = require('gulp-imagemin'),                  // 图片压缩
    pngquant = require('imagemin-pngquant'),              // 图片深度压缩

    cache = require('gulp-csslint'),                      // css 查错
    changed = require('gulp-changed'),                    // 仅让发生改变的文件通过
    rev = require('gulp-rev'),                            // 在静态文件名的后面添加hash值，如: unicorn.css → unicorn-d41d8cd98f.css.
    cssver = require('gulp-css-urlversion');              // css img路径添加md5版本号


var target = {
    sass_src: 'scss/**/*.css',                            // sass 文件
    css_dest: 'css',                                      // 压缩后css放的文件目录
    js_lint_src: [
        "js/build/app.js",
        "js/build/custom/public.js"
    ],
    js_uglify_src: [    
        "js/build/custom/public.js",
        "js/build/app.js",
    ],
    js_concat_src: [
        "js/build/vendor/jquery.js",
        "js/build/vendor/PxLoader.js"
        "js/build/app.js"
    ],
    js_dest: "js",                                       // 压缩后js放的文件目录
    img_imagemin_src: [
        'img/**.{png,jpg,gif,ico}'
    ],
    img_dest: 'img',
    html_htmlmin_src: [
    ],
    html_dest: 'html',
}


/*****************************
2. SASS TASK
*****************************/

gulp.task('sass', function(){
    gulp.src(target.sass_src, {base: 'assets'}) 
    .pipe(changed(target.css_dest))
    .pipe(plumber())   // 防止错误引起管道中断
    .pipe(cssver())   //给css文件里引用文件加版本号（文件MD5）
    .pipe(sass())
    .pipe(autoprefixer(
        'last 2 version',
        '> 1%',
        'ie 8',
        'ie 9',
        'ios 6',
        'android 4'
    ))
    .pipe(minifycss())
    .pipe(rev())
    .pipe(rev.manifest({
        base: 'build/assets',
        merge: true // merge with the existing manifest if one exists
    }))
    .pipe(gulp.dest(target.css_dest))
    .pipe(notify({message: 'scss processed!'}));
})

gulp.task('csslint', function (done) {
 return gulp.src()
    .pipe(plugins.csslint())//加载配置文件
    .pipe(csslint.formatter()) // Display errors 
    .pipe(csslint.formatter('fail')); // Fail on error (or csslint.failFormatter()) 
});



/*****************************
3. JS TASKS
*****************************/

gulp.task('js-lint', function(){
    gulp.src(target.js_lint_src)
    .pipe(jshint())               
    .pipe(jshint.reporter(stylish))   // present the results in a beautiful way
})

gulp.task('js-uglify', function(){
    gulp.src(target.js_uglify_src)
    .pipe(uglify())
    .pipe(rename(function(dir, base, ext){   // give the files a min suffix
        var trunc = base.split(".")[0];
        return trunc + '.min' + ext;
    }))
    .pipe(gulp.dest(target.js_dest))
    .pipe(notify({message: 'js processed!'}))
})

// minify & concatinate all other js
gulp.task('js-concat', function(){
    gulp.src(target.js_concat_src)
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest(target.js_dest))
    .pipe(notify({message: 'js processed!'}));
})



/*****************************
4. IMG TASK
*****************************/

gulp.task('img-imagemin', function () {
  gulp.src(target.img_imagemin_src)
    .pipe(changed(target.css_dest))
    .pipe(plugins.cache(plugins.imagemin({
          optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
          progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
          interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
          multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
          svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
          use: [pngquant({quality: '60'})] //使用pngquant 插件深度压缩
    })))
    .pipe(gulp.dest(target.img_dest))
    .pipe(notify({message: 'img processed!'}));
});



/*****************************
5. HTML TASK
*****************************/

gulp.task('html-htmlmin', function () {
  var options = {
      removeComments: true,//清除HTML注释
      collapseWhitespace: true,//压缩HTML
      collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true,//删除所有空格属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true//压缩页面CSS
  };
  gulp.src(target.html_htmlmin_src)
      .pipe(plugins.htmlmin(options))
      .pipe(gulp.dest(html_dist));
});


/*****************************
6.BROWSER SYNC
*****************************/

gulp.task('browser-sync', function(){
    browerSync.init(['css/*.css', 'js/*.js'],{
        proxy: {
            host: 'localhost',
            port: '2368'
        }
    })
})



/*****************************
7. GULP TASKS
*****************************/

gulp.task('default', function(){
    gulp.run('sass', 'js-lint', 'js-uglify', 'js-concat', 'browser-sync');
    gulp.watch('scss/**/*.css', function(){
        gulp.run('sass');
    })
    gulp.watch(target.js_lint_src, function(){
        gulp.run('js-lint');
    })
    gulp.watch(target.js_minify_src, function(){
        gulp.run('js-uglify');
    })
    gulp.watch(target.js_concat_src, function(){
        gulp.run('js-concat');
    })
})







