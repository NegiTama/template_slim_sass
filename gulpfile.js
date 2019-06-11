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
      .src("css/*.sass")
      // Sassのコンパイルを実行
      .pipe(
        sass({
          outputStyle: "expanded"
        })
      )
      .pipe(postcss([
        autoprefixer({
          // IEは11以上、Androidは4.4以上
          // その他は最新2バージョンで必要なベンダープレフィックスを付与する設定
          browsers: ["last 2 versions", "ie >= 11", "Android >= 4"],
          cascade: false,
          grid: true
        })
      ]))
      // cssフォルダー以下に保存
      .pipe(gulp.dest("css"))
  );
});

// slim
gulp.task('slim', function() {
  return gulp.src('slim/*.slim')
    .pipe(plumber())
    .pipe(slim({
      pretty: true,
      require: 'slim/include',
      options: 'include_dirs=["slim/inc"]'
    }))
    .pipe(gulp.dest('./'))
});

// watch
gulp.task('watch', () => {
  gulp.watch('css/*.sass', gulp.task('style'));
  gulp.watch(['slim/*.slim', 'slim/inc/*.slim'], gulp.task('slim'));
});

gulp.task('default', gulp.parallel('watch'));
