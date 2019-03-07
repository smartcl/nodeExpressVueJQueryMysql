const fs = require('fs');
const path = require('path');
module.exports = function (service) {
  // service.authenticate();
  let dirPath = path.join(__dirname, '../', 'component');

  // 重构：此方法自动加载component任意目录下的index.js, 可以自由组织component下的文件夹
  getFiles(dirPath, [], 'index.js');

  function getFiles (dir, files_, fileName) {
    files_ = files_ || [];
    let files = fs.readdirSync(dir);
    for (let i in files) {
      let name = dir + '/' + files[i];
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files_, fileName);
      } else {
        if (name.indexOf(fileName, name.length - fileName.length) !== -1) {
          require(name)(service);
        }
      }
    }
    return files_;
  }
};
