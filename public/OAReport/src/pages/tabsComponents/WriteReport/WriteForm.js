import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import moment from 'moment'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';

const WriteForm = Form.create()(
  class extends React.Component {
    constructor(){
      super();
      this.state ={
        verificationStatus: false,
      }
    }
    checkState = (status) => {
      this.setState({
        verificationStatus:status,
      })
    }
    handleSubmit = (e) => {
      e.preventDefault();
      let parms = this.props.form.getFieldsValue()
      parms.content = parms.content.replace(/\n/g,"<br />")
      this.state.verificationStatus && this.props.dispatch({
        type: 'report/sendReport',
        payload: parms
      })
    }
    render() {
      const { form: { getFieldDecorator }, reportStatus } = this.props;
      const checkState = this.checkState;
      const FormCol = {
        labelCol: {
          xs: { span: 24 },
          lg: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          lg: { span: 16 },
        }
      }
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 4,
          },
        },
      };
      return (
        <Form>
          <FormItem label="工作时间" {...FormCol}>
            {getFieldDecorator('desc', {
              initialValue: [moment(reportStatus.work_start_date, dateFormat), moment(reportStatus.work_end_date, dateFormat)]
            })(
              <RangePicker format={dateFormat} disabled />
            )}
          </FormItem>
          <FormItem label="工作陈述" {...FormCol}>
            {getFieldDecorator('content', {
              rules: [
                { required: true, message: '这个月一点事都没干可不行哦' },
                { validator(rule, values, callback){
                    if(values.split(`\n`).every((item, index)=> (index+1).toString()===item[0] && !item.search(/^\d、.+；$/))){
                      checkState(true);
                      callback();
                    } else {
                      checkState(false);
                      callback(`请按照格式填写`);
                    }
                  } 
                },
              ],
            })(
              <TextArea
                placeholder={'本月工作内容，请简明分点陈述，格式如下 \n (数字加顿号开始，分号结束，数字必须连续) \n １、参与XXX项目，完成了首页和Logo设计； \n２、参与XXX项目，完成前端技术实现；'}
                autosize={{ minRows: 6, maxRows: 6 }}
              />
            )}
          </FormItem>
          <FormItem label="意见建议" {...FormCol}>
            {getFieldDecorator('suggestion')(
              <TextArea
                placeholder={"工作中发现的问题\n对工作室／部门的意见建议"}
                autosize={{ minRows: 3, maxRows: 3 }}
              />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button onClick={this.handleSubmit} type="primary">提交</Button>
          </FormItem>
        </Form>
      );
    }

  }
)

export default connect(({ report }) => ({
  reportStatus: report.reportStatus
}))(WriteForm);
