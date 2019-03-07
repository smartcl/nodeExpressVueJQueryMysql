let mySql = require('../../lib/repository/base.repository.js');

// mySql.query(`INSERT INTO log SET ?`, [{log: "123"}]);

(function (repository) {
    repository.record = (obj) => {
        let sql =  `INSERT INTO log SET ?`;
        let values = [obj];
        return mySql.query(sql, values);
    };
    repository.get = (obj) => {
        let getLog = `  
                    SELECT source, type, loginName, email, model,
                    date_format(loginTime, '%Y/%m/%d %H:%i:%S') as loginTime,
                    date_format(occurTime, '%Y/%m/%d %H:%i:%S') as occurTime,
                    timeUsed, failedReason, uploadFailedReason
                    FROM log`;
        let where = `
                    WHERE source = ? AND loginTime BETWEEN ? AND ?
                    `;
        let values = [obj.sourceValue, obj.loginTime[0], obj.loginTime[1]];
        if (obj.typeValue !== '全部') {
            where += ` AND type = ?`;
            values.push(obj.typeValue);
        }
        values.push(parseInt(obj.start));
        values.push(parseInt(obj.num));
        let getTotal = `SELECT count(*) as num FROM log`;
        getLog += where + ` limit ?, ?`;
        getTotal += where;
        console.log(getLog);
        console.log(getTotal);
        let res = {};
        return mySql.query(getLog, values).then((log) => {
            return mySql.query(getTotal, values.slice(0, values.length - 2)).then((count) => {
                res.log = log;
                res.count = count[0].num;
                return res;
            });
        });
    };
    repository.getRules = (obj) => {
        let getSource =  `SELECT source FROM log GROUP BY source`;
        let getType = `SELECT type FROM log WHERE source = ? GROUP BY type`;
        let res = {};
        return mySql.query(getSource, []).then((source) => {
            return mySql.query(getType, [source[0].source]).then((type) => {
                type.unshift({type: '全部'});
                res.source = source;
                res.type = type;
                return res;
            });
        });
    };
    repository.getType = (obj) => {
        let getType = `SELECT type FROM log WHERE source = ? GROUP BY type`;
        return mySql.query(getType, [obj.source]).then((type) => {
            type.unshift({type: '全部'});
            return type;
        });
    }
} (exports));