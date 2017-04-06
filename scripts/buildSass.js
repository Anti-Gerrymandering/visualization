const colors = require('colors').red
const fs = require('fs')
const spawn = require('child_process').spawnSync

function sassBuilder () {
  const cssOutPut = spawn('node-sass', ['App.sass', '--output-style', 'compressed'], { cwd: process.cwd() + '/src/sass' })
  return cssOutPut.stdout.toString()
}

function mkdir (dir, callback) {
  fs.stat(dir, (err, stats) => {
    if (err && (err.errno === 34 || err.errno === -2)) {
      fs.mkdir(dir)
    }
    callback()
  })
}

function main () {
  const css = sassBuilder()
  const buildDir = process.cwd() + '/build'
  const build = () => {
    fs.writeFile(process.cwd() + '/build/style.css', css, err => {
      if (err) console.error(colors.bold('CSS wasn\'t produced'))
    })
  }
  mkdir(buildDir, build)
}

main()
