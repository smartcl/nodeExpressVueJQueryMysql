let _ = require('lodash');

(function (util) {
    /**
     *返回成功的信息
     *@param res     <object>  response对象
     *@param message <string>  错误码  errCode: '0'为成功状态
     *@param data    <object>  返回的数据
    */
    util.sendSuccess = function (res, data) {
        let json = {
            errCode: '0'
        };
        if (res._csrf) json.cs = res._csrf;
        if (data) {
            json.data = data;
        }
        return res.json(json);
    };
    /**
     * 返回失败信息
     * @param res      <object>  response对象
     * @param errCode  <string>  错误码 E0000代表未知错误
     * @param errCode  <string>
     * @private
    */
    util.sendError = function (res, error) {
        if (_.isString(error)) {
            return res.json({
                errCode: 1024,
                errMessage: error
            });
        }
        return res.json({
            errCode: error.enumCode || returnCode.handleError.enumCode,
            errMessage: error.enumText || returnCode.handleError.enumText
        });
    };
}(exports));