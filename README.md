## 运行

`npm install`

`npm run start`


## 接口说明

本地Url: `localhost:7777`


线上baseUrl: `https://api.mcust.cn/`

<table>
        <tr>
            <th>序号</th>
            <th>接口url</th>
            <th>请求方式</th>
            <th>描述</th>
            <th>其他</th>
            <th>线上示例</th>
        </tr>
        <tr>
            <th>1</th>
            <th>/course/getList/{pageNum}/{pageSize}?keyword=${keyword}</th>
            <th>get</th>
            <th>分页获取课程列表</th>
            <th>keyword(可选参数) 不为空则为搜索</th>
            <th><a href="https://api.mcust.cn/course/getList/1/5?keyword=python">获取python相关的课程</a></th>
        </tr>
        <tr>
            <th>2</th>
            <th>/course/getLessonList/{courseid}</th>
            <th>get</th>
            <th>获取课程详细数据</th>
            <th></th>
            <th><a href="https://api.mcust.cn/course/getLessonList/395">获取id为395的课程详情</a></th>
        </tr>
    </table>
