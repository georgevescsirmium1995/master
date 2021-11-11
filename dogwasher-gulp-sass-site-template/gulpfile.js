const gulp = require('gulp');
const sass = require("gulp-sass")(require('node-sass'));
const clean_css = require('gulp-clean-css');
const rename = require('gulp-rename')
const browser_sync = require('browser-sync');
const concat = require('gulp-concat');
const uglify_es = require('gulp-uglify-es').default;
const image_min = require('gulp-imagemin');
const del = require('del');
const minimist = require('minimist');
const gulpif = require('gulp-if');

var known_options = {
   string: 'env',
   default: { env: process.env.NODE_ENV || 'production' }
 };

 var options = minimist(process.argv.slice(2), known_options);


// compiles SCSS from /SCSS/ directory to css and exports it to a /dist/ diractory
function style()
{
   // select folder with SASS/SCSS files and get all *.scss files in any directory recursivly
   return gulp.src('./scss/**/*.scss')
   // pipe them (send them) to sass preprocesor (compiler), on error log error
      .pipe(sass().on('error',sass.logError))
   // minimize compiled css
      .pipe(gulpif(options.env === 'production', clean_css())) // only minify in production
   // rename minimized css file to append sufix min
      .pipe(gulpif(options.env === 'production', rename({ suffix: ".min" })))
   // save generated css to a directory
      .pipe(gulp.dest('./dist/css/'))  
      .pipe(browser_sync.stream())
}

// minimizes images in /images/ directory
function minimize_images()
{
   // cam be automated via watch
   return gulp.src('./images/**/*')
      .pipe(image_min())
      .pipe(gulp.dest('./images'))
}

// copies required JavaScript libraries from /js/libs/ to /dist/js/lib/ folder
function copy_javascript_libraries()
{
   // select folder with SASS/SCSS files and get all *.scss files in any directory recursivly
   return gulp.src('./js/lib/*.js')
      .pipe(gulp.dest('./dist/js/lib/'))  
}

// copies required CSS styles from /css/ to /dist/css/ folder
function copy_css()
{
   // select folder with SASS/SCSS files and get all *.scss files in any directory recursivly
   return gulp.src(['css/**/*']).pipe(gulp.dest('dist/css'));
}

// combines all JavaScript files from /js/custom/ folder into one file, uglifies it and exports to /dist/js/ folder
function custom_scripts()
{
   // select all JavaScript files from /js/custom directory
   return gulp.src('./js/custom/*.js')
   // concat all selected JavaScript files into one JavaScript file
    .pipe(concat('dogwasher.js'))
   // uglify concatinated file (minify)
   .pipe(gulpif(options.env === 'production', uglify_es())) // only minify in production
   // rename uglified file
    .pipe(gulpif(options.env === 'production', rename('dogwasher.min.js')))
   // copy uglified JavaScript file
    .pipe(gulp.dest('./dist/js/')
    );
}

// compiles all javascript files from /js/ directory and copies them to /dist/ (calls custom_scripts and terminal_script)
function compile_all_javascript(callback)
{
   // call functions in serial sequence one after another
   gulp.series(custom_scripts);
   // reload browser
   browser_sync.reload();
   // return callback to notify that functions (tasks) have been executed
   callback();
}

// clears dist filder
function clear_dist()
{
   return del('dist/**', {force:true});
}

function develop(callback)
{

   if (process.argv.length!=5 && process.argv[3]!="--env" && (process.argv[4]!="develop" || process.argv[4]!="production")) 
   {
      console.log("develop function ended. Please specify environment with \"gulp develop --env develop\" or \"gulp develop --env production\"")
      return gulp.src('./scss/**/*.scss');
   }

   // startup functions (generate, copy needed files etc)
   gulp.series(clear_dist, style, copy_javascript_libraries, custom_scripts, copy_css);

   clear_dist();
   style();
   copy_javascript_libraries();
   custom_scripts();
   copy_css();
   
   // init browser sync, base directory is root, port 5005
   browser_sync.init
   ({
      injectChanges: true,
      server :
      {
         baseDir: './',
         index : gulpif(options.env === 'production', 'index.html', 'index_dev.html')
      },
         port : 3003
   });
   
   // recompile and minify scss on any change
   gulp.watch('./SCSS/**/*.scss', style)
   // reload if html page changes
   gulp.watch('./*html').on('change', browser_sync.reload)
   // reload if js changes
   gulp.watch('./js/**/*.js').on('change', function()
   {
      copy_javascript_libraries();
      custom_scripts();
   
      browser_sync.reload();
   })
   
   callback();
}

// **************************************************************** //
// Functions that can be called via terminal eg. gulp function_name //
// **************************************************************** //

exports.style = style
exports.minimize_images = minimize_images
exports.clear_dist = clear_dist
exports.develop = develop
exports.copy_javascript_libraries = copy_javascript_libraries
exports.custom_scripts = custom_scripts
exports.compile_all_javascript = compile_all_javascript


