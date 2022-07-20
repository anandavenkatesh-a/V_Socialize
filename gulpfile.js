

const gulp = require('gulp');
const gulp_sass = require('gulp-sass')(require('sass'));
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const rev = require('gulp-rev');
const path = require('path');


gulp.task('scss_to_css',function(){
    return gulp.src('./assets/scss/*.scss')
    .pipe(gulp_sass())
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('minify_css',function(){
    return gulp.src('./assets/css/*.css')
    .pipe(cssmin())
    .pipe(rev())
    .pipe(gulp.dest('./opt_assets/style'))
    .pipe(rev.manifest(path.join(__dirname,'/opt_assets/rev-manifest.json'),{
        merge:true,
        base:'./opt_assets'
    }))
    .pipe(gulp.dest('./opt_assets'));
});
gulp.task('minify_js',function(){
    return gulp.src('./assets/script/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./opt_assets/script'))
        .pipe(rev.manifest(path.join(__dirname,'/opt_assets/rev-manifest.json'),{
            merge:true,
            base:'./opt_assets'
        }))
        .pipe(gulp.dest('./opt_assets'))
});
