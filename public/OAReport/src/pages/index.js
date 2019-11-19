import { Component } from 'react';
import { connect } from 'dva';
import { Card, message } from 'antd';
import WriteReport from "./tabsComponents/WriteReport/";
import MyReport from "./tabsComponents/MyReport";
import ExamReport from "./tabsComponents/ExamReport/";
import cookie from 'react-cookies'
class Report extends Component {
  state = {
    titleKey: 'one',
    tabListTitle: [
      {
        key: 'one',
        tab: '填写汇报',
        role: 0
      },
      {
        key: 'two',
        tab: '我的汇报',
        role: 0
      },
      {
        key: 'three',
        tab: '审核汇报',
        role: 1
      }
    ],
    contentList: {
      one: <WriteReport />,
      two: <MyReport />,
      three: <ExamReport />,
    }
  }
  componentDidMount() {
    // console.log(this.props)
    if (this.props.user && this.props.cookie) {
      // document.cookie = this.props.cookie
      let oaCookie = this.props.cookie.split(';')[0]
      oaCookie = oaCookie.split('=')
      // console.log('oaCookie',oaCookie)
      cookie.save(oaCookie[0], oaCookie[1])
      this.props.dispatch({
        type: 'report/setUser',
        payload: this.props.user
      })
      // console.log(document.cookie, 'documentcookie')
      // console.log('--------------')
      // console.log(this.props.cookie, 'this.props.cookie')
    } else {
      //上报用户信息和错误信息到反馈系统
      message.error("发生错误,建议设置页面反馈", 10)
    }
  }
  render() {
    return (
      this.props.report.user && <Card
        style={{ width: '100%' }}
        tabList={this.state.tabListTitle.filter(item => item.role <= this.props.report.user.role)}
        // tabList={this.state.tabListTitle}
        activeTabKey={this.state.titleKey}
        onTabChange={(key) => { this.setState({ titleKey: key }) }}
      >
        {this.state.contentList[this.state.titleKey]}
      </Card>
      // <h1>Hello world</h1>
    );
  }

}

export default connect(({ report }) => ({
  report: report
}))(Report);
