var Log = require('log');
var shelljs = require('shelljs');
var colors = require('colors');

var logger = new Log('warning');
if(!shelljs.which('hugo')) { 
    logger.warning(colors.red('Hugo is required in $PATH, https://gohugo.io'));
    shelljs.exit(1);
}
