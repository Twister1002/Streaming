var 
gulp = require("gulp"),
sass = require("gulp-sass"),
// ts = require("gulp-typescript"),
// concat = require("gulp-concat"),
// sourcemaps = require("gulp-sourcemaps"),
browserSync = require("browser-sync").create();

gulp.task("sass", function() {
    gulp.src("src/scss/style.scss")
    // .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream({
        stream: true
    }));
});

// gulp.task("ts", function() {
//     dirs = ["library/ts/twitch.ts"];

//     var data = gulp.src(dirs)
//     .pipe(
//         ts({
//             declaration: true,
//             outFile: "twitch.js"
//         })
//     )
//     .on("error", logError)
//     .pipe(gulp.dest("library/js"));
// });

gulp.task("browserSync", function() {
    browserSync.init();
});

gulp.task("watch", ["browserSync"], function() {
    gulp.watch("src/scss/*.scss", ["sass"]);
    // gulp.watch("library/ts/*.ts", ["ts"]);
});

function logError(err) {
    console.log(err);
}