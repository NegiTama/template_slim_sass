const gulp         = require("gulp");
const sass         = require("gulp-sass");
const postcss      = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const slim         = require("gulp-slim");
const plumber      = require("gulp-plumber");

// sass
gulp.task("style", function() {
  return (
    gulp
      .src("src/sass/*.sass")
      .pipe(
        sass({
          outputStyle: "expanded"
        })
      )
      .pipe(postcss([
        autoprefixer({
          // 最新2バージョンで必要なベンダープレフィックスを付与する設定
          browsers: ["last 2 versions", "ie >= 11", "Android >= 4"],
          cascade: false,
          grid: true
        })
      ]))
      .pipe(gulp.dest("dist/css"))
  );
});

// slim
gulp.task('slim', function() {
  return gulp.src('src/slim/*.slim')
    .pipe(plumber())
    .pipe(slim({
      pretty: true,
      require: 'slim/include',
      options: 'include_dirs=["src/slim/inc"]'
    }))
    .pipe(gulp.dest('./'))
});

// watch
gulp.task('watch', () => {
  gulp.watch('src/sass/*.sass', gulp.task('style'));
  gulp.watch(['src/slim/*.slim', 'src/slim/inc/*.slim'], gulp.task('slim'));
});

gulp.task('default', gulp.parallel('watch'));
