var gulp = require("gulp");
var connect = require("gulp-connect");
var watch = require("gulp-watch");
var less = require("gulp-less");

//转移html到dist文件夹下
gulp.task("html",function(){ 
    gulp.src("./src/index.html")
        // 重新加载浏览器，不需要手动刷新浏览器
        .pipe(connect.reload())
        .pipe(gulp.dest("./dist"))
})
//监听任务，这样保存的话会直接同步保存到dist下。
gulp.task("watch",function(){
    watch("./src/index.html",gulp.series('html'))
    watch("./src/less/*.less",gulp.series('less'))
    watch("./src/js/*.js",gulp.series('js'));
})
//服务器开启任务
gulp.task("server",function(){
    connect.server({   
        root : './dist',
        // 热启操作
        livereload : true
    });
})
//把less转换成css
gulp.task("less",function(){
    gulp.src("./src/less/*.less")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(gulp.dest("./dist/css"));
})
//把src的js文件夹放到dist文件夹下
gulp.task("js",function(){
    gulp.src("./src/js/*.js")
        .pipe(connect.reload())
        .pipe(gulp.dest("./dist/js"))
})
gulp.task('default',gulp.series(gulp.parallel('html','watch','server','less','js')));
