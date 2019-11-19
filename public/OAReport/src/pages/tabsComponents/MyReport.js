import React from 'react';
import { connect } from 'dva';
import { Card, Divider, Rate, Spin } from 'antd';

class MyReport extends React.Component {
  state = {
    loading: true
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'report/getReportHistory'
    }).then(() => {
      this.setState({ loading: false })
    })
  }
  render() {
    return (
      <Spin spinning={this.state.loading}>
        {
          this.props.reportHistory.map(item => (
            <Card title={item.start_date + '~' + item.end_date} key={item.id} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex' }}>
                <div>工作陈述：</div>
                <div dangerouslySetInnerHTML={{ __html: item.content }} style={{width: '74%'}}></div>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div style={{ display: 'flex' }}>
                <div>意见建议：</div>
                <div dangerouslySetInnerHTML={{ __html: item.suggestion }} style={{width: '74%'}}></div>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div style={{ display: 'flex' }}>
                <div>部长回评：</div>
                <div dangerouslySetInnerHTML={{ __html: item.comment }}></div>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div>评分：<Rate disabled allowHalf defaultValue={item.rate} /></div>
            </Card>
          ))
        }
      </Spin>
    );
  }

}

export default connect(({ report }) => ({
  reportHistory: report.reportHistory
}))(MyReport);


