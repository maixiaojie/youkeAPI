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
        let reqphp = {
            project: 'jqhtml',
            spider: 'php'
        };
        let reqserver = {
            project: 'jqhtml',
            spider: 'server'
        };
        let reqcplusplus = {
            project: 'jqhtml',
            spider: 'cplusplus'
        };
        let reqcsharp = {
            project: 'jqhtml',
            spider: 'csharp'
        }
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
        let option_php = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded' 
            },
            payload: qs.stringify(reqphp)
        }
        let option_server = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded' 
            },
            payload: qs.stringify(reqserver)
        }
        let option_cplusplus = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded' 
            },
            payload: qs.stringify(reqcplusplus)
        }
        let option_csharp = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded' 
            },
            payload: qs.stringify(reqcsharp)
        }
        
        const promise_web = Wreck.request('POST', url, option_web);
        const promise_java = Wreck.request('POST', url, option_java);
        const promise_python = Wreck.request('POST', url, option_python);
        const promise_php = Wreck.request('POST', url, option_php);
        const promise_server = Wreck.request('POST', url, option_server);
        const promise_cplusplus = Wreck.request('POST', url, option_cplusplus);        
        const promise_csharp = Wreck.request('POST', url, option_csharp);        
        const res_web = await promise_web;
        const res_java = await promise_java;
        const res_python = await promise_python;
        const res_php = await promise_php;
        const res_server = await promise_server;
        const res_cplusplus = await promise_cplusplus;
        const res_csharp = await promise_csharp;
        const body_web = await Wreck.read(res_web, option_web)
        const body_java = await Wreck.read(res_java, option_java)
        const body_python = await Wreck.read(res_python, option_python)
        const body_php = await Wreck.read(res_php, option_php)
        const body_server = await Wreck.read(res_server, option_server)
        const body_cplusplus = await Wreck.read(res_cplusplus, option_cplusplus)
        const body_csharp = await Wreck.read(res_csharp, option_csharp)
        return {
            code: 1,
            data: {
                web: body_web.toString(),
                java: body_java.toString(),
                python: body_python.toString(),
                php: body_php.toString(),
                server: body_server.toString(),
                cplusplus: body_cplusplus.toString(),
                csharp: body_csharp.toString()
            },
            msg: '查询成功'
        }
    },

    
}

module.exports = cronjob