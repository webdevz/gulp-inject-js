const fs = require('fs');
const through = require('through2').obj;
const PluginError = require('plugin-error');

const PLUGIN_NAME = 'gulp-inject-js';

module.exports = function() {
  'use strict';

  const PATTERN = /<\!--\s*inject-js\s*(.*?)\s*-->/gi;

  function scriptInject(file, _enc, callback) {

    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Stream not supported'));
      return callback();
    }

    if (file.isBuffer()) {
      let contents = String(file.contents);

      contents = contents.replace(PATTERN, function(_match, src) {
        return '<script type="text/javascript">\n' + fs.readFileSync(file.base + '/' + src) + '\n</script>';
      });

      file.contents = new Buffer(contents);
      this.push(file);
      return callback();
    }

    return callback();
  }

  return through(scriptInject);
};
