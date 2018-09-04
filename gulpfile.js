var 
gulp = require("gulp"),
sass = require("gulp-sass"),
// sourcemaps = require("gulp-sourcemaps"),
browserSync = require("browser-sync").create();

gulp.task("sass", function() {
    gulp.src("build/stream.css")
    .pipe(browserSync.stream({
        stream: true
    }));
});

gulp.task("browserSync", function() {
    browserSync.init();
});

gulp.task("watch", ["browserSync"], function() {
    gulp.watch("src/**/*.scss", ["sass"]);
});