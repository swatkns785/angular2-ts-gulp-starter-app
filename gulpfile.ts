const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const tsProject = tsc.createProject("tsconfig.json");
const tslinst = require("gulp-tslint");

// clean build task
gulp.task('clean', (cb) => {
  return del(["build"], cb);
};

// typescript compiler task
gulp.task('compile', () => {
  var tsResult = gulp.src("src/**/*.ts")
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));
  return tsResult.js
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build"));
});

gulp.task("resources", () => {
  return gulp.src(["src/**/*", "!**/*.ts"])
    .pipe(gulp.dest("build"))
});

gulp.task("libs", () => {
  return gulp.src([
    'es6-shim/es6-shim.min.js',
    'systemjs/dist/system-polyfills.js',
    'systemjs/dist/system.src.js',
    'reflect-metadata/Reflect.js',
    'rxjs/**',
    'zone.js/dist/**',
    '@angular/**'
  ],  {cwd: "node_modules/**"}) /* Glob required here. */
    .pipe(gulp.dest("build/lib"));
});

gulp.task("build", ["compile", "resources", "libs"], () => {
  console.log("Building the project...")
});
