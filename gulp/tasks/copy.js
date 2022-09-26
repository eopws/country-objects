export const copy = () => {
    app.gulp.src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files));

    return app.gulp.src(app.path.src.svgicons)
    .pipe(app.gulp.dest(app.path.build.svgicons));
}
