class PathTransform {


  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      console.log('pathTransform');

      for(var filePathName in compilation.assets) {
        const reg = /easicare-mobile\/static\//i;

        //需要替换的最终字符串
        const cdnRoot = '//cdn1.seewo.com/static/';

        let content = compilation.assets[filePathName].source() || '';
        content = content.replace(reg, cdnRoot);

        compilation.assets[filePathName] = {
          source() {
            return content;
          },
          size() {
            return content.length;
          }
        }

      }
      callback();

    })
  }
}

module.exports = PathTransform;