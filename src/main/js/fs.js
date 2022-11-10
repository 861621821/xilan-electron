const fs = require('fs')
// 读取文件方法
function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { flag: 'r', encoding: 'utf-8' }, (err, data) => {
      if (err) { reject('文件读取出错'); }
      resolve(data);
    });
  })
}

function writeFile(path, str) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, str, (err) => {
      if (err) { reject('文件写入出错'); }
    });
  })
}

module.exports = { readFile, writeFile }