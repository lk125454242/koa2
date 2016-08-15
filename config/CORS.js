/**
 * Created by Administrator on 2016/8/15.
 */
export default function (ctx,next) {
    var res = ctx.response;
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "content-type");
    res.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
}