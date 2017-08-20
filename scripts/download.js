const package = require('../package.json')
const electronVersion = package.devDependencies.electron
const download = require('electron-download')
const homePath = require('home-path');
const path = require('path')

function downloadArch(arch) {
  return new Promise((resolve, reject)=>{
    download({
      mirror: 'https://npm.taobao.org/mirrors/electron/',
      version: electronVersion,
      cache: path.join(homePath(), './.electron'),
      arch: arch,
      platform: 'win32'
    }, function (err, zipPath) {
      // zipPath will be the path of the zip that it downloaded. 
      // If the zip was already cached it will skip 
      // downloading and call the cb with the cached zip path. 
      // If it wasn't cached it will download the zip and save 
      // it in the cache path. 
      if (err) {
        return reject(err)
      }
      resolve(zipPath)
    })
  })
}

let allDownloads = Promise.all([
  downloadArch('ia32'),
  downloadArch('x64')
])

allDownloads.then((urls)=>{
  console.log('The following electron prebuild binaries downloaded')
  for (let url of urls) {
    console.log(url)
  }
})