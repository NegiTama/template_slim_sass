const gulp         = require("gulp");
const sass         = require("gulp-sass");
const postcss      = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const slim         = require("gulp-slim");
const plumber      = require("gulp-plumber");

gulp.task('slim', function(){
  gulp.src('*.slim')
    .pipe(plumber())
    .pipe(slim({
      pretty:  true,
      require: 'slim/include',
      options: 'include_dirs=["slim/includes"]'
    }))
    .pipe(gulp.dest(""));
});


gulp.task('default', function() {
  gulp.watch(['*.slim', gulp.series(['slim']));
});

// gulp.task("style", function() {
//   return gulp.watch(["css/*.sass","slim/*.slim"], function() {
//     return (
//       gulp
//         .src("css/*.sass")
//         // Sassのコンパイルを実行
//         .pipe(
//           sass({
//             outputStyle: "compressed"
//           })
//             // Sassのコンパイルエラーを表示
//             // (これがないと自動的に止まってしまう)
//             .on("error", sass.logError)
//         )
//         .pipe(postcss([
//           autoprefixer({
//             // IEは11以上、Androidは4.4以上
//             // その他は最新2バージョンで必要なベンダープレフィックスを付与する設定
//             browsers: ["last 2 versions", "ie >= 11", "Android >= 4"],
//             cascade: false,
//             grid: true
//           })
//         ]))
//         // cssフォルダー以下に保存
//         .pipe(gulp.dest("css"))
//     );
//   });
// });
