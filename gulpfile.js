var 
gulp = require("gulp"),
sass = require("gulp-sass"),
concat = require("gulp-concat"),
sourcemaps = require("gulp-sourcemaps"),
browserSync = require("browser-sync").create();

gulp.task("sass", function() {
    gulp.src("library/scss/style.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(gulp.dest("library/css"))
    .pipe(browserSync.stream({
        stream: true
    }));
});

gulp.task("browserSync", function() {
    browserSync.init();
});

gulp.task("watch", ["browserSync"], function() {
    gulp.watch("library/scss/*.scss", ["sass"]);
});