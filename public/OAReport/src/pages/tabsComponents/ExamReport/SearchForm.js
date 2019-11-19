import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input, Select } from 'antd';
import styles from '@/assets/index.less';

const Option = Select.Option;

class SearchForm extends React.Component {
  updateSelect(key, value) {
    this.props.dispatch({
      type: 'report/getExamReportFromForm',
      payload: {
        key,
        value
      }
    })
  }
  render() {
    // console.log(this.props)
    const { user: { depart } } = this.props
    const beforeCol = {
      xl: 4, sm: 5, xs: 24
    }
    const endCol = {
      xl: { span: 6, offset: depart === '1' ? 8 : 16 },
      sm: { span: 6, offset: depart === '1' ? 5 : 15 },
      xs: { span: 24, offset: 0 }
    }
    const buttonCol = {
      xl: { span: 2, offset: 0 },
      sm: { span: 2, offset: 1 },
      xs: { span: 24, offset: 0 }
    }
    return (
      <Row style={{ marginTop: -8 }}>
        {
          depart === '1' && [
            <Col key={1} {...beforeCol} className={styles.searchCol}>
              <Row>
                <Col span={6} className={styles.searchColText}>
                  校区：
              </Col>
                <Col span={18}>
                  <Select
                    value={this.props.searchFrom.campus}
                    style={{ width: '100%' }}
                    onChange={value => {
                      this.updateSelect('campus', value)
                    }}
                  >
                    <Option value="">all</Option>
                    {this.props.campus.map(item => (
                      <Option value={item.value} key={item.key}>{item.value}</Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Col>,
            <Col key={2} {...beforeCol} className={styles.searchCol}>
              <Row>
                <Col span={6} className={styles.searchColText}>
                  部门：
              </Col>
                <Col span={18}>
                  <Select
                    value={this.props.searchFrom.depart}
                    style={{ width: '100%' }}
                    onChange={value => {
                      this.updateSelect('depart', value)
                    }}
                  >
                    <Option value="">all</Option>
                    {this.props.departs.map(item => (
                      <Option value={item.value} key={item.key}>{item.value}</Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Col>
          ]
        }
        <Col {...endCol} className={styles.searchCol}>
          <Row>
            <Col span={6} className={styles.searchColText}>
              筛选：
              </Col>
            <Col span={18}>
              <Input
                placeholder="可输入姓名、学号（回车筛选）"
                onPressEnter={e => {
                  this.updateSelect('contact', e.target.value)
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col {...buttonCol} className={styles.searchColButton}>
          <Button type="primary" onClick={() => {
            this.props.dispatch({ type: 'report/getReportExcel',payload: this.props.searchFrom })
          }}>导出excel</Button>
        </Col>
      </Row>
    );
  }

}

export default connect(({ report }) => ({
  searchFrom: report.searchFrom,
  campus: report.user.campus,
  departs: report.user.departs,
  user: report.user,
}))(SearchForm);


