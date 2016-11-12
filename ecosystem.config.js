module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  "apps": [
    {
      "name": "mobile", //应用程序的名称 应用名称
      "cwd": "/home/www/mobile", //应用程序所在的目录
      "script": "/home/www/mobile/bin/run", //应用程序的脚本路径 实际启动脚本
      "exec_interpreter": "nodejs", //应用程序的脚本类型，这里使用的shell，默认是nodejs
      "min_uptime": "20s", //最小运行时间
      "max_restarts": 10, //设置应用程序异常退出重启的次数，默认15次（从0开始计数）
      //"exec_mode": "fork", //应用程序启动模式，这里设置的是cluster_mode（集群），默认是fork
      "error_file": "/home/www/mobile/log/mobile-err.log", //自定义应用程序的错误日志文件
      "out_file": "/home/www/mobile/log/mobile-out.log", //自定义应用程序日志文件
      //"pid_file": "/data/pm2/log/mobile.pid", //自定义应用程序的pid文件
      "watch": true, // 监控变化的目录，一旦变化，自动重启 或者 是否启用监控模式
      "ignore_watch": [ // 从监控目录中排除
        "node_modules",
        "logs",
        "public"
      ],
      "env_production": {
        "NODE_ENV": "production"
      },
      "env_development": {
        "COMMON_VARIABLE": "true",
        "NODE_ENV": "development"
      },
      "env_test": {
        "NODE_ENV": "test",
        "DEBUG": "debug"
        //,"REMOTE_ADDR": "http://wtest.example.com/"
      }
    }
  ],
  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  "deploy": {
    "production": {
      "user": "root",//登录账号
      "host": "139.199.30.189",//服务器地址
      "ref": "origin/master",//git 分支
      "repo": "git@github.com:lk125454242/koa2.git",
      "path": "/home/www/mobile",//服务器项目目录
      "post-deploy": "npm install && pm2 restart /home/www/mobile/ecosystem.json --env production",//代码部署完之后执行的命令
      "env": {
        "NODE_ENV": "production"
      }
    },
    "dev": {
      "user": "root",//登录账号
      "host": "139.199.30.189",//服务器地址
      "ref": "origin/master",//git 分支
      "repo": "git@github.com:lk125454242/koa2.git",
      "path": "/home/www/mobile",//服务器项目目录
      "post-deploy": "npm install && pm2 restart /home/www/mobile/ecosystem.json --env development",
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}

