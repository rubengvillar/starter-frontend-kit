const gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),

    sass = require('gulp-sass'),
    // postcss = require('gulp-postcss'),
    uncss = require('gulp-uncss'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
    pug = require('gulp-pug'),
    
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),

    useref = require('gulp-useref'),
    htmlmin = require('gulp-htmlmin')

    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    svgmin = require('gulp-svgmin'),
    webp = require('gulp-webp'),
    // gm = require('gulp-gm'),

    dir = {
        src: 'src',
        build: 'build',
        nm: 'node_modules'
    },

    files = {
        CSS: [
            `${dir.build}/css/styles.css`
        ],
        mCSS: 'styles.min.css',
        JS: [
            `${dir.build}/js/scripts.js`
        ],
        mJS: 'scripts.min.js',
        fonts: [],
        statics: [
            `${dir.src}/hummans.txt`,
            `${dir.src}/sitemap.xml`
        ]
    },

    options = {
        sass: {
            sourcemaps: true,
            outputStyle: 'compressed'
        },
        pug: {
            pretty: true,
            locals: {
                title: 'Titulo de la pagina',
                files: files
            }
        },
        babel: {
            presets: ['@babel/env']
        },
        imagemin: {
            progressive: true,
            use: [ pngquant() ]
        },
        svgmin: {
            plugins: [
                { convertColors : false},
                { removeAttrs : { atts : ['fills'] } }
            ]
        },
        uncss : { html : [`${dir.build}/*.html`] },
		autoprefixer : { 
			browsers : ['last 5 versions'],
			cascade : false 
		},
		htmlmin : {collapseWhitespace: true}
    };

gulp.task('pug', ()=>{
    gulp
        .src(`${dir.src}/pug/*.pug`)
        .pipe(pug(options.pug))
        .pipe(gulp.dest(dir.build))
})

gulp.task('sass', ()=>{
    gulp
        .src(`${dir.src}/scss/*.scss`)
        .pipe(sass(options.sass))
        .pipe( gulp.dest(`${dir.build}/css`))
})

gulp.task('ecma', ()=>{
    gulp
        .src(`${dir.src}/ecma/*.js`)
        .pipe(babel(options.babel))
        .pipe( gulp.dest(`${dir.build}/js`))
})

gulp.task('img', ()=>{
    gulp
        .src( `${dir.src}/img/**/*.+(png|jpeg|jpg|gif)` )
        .pipe( imagemin(options.imagemin) )
        .pipe( gulp.dest(`${dir.build}/img`) )
})

gulp.task('svg', ()=>{
    gulp
        .src( `${dir.src}/img/svg/*.svg` )
        .pipe( svgmin(options.svgmin) )
        .pipe( gulp.dest(`${dir.build}/img/svg`) )
})

gulp.task('webp', ()=>{
    gulp
        .src( `${dir.src}/img/**/*.+(png|jpeg|jpg)` )
        .pipe( webp() )
        .pipe( gulp.dest( `${dir.build}/img/webp`) )
})

gulp.task('fonts', ()=>{
    gulp
        .src( files.fonts )
        .pipe( gulp.dest(`${dir.build}/fonts`))
})

gulp.task('statics', ()=>{
    gulp
        .src( files.statics )
        .pipe( gulp.dest(dir.build) )
})

gulp.task('css', () => {
	gulp
		.src(files.CSS)
		.pipe( concat(files.mCSS) )
		.pipe( uncss(options.uncss) )
		.pipe( autoprefixer(options.autoprefixer) )
		.pipe( cleanCSS() )
		.pipe( gulp.dest(`${dir.build}/css`) );
});

gulp.task('js', () => {
	gulp
		.src( files.JS )
		.pipe( concat(files.mJS) )
		.pipe( uglify() )
		.pipe( gulp.dest(`${dir.build}/js`) );
});

gulp.task('html', () => {
	gulp
		.src(`${dir.build}/*.html`)
		.pipe( useref() )
		.pipe( htmlmin(options.htmlmin) )
		.pipe( gulp.dest(dir.build) );
});