import { Controller, Get, Res, Req, Post, Body, Query } from '@nestjs/common';
import { renderToNodeStream } from 'react-dom/server'
import { OAReportService } from './index.service';
import { Request, Response } from 'express';
import { join } from 'path';
@Controller()
export class OAReportController {
  constructor(private readonly oAReportService: OAReportService) { }

  @Get()
  async OaReportHTML(@Res() res: Response, @Req() req: Request, @Query('cookie') cookie: string) {
    console.log(cookie)
    !cookie && res.render('err.hbs')
    let user = await this.oAReportService.userInfo(cookie)
    /**如果获取到的信息有错直接返回有错的结果*/
    if (user['code'] !== 2000) {
      res.send('解析错误')
      return user
    }
    global['window'] = {};
    const serverRender = require(join(__dirname, '../../public/OAReport/dist/umi.server.js'));
    // 提供 react-dom/server，避免 React hooks ssr 报错
    const { ReactDOMServer } = serverRender;
    // console.log('serverRender',serverRender)
    // console.log(ReactDOMServer, 'ReactDomServer')
    let {
      // 当前路由元素
      rootContainer,
      // 页面模板
      htmlElement,
      // 匹配成功的前端路由，比如 /user/:id
      matchPath,
      // 初始化 store 数据，若使用 dva
      g_initialData,
    } = await serverRender.default(res);
    // console.log('g_in', g_initialData)
    g_initialData = {
      ...g_initialData,
      user: user['data'],
      cookie: cookie
    }
    console.log(encodeURIComponent(JSON.stringify(g_initialData)))
    let ssrHtml: string = ReactDOMServer.renderToString(htmlElement);
    res.render("index.hbs", {
      JSPath: './oa/report/umi.js',
      CSSPath: './oa/report/umi.css',
      g_initialData: encodeURIComponent(JSON.stringify(g_initialData))
    })
    return;
  }
}