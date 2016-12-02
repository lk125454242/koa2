const cwd = process.cwd();
const crypto = require(cwd + '/middleware/crypto');
const response = require(cwd + '/middleware/response');

module.exports = async function (ctx, next) {
    console.log(Date.now(), 'authority1');
    await this.regenerateSession();//获取session之前调用
    let now = this.session.now;
    if(!now){
        console.log('2')
        return ctx.status = 301;

        return response.error(this,{
            code: 301,
            message: '登录失效'
        })
    }
    console.log(Date.now(), 'authority2');
    let decode = crypto.decipher('aes-128-cbc',this.session.login || '');
    if(now !== decode){

        return response.error(this,{
            code: 301,
            message: '登录失效'
        })
    }else{
        next();
    }
    console.log(Date.now(), 'authority3');
}