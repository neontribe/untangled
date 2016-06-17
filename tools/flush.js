var Log = require('log');
var logger = new Log('info');
var colors = require('colors');
var shelljs = require('shelljs');
logger.info(colors.yellow('Adding changes to git...'));
shelljs.exec('git add -A');
shelljs.exec('git commit -m "CSS/JS Build"');
logger.info(colors.green('OK'));
