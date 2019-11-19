import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import WriteForm from "./WriteForm";

class WriteReport extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'report/getReportStatus',
    })
  }
  render() {
    // console.log(this.props)
    const { reportStatus } = this.props
    const fontStyle = { fontSize: '16px', lineHeight: '30px' }
    const titleStyle = { fontSize: '28px', lineHeight: '30px' }
    return (
      <div>
        {
          reportStatus.report_stat === 'open'
          && (
            +new Date(reportStatus.report_end_date) > +new Date()
              ? <Row gutter={24}>
                <Col lg={12} xs={24}>
                  <WriteForm />
                </Col>
                <Col lg={12} xs={24} style={fontStyle}>
                  <p style={titleStyle}>注意事项：</p>
                  １、本次汇报开启时间： <span style={{ color: '#d73435' }}> {reportStatus.report_start_date} ~ {reportStatus.report_end_date} </span><br />
                  ２、本次审核开启时间： <span style={{ color: '#d73435' }}> {reportStatus.review_start_date} ~ {reportStatus.review_end_date} </span><br />
                  ３、工作汇报不必提及值班、值日、开会等常规工作<br />
                  ４、工作汇报中不要填写与工作室无关的工作，如组织班级活动等<br />
                  ５、另外有任何想说的话请填写在`意见建议`中<br />
                </Col>
              </Row>
              : <p style={titleStyle}>本次汇报开启时间： <span style={{ color: '#d73435' }}> {reportStatus.report_start_date} ~ {reportStatus.report_end_date} </span></p>
          )
        }
        {
          reportStatus.report_stat === 'done'
          && <p style={titleStyle}>本轮汇报你已经填写过了哦</p>
        }
        {
          reportStatus.report_stat === 'close'
          && <div style={fontStyle}>
            <p style={titleStyle}>本轮汇报尚未开始</p>
            １、汇报时间一般为每个月15号左右，届时会有通知<br />
            ２、如通知汇报开启，请及时提交工作汇报<br />
          </div>
        }
      </div >
    );
  }

}

export default connect(({ report }) => ({
  reportStatus: report.reportStatus
}))(WriteReport);


