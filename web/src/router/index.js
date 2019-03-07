import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const PageLog = resolve => require(['../pages/PageLog/LogContent'], resolve);

export default new Router({
  routes: [
    {
        meta: {
            label: '日志查看'
        },
        path: '/',
        // name: 'HelloWorld',
        component: PageLog
    }
  ]
})
