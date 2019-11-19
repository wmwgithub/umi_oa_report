import * as report from "../service/report";
import { message } from "antd";
export default {

  namespace: 'report',

  state: {
    reportStatus: {
      report_end_date: "",
      report_start_date: "",
      report_stat: "open",
      review_end_date: "",
      review_start_date: "",
      work_end_date: "",
      work_start_date: "",
    },
    reportHistory: [],
    reportDate: [],
    examReport: {
      list: [],
      total: 10,
    },
    searchFrom: {
      depart: '',
      campus: '',
      work_start_date: '',
      contact: ''
    },
    examLoading: false,
    user: null //用户信息
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {  // eslint-disable-line
  //   },
  // },

  effects: {
    *getReportStatus({ payload }, { call, put, select }) {
      let params = yield select(state => state.report.user)
      // console.log(params,'userparams')
      let res = yield call(report.reportStatus, { uid: params.uid });

      if (res.code === 2000) {
        yield put({ type: 'setStatusData', payload: res.data })
      }
      return res
    },
    *sendReport({ payload }, { call, put }) {
      let res = yield call(report.report, payload);
      if (res.code === 2000) {
        message.success('汇报成功')
        yield put({ type: 'setStatusData', payload: res.data })
      }
      return res
    },
    *getReportHistory({ payload }, { call, put, select }) {
      let res = yield call(report.reportHistory);
      if (res.code === 2000) {
        yield put({ type: 'setHistoryData', payload: res.data})
      }
      return res
    },
    /**部长审核汇报的接口 */
    *getExamReport({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      let params = yield select(state => state.report.searchFrom);
      console.log('getExamReport', params)
      let res = yield call(report.examReport, {
        ...params,
        pageNo: payload,
        pageSize: 10
      });
      if (res.code === 2000) {
        yield put({ type: 'setExamData', payload: res.data.pageInfo })
      }
      yield put({ type: 'hideLoading' })
      return res
    },
    *getExamReportFromForm({ payload }, { call, put, select }) {
      yield put({ type: 'setFormData', payload })
      yield put({ type: 'getExamReport' })
    },
    *getReportExcel({ payload }, { call, put, select }) {
      let params = yield select(state => state.report.examReport);
      yield call(report.getRepotExcel, { ...payload, pageSize: params.total });
    },
    *getExamReportDate({ payload }, { call, put, select }) {
      let res = yield call(report.getRepotTimes);
      if (res.code === 2000) {
        yield put({ type: 'setReportDate', payload: res.data })
      } else {
        message.error('获取汇报日期失败')
      }
      return res
    },
    *examReport({ payload }, { call, put }) {
      let res = yield call(report.review, payload);
      if (res.code === 2000) {
        message.success('审核成功')
      }
      return res
    },
    *setUser({ payload }, { call, put }) {
      // console.log('setUser',payload)
      yield put({
        type: 'setData',
        key: 'user',
        payload
      })
    }
  },

  reducers: {
    setStatusData(state, { payload }) {
      return { ...state, reportStatus: payload };
    },
    setHistoryData(state, { payload }) {
      return { ...state, reportHistory: payload };
    },
    setReportDate(state, { payload }) {
      return { ...state, reportDate: payload };
    },
    setExamData(state, { payload }) {
      return { ...state, examReport: payload };
    },
    setFormData(state, { payload }) {
      // console.log('setFormData', state)
      return {
        ...state,
        searchFrom: {
          ...state.searchFrom,
          [payload.key]: payload.value
        }
      }
    },
    showLoading(state) {
      return { ...state, examLoading: true };
    },
    hideLoading(state) {
      return { ...state, examLoading: false };
    },
    setData(state, { payload, key }) {
      return { ...state, [key]: payload }
    }
  },

};
