
module.exports = {
    //cli 3.3以上弃用baseUrl 请使用publicPath
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    // publicPath:"./",


    lintOnSave: false,
}