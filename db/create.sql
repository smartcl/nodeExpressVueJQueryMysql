CREATE DATABASE  IF NOT EXISTS `putian_log`;
USE `putian_log`;
DROP TABLE IF EXISTS `log`;

CREATE TABLE `log` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `source` VARCHAR(45) NULL COMMENT '日志来源',
  `type` VARCHAR(45) NULL COMMENT '每个来源对应的日志类型，应该是有限个，最少一个',
  `loginName` VARCHAR(45) NULL COMMENT '登录工号或者用户名',
  `email` VARCHAR(45) NULL COMMENT '邮箱',
  `model` VARCHAR(45) NULL COMMENT '设备型号',
  `loginTime` DATETIME NULL COMMENT '登录时间',
  `occurTime` DATETIME NULL COMMENT '日志发生时间',
  `timeUsed` VARCHAR(45) NULL COMMENT '耗时',
  `failedReason` VARCHAR(500) NULL COMMENT '失败原因',
  `uploadFailedReason` VARCHAR(500) NULL COMMENT '上传失败原因',
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='日志信息';

use putian_log;

SET SQL_SAFE_UPDATES = 0;