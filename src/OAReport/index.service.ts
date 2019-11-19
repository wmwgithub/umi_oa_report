import { Injectable } from '@nestjs/common';
import 'isomorphic-fetch'
@Injectable()
export class OAReportService {
  async getHello(): Promise<string> {
    return 'Hello OAreport!';
  }
  /**
   * @param cookie 用户的cookie用于OA解析生成用户身份信息
   */
  async userInfo(cookie: string): Promise<object> {
    console.log(cookie)
    let res = await fetch('http://v2.oa.lemonlife.top/api/getUserByStuid', {
      headers: {
        'cookie': cookie
      },
      method: "get"
    }).then((res) => res.json())
      .then(res => res)
    console.log(res)
    return {
      code: res.code,
      data: {
        id: res.data[0]['id'],
        stuid: res.data[0]['stuid'],
        depart: res.data[0]['depart'],
        role: res.data[0]['role'],
        status: res.data[0]['status'],
        campus: res.data[0]['campus']
      }
    }
  }
}
