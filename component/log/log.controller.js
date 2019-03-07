let utils = require("../../lib/utils");
let helper = require("./log.helper");
let repository = require("./log.repository");

module.exports = {
    // 允许跨域访问
    allowOrigin: function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods","POST,OPTIONS");
        if (req.method === "OPTIONS") {
            res.sendStatus(200);
        } else {
            next();
        }
    },
    record: function (req, res) {
        if (!req.body.log) {
            return utils.sendError(res, "参数错误");
        }
        let log = req.body.log;
        // try {
        //     log = JSON.parse(log);
        // } catch (e) {
        //     return utils.sendError(res, "json字符串解析失败，请检查参数是否正确");
        // }

        if (log.loginTime) {
            log.loginTime = new Date(parseInt(log.loginTime));
        }
        if (log.occurTime) {
            log.occurTime = new Date(parseInt(log.occurTime));
        }
        repository.record(log).then(() => {
            return utils.sendSuccess(res, {});
        }).catch((err) => {
            console.log(err);
            return utils.sendError(res, "日志记录失败，请检查日志是否符合规定");
        });
    },
    getLog: function (req, res) {
        console.log(req.query);
        repository.get(req.query).then((log) => {
            return utils.sendSuccess(res, log);
        }).catch((err) => {
            console.log(err);
            return utils.sendError(res, "获取日志记录失败");
        });
    },
    getRules: function (req, res) {
        repository.getRules(req.query).then((rules) => {
            return utils.sendSuccess(res, rules);
        }).catch((err) => {
            console.log(err);
            return utils.sendError(res, "获取日志记录检查规则失败");
        });
    },
    getType: function (req, res) {
        repository.getType(req.query).then((rules) => {
            return utils.sendSuccess(res, rules);
        }).catch((err) => {
            console.log(err);
            return utils.sendError(res, "获取日志记录类型失败");
        });
    }
};