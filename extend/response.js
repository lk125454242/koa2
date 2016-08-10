/**
 * Created by Administrator on 2016/8/10.
 */



module.exports = {
    session : (req) => {
        req.set({
            'Content-Type': 'application/json',
            'Content-Length': '' + msg.length,
            'ETag': Math.floor(Math.random() * 1000 + 1000)
        })
    }
};