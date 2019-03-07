<template>
    <div>
        <div id="rules">
                <div id="rules-content">
                <span class="demonstration">日志来源</span>
                <el-select v-model="sourceValue" placeholder="请选择" @change="sourceChange" class="topPadding">
                    <el-option
                      v-for="item in rules.source"
                      :key="item.source"
                      :label="item.source"
                      :value="item.source">
                    </el-option>
                </el-select>
                <span class="demonstration">日志类型</span>
                <el-select v-model="typeValue" placeholder="请选择" @change="typeChange" class="topPadding">
                    <el-option
                      v-for="item in rules.type"
                      :key="item.type"
                      :label="item.type"
                      :value="item.type">
                    </el-option>
                </el-select>
                <div class="block topPadding">
                    <span class="demonstration">登录时间</span>
                    <el-date-picker
                      v-model="loginTime"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="rangeLoginTime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      :default-time="['00:00:00', '23:59:59']"
                      @change="loginTimeChange">
                    </el-date-picker>
                </div>
            </div>
        </div>
        <div class="log">
            <el-table :data="log" :height="tableHeight" class="log-table" :default-sort = "{prop: 'date', order: 'descending'}">

                <!--<el-table-column prop="source" label="管理员" width="200"></el-table-column>
                <el-table-column prop="type" label="类型" width="200"></el-table-column>-->
                <el-table-column prop="loginName" label="用户名（工号）" min-width='!10%'></el-table-column>
                <el-table-column prop="email" label="邮箱" min-width='!10%'></el-table-column>
                <el-table-column prop="model" label="设备型号"  min-width='!10%'></el-table-column>
                <el-table-column prop="loginTime" label="登录时间" min-width='!10%'></el-table-column>
                <el-table-column prop="occurTime" label="发生时间" min-width='!10%'></el-table-column>
                <el-table-column prop="timeUsed" label="耗时(ms)" min-width='!10%'></el-table-column>
                <el-table-column prop="failedReason" label="失败原因"  min-width='!10%'></el-table-column>
                <el-table-column prop="uploadFailedReason" label="上传失败原因"></el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size=onePageLogNum
                layout="total, prev, pager, next"
                :total="logTotal">
            </el-pagination>
        </div>
    </div>
</template>

<script  type="text/ecmascript-6">
import $ from 'jquery'
import '../../style/log.less'

export default {
    data () {
        return {
            log: [],
            rules: {},
            getLogUrl: this.GLOBAL.host + '/log/getLog',
            getRulesUrl: this.GLOBAL.host + '/log/getRules',
            getTypeUrl: this.GLOBAL.host + '/log/getType',
            onePageLogNum: 10,
            currentPage: 1,
            logTotal: 0,
            tableHeight: 0,
            sourceValue: '',
            typeValue: '',
            currentRules: {},
            rangeLoginTime: {
                disabledDate(time) {
                    return time.getTime() > overToday;
                }
            },
            loginTime: ''
        }
    },
    methods: {
        getLog (data) {
            return $.ajax({
                url: this.getLogUrl,
                type: 'get',
                data: data
            });
        },
        getRules () {
            return $.ajax({
                url: this.getRulesUrl,
                type: 'get',
            });
        },
        getType (data) {
            return $.ajax({
                url: this.getTypeUrl,
                type: 'get',
                data: data
            });
        },
        updateLog (page) {
            let start = (page - 1) * this.onePageLogNum;
            return this.getLog({...this.currentRules, ...{start: start, num: this.onePageLogNum}}).then((res) => {
                // deal data
                console.log(res)
                this.currentPage = page;
                this.logTotal = res.data.count;
                this.log = res.data.log;
            }).catch((err) => {
                // deal error 
            });
        },
        handleCurrentChange () {
            this.updateLog(this.currentPage);
        },
        updateCurrentRules (sourceValue, typeValue, time) {
            this.currentRules = {
                sourceValue: sourceValue,
                typeValue: typeValue,
                loginTime: time ? time : ['1997-01-01', '2100-01-01']
            }
        },
        sourceChange (value) {
            // reset type, time, update log list
            console.log(value);
            this.loginTime = '';
            this.getType({source:value}).then((type) => {
                this.rules.type = type.data;
                console.log(type.data[0].type);
                this.typeValue = type.data[0].type;
                this.updateCurrentRules(value, type.data[0].type);
                this.updateLog(1);
            });
        },
        typeChange (value) {
            // reset time, update log list
            console.log(value);
            this.loginTime = '';
            this.updateCurrentRules(this.sourceValue, value);
            this.updateLog(1);
        },
        loginTimeChange (time) {
            // update log list
            console.log(time);
            this.updateCurrentRules(this.sourceValue, this.typeValue, time.slice(0, 2));
            this.updateLog(1);
        }
    },
    mounted () {
        // get search rules
        this.getRules().then((rules) => {
            console.log(rules);
            this.rules = rules.data;
            this.sourceValue = this.rules.source[0].source;
            this.typeValue = this.rules.type[0].type;
            this.updateCurrentRules(this.sourceValue, this.typeValue);
            // init log list
            this.updateLog(1).then(() => {
                this.tableHeight = $(window).height() - $("#rules").height() - 60;
            });
        });
    }
}
</script>

<style scoped>

</style>
