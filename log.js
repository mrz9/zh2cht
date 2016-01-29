/**
 * 使用方法 require('../log.js')(options);
 * options 可为空，参数列表如下
 * path : 相对于__dirname的目录，使用path.resolve(__dirname,options.path)来生成日子目录,默认目录是logs;
 * debug : 是否开启调试模式，若为false log.write('debug')不执行任何操作，切初始化不会生成debug响应的目录,默认为false;
 */


'use strict';
const fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    FileStreamRotator = require('file-stream-rotator');

  class Log{
    constructor(opts){
      let logDirectory = opts.path || './logs';

      this.debug = opts.debug || false;

      this.rootPath = path.resolve(__dirname,logDirectory);
      if(!this.rootPath) return new Error('logDirectory Error');
      fs.existsSync(this.rootPath) || fs.mkdirSync(this.rootPath);

      //创建error目录
      this.errorPath = path.normalize(this.rootPath + '/error');
      fs.existsSync(this.errorPath) || fs.mkdirSync(this.errorPath);
      this.errorStream = FileStreamRotator.getStream({filename: this.errorPath + '/%DATE%.log',frequency: 'daily', verbose: false, date_format: "YYYY-MM-DD"});

      //创建info目录
      this.infoPath = path.normalize(this.rootPath + '/info');
      fs.existsSync(this.infoPath) || fs.mkdirSync(this.infoPath);
      this.infoStream = FileStreamRotator.getStream({filename: this.infoPath + '/%DATE%.log',frequency: 'daily', verbose: false, date_format: "YYYY-MM-DD"});

      if(this.debug){
        //创建debug目录
        this.debugPath = path.normalize(this.rootPath + '/debug');
        fs.existsSync(this.debugPath) || fs.mkdirSync(this.debugPath);
        this.debugStream = FileStreamRotator.getStream({filename: this.debugPath + '/%DATE%.log',frequency: 'daily', verbose: false, date_format: "YYYY-MM-DD"});
      }
    }
    getRootPath(){
      return this.rootPath;
    }

    /**
     * 写日志方法
     * @date   2016-01-28
     * @author MRZ
     * @param  {[type]}   level    [description]
     * @param  {[type]}   location [fileName + functionName [+ ..]] //该项为自定义标记信息，可选
     * @param  {[type]}   errMsg      [errMsg]
     * @return {[type]}            [description]
     */
    write(level,location,errMsg){
      let meta = '[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] ' + location  + '\n';
      let streamHandle;
      switch(level){//'error','info','debug'
        case 'error':
          streamHandle = this.errorStream;
          break;
        case 'info':
          streamHandle = this.infoStream;
          break;
        case 'debug':
          if(!this.debug) return false;
          streamHandle = this.debugStream;
          break;
        default:
          streamHandle = this.errorStream;
      }
      if(toString.call(errMsg) === '[object Error]') errMsg = errMsg.stack; // 如果errMsg是error就打印stack;
      streamHandle.write(meta + errMsg + '\n');
    }
  }

module.exports = function(options){
  let opts = {};
      opts.path = options && options.path || '';
      opts.debug = options && options.debug || false;
  return new Log(opts);
}
