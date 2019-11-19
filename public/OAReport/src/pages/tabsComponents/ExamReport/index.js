import React from 'react';
import { connect } from 'dva';
import { Card, Divider, Rate, Spin, Input, InputNumber, Pagination } from 'antd';
import SearchForm from "./SearchForm";
import SearchHistory from "./SearchHistory";

class ExamReport extends React.Component {
  state = {
    comment: ''
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'report/getExamReport'
    })
  }
  pageChange = (page) => {
    this.props.dispatch({
      type: 'report/getExamReport',
      payload: page,
    })
  }
  commentChang(params) {
    this.setState({
      comment: params.comment
    })
  }
  examHandler(params) {
    this.props.dispatch({
      type: 'report/examReport',
      payload: { ...params, comment: this.state.comment ? this.state.comment : params.comment }
    })
  }
  render() {
    // console.log(this.props,'this.propps....')
    const { reportStatus: { review_end_date }, user: { role } } = this.props;
    const toDay = new Date();
    const end_date = new Date(review_end_date);
    let reveiwStatus = end_date.valueOf() < toDay.valueOf() || role > 2;
    return (
      <div>
        {this.props.user.role > 2 ? <SearchHistory /> : <SearchForm />}
        <Spin spinning={this.props.examLoading}>
          {
            this.props.examReport.list.map(item => (
              <Card
                title={item.username}
                extra={item.start_date + '~' + item.end_date} key={item.id}
                style={{ marginBottom: 10 }}
              >
                <div style={{ display: 'flex' }}>
                  <div>工作陈述：</div>
                  <div dangerouslySetInnerHTML={{ __html: item.content }} style={{ width: '74%' }}></div>
                </div>
                <Divider style={{ margin: '8px 0' }} />
                <div style={{ display: 'flex' }}>
                  <div>意见建议：</div>
                  <div dangerouslySetInnerHTML={{ __html: item.suggestion }} style={{ width: '74%' }}></div>
                </div>
                <Divider style={{ margin: '8px 0' }} />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: document.body.clientWidth > 992 ? 75 : 100, lineHeight: '32px' }}>部长回评：</div>
                  <Input defaultValue={item.comment} onChange={e => {
                    this.commentChang({
                      // id: item.id,
                      comment: e.target.value
                    })
                  }} disabled={(item.status === 'notThisDepart' || reveiwStatus)} placeholder="部长评价（回车确定）" />
                </div>
                <Divider style={{ margin: '8px 0' }} />
                <div>部长打分：<Rate onChange={value => {
                  this.examHandler({
                    id: item.id,
                    rate: value
                  })
                }} disabled={(item.status === 'notThisDepart' || reveiwStatus)} allowHalf defaultValue={item.rate} /></div>
                <Divider style={{ margin: '8px 0' }} />
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 100, lineHeight: '32px' }}>部长薪资意见：</div>
                  <InputNumber onChange={value => {
                    this.examHandler({
                      id: item.id,
                      comment: item.comment,
                      salary_sug: value
                    })
                  }} max={400} disabled={(item.status === 'notThisDepart' || reveiwStatus)} defaultValue={item.salary.review} />
                </div>
                {
                  this.props.user.role > 2 && <div>
                    <Divider style={{ margin: '8px 0' }} />
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: 100, lineHeight: '32px' }}>Ta的最终薪资：</div>
                      <InputNumber onChange={value => {
                        this.examHandler({
                          id: item.id,
                          comment: item.comment,
                          salary: value
                        })
                      }} max={400} defaultValue={item.salary.fina} />
                    </div>
                  </div>
                }
              </Card>
            ))
          }
          <Pagination
            total={this.props.examReport.total}
            onChange={this.pageChange}
            simple={true}
          />
        </Spin>
      </div>

    );
  }

}

export default connect(({ report }) => ({
  reportStatus: report.reportStatus,
  examReport: report.examReport,
  examLoading: report.examLoading,
  user: report.user
}))(ExamReport);


