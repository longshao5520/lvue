const exec = require('child_process').exec;
const rimraf = require('rimraf');
const merge2 = require('merge2')
const gulp = require('gulp')
const ts = require('gulp-typescript')
const tsConfigBase = require('../tsconfig.json')
const tsDefaultReporter = ts.reporter.defaultReporter()
// 构建时，ts 配置
const tsconfig = {
  noUnusedParameters: true,
  noUnusedLocals: true,
  strictNullChecks: true,
  target: 'es6',
  jsx: 'preserve',
  moduleResolution: 'node',
  declaration: true, // 生成类型定义
  allowSyntheticDefaultImports: true,
  ...tsConfigBase.compilerOptions
}
// 清除上次打包文件
function clean (done){
  rimraf.sync('../lib');
  done()
}
// ts引入源
const TS_SOURCE = [
  '../packages/**/*.js',
  '../packages/**/*.jsx',
  '../packages/**/*.tsx',
  '../packages/**/*.ts',
  '../packages/**/*.d.ts',
  '!packages/*/__tests__/*',
]




function compileDTS(){
  let error = 0


  const tsResult = gulp.src(TS_SOURCE).pipe(
    ts(tsconfig, {
      error(e){
        tsDefaultReporter.error(e)
        error = 1
      },
      finish: tsDefaultReporter.finish,
    })
  )


  function check() {
    if (error && !argv['ignore-error']) {
      process.exit(1)
    }
  }


  tsResult.on('finish', check)
  tsResult.on('end', check)
  // 因为 vue-cli 构建配置已经包含了对ts文件的处理，所以这里只生成对应的类型文件
  const tsd = tsResult.dts.pipe(gulp.dest('../lib/types'))


  return merge2([
    tsd
  ])
}


function buildLib(cb){
  return exec(`yarn lib`, (err, stdout, stderr) => {
    console.log('info: ', stdout)
    console.error('error: ', stderr)
    cb(err)
  })
}
// 配置对应的命令任务
exports.types = gulp.series(compileDTS)
exports.buildLib = gulp.series(buildLib)
exports.default = gulp.series(clean, buildLib, compileDTS)
