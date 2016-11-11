var gulp = require('gulp'),
    fileExists = require('file-exists'),
    ffmpeg = require('gulp-fluent-ffmpeg'),
    gulpIgnore = require('gulp-ignore')
    ;

gulp.task('video', function () {
    gulp.src('./video/*.mp4')
        .pipe(gulpIgnore.exclude(alreadyProcessed))
        .pipe(
        ffmpeg('webm', function (cmd) {
            return cmd
                .on('filenames', function (filenames) {
                    console.log('Will generate ' + filenames.join(', '))
                })
                .on('start', function (commandLine) {
                    console.log('Spawned Ffmpeg with command: ' + commandLine);
                })
                .on('progress', function (progress) {
                    console.log('Processing: ' + progress.timemark + ' done');
                })
                .on('end', function () {
                    console.log('Processing finished !');
                })
                .videoCodec('libvpx')
                .noAudio()
                ;
        })
        ).pipe(gulp.dest('./video'));
});

function alreadyProcessed(file) {
    // do whatever with file.path
    // return boolean true if needed to exclude file
    var destination = file.path.replace(/.mp4/, '.webm');
    var exists = fileExists(destination);
    return exists;
}