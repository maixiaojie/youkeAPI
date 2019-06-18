const goodsOptions = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, 
        {
            module: 'good-console'
        }, 'stdout'],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*', request: '*' }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }, {
            module: 'good-file',
            args: ['./log/fixtures/awesome_log']
        }]
    }
}

const swaggerOptions = {
	info: {
		title: '悠客社区 API Documentation',
		version: '0.0.1'
	}
}

const cronOptions = {
    jobs: [{
        name: 'spider_articles',
        time: '0 0 6,11,16,23 * * *',
        timezone: 'Asia/Shanghai',
        request: {
            method: 'GET',
            url: '/spider_articles'
        },
        onComplete: (res) => {
            console.log(res)
        }
    }]
}
module.exports = [
	{
		plugin: require('good'),
		options: goodsOptions
	},
	{
		plugin: require('hapi-router'),
		options: {
			routes: 'routers/*.js'
		}
	},
	{
		plugin:require('inert')
	},
	{
        plugin:require('vision')
    },
	{
		plugin: require('hapi-swagger'),
		options: swaggerOptions
    },
    {
        plugin: require('hapi-cron'),
        options: cronOptions
    },
    {
        plugin: require('hapio'),
        options: {
            origins: '*'
        }
    }
]