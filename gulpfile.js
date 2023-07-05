const { src, dest, watch, series, parallel, task } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const includeFile = require("gulp-file-include");
const browsersync = require("browser-sync").create();
const uglify = require("gulp-uglify");
const clean = require("gulp-clean");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");

const HTML_PATH = ["./*.html", "!dist/index.html"];
const SCSS_PATH = "src/styles/*.scss";
const JS_PATH = "src/js/*.js";

function cleanTask() {
	return src("dist", { allowEmpty: true, read: false }).pipe(clean());
}

function htmlTask() {
	return src("index.html")
		.pipe(includeFile({ prefix: "@" }))
		.pipe(dest("dist"));
}

function scssTask() {
	return src(SCSS_PATH)
		.pipe(sourcemaps.init())
		.pipe(concat("styles.css"))
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(dest("dist"));
}

function minifyCssTask() {
	return src("dist/styles.css").pipe(cleanCSS()).pipe(dest("dist"));
}

function jsTask() {
	return src(JS_PATH)
		.pipe(concat("bundle.js"))
		.pipe(uglify())
		.pipe(dest("dist/js"));
}

function buildTask(cb) {
	return series(cleanTask, htmlTask, scssTask, minifyCssTask, jsTask)(cb);
}

function serveTask(cb) {
	browsersync.init({
		server: {
			baseDir: "dist",
		},
		mimeTypes: {
			js: "application/javascript",
		},
	});
	cb();
}

function reloadTask(cb) {
	browsersync.reload();
	cb();
}

function watchTask() {
	watch(HTML_PATH, series(htmlTask, reloadTask));
	watch(SCSS_PATH, series(scssTask, minifyCssTask, reloadTask));
	watch(JS_PATH, series(jsTask, reloadTask));
}

task("default", series(buildTask, serveTask, watchTask));

task("build", buildTask);
