## 运行

`npm install`

`npm run start`

## 热部署

本地开发使用`supervisor`来进行热部署

`npm install supervisor -g`

`npm run dev`

线上使用`pm2`来进行部署

`npm install pm2 -g`

`npm run pm2`

第二次部署的时候使用下面的脚本

`. restart.sh`

改脚本会进行一下操作：

- 从 Git 服务器上pull代码

- 通过 pm2 的命令重启应用



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
            <th>/course/search/{pageNum}/{pageSize}?keyword=${keyword}</th>
            <th>get</th>
            <th>分页获取课程列表</th>
            <th>keyword - 关键词</th>
            <th><a href="https://api.mcust.cn/course/search/1/5?keyword=python">获取python相关的课程</a></th>
        </tr>
        <tr>
            <th>2</th>
            <th>/course/getCourseList/{pageNum}/{pageSize}?type=${type}</th>
            <th>get</th>
            <th>根据分类获取课程信息</th>
            <th>type - 分类</th>
            <th><a href="https://api.mcust.cn/course/getCourseList/1/5?type=python">获取类别为python的课程</a></th>
        </tr>
        <tr>
            <th>3</th>
            <th>/course/getLessonList/{courseid}</th>
            <th>get</th>
            <th>获取课程详细信息</th>
            <th></th>
            <th><a href="https://api.mcust.cn/course/getLessonList/395">获取id为395的课程详情</a></th>
        </tr>
        <tr>
            <th>4</th>
            <th>/praise?uid=${uid}&tid=${tid}&ct=${ct}</th>
            <th>get</th>
            <th>点赞/取消点赞</th>
            <th>uid [用户id]  tid [文章或者视频的id]  ct [content_type 1-视频 2-文章]</th>
            <th><a href="https://api.mcust.cn/praise?uid=1&tid=1&ct=2">uid为1的用户给id为1的文章点赞或者取消点赞</a></th>
        </tr>
        <tr>
            <th>5</th>
            <th>/collection?uid=${uid}&tid=${tid}&ct=${ct}</th>
            <th>get</th>
            <th>收藏/取消收藏</th>
            <th>uid [用户id]  tid [文章或者视频的id]  ct [content_type 1-视频 2-文章]</th>
            <th><a href="https://api.mcust.cn/collection?uid=1&tid=1&ct=2">uid为1的用户收藏/取消收藏id为1的文章</a></th>
        </tr>
    </table>
