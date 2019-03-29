const Wreck = require('wreck')
const qs = require('querystring')
let cronjob = {
    async spider_articles(req) {
        let url = 'http://106.12.202.229:6800/schedule.json';
        let reqweb = {
            project: 'jqhtml',
            spider: 'web'
        };
        let reqjava = {
            project: 'jqhtml',
            spider: 'java'
        };
        let reqpython = {
            project: 'jqhtml',
            spider: 'python'
        };
        let option_web = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded' 
            },
            payload: qs.stringify(reqweb)
        };
        let option_java = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded' 
            },
            payload: qs.stringify(reqjava)
        }
        let option_python = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded' 
            },
            payload: qs.stringify(reqpython)
        }
        const promise_web = Wreck.request('POST', url, option_web);
        const promise_java = Wreck.request('POST', url, option_java);
        const promise_python = Wreck.request('POST', url, option_python);
        const res_web = await promise_web;
        const res_java = await promise_java;
        const res_python = await promise_python;
        const body_web = await Wreck.read(res_web, option_web)
        const body_java = await Wreck.read(res_java, option_java)
        const body_python = await Wreck.read(res_python, option_python)
        return {
            code: 1,
            data: {
                web: body_web.toString(),
                java: body_java.toString(),
                python: body_python.toString()
            },
            msg: '查询成功'
        }
    },

    
}

module.exports = cronjob