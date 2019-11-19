import { post, get, download } from '../utils/request';

export function reportStatus(params) {
  return get(`/api/report/status`, params)
}

export function report(params) {
  return post(`/api/report`, params)
}

export function reportHistory(params) {
  return get(`/api/report/history`, params)
}

export function examReport(params) {
  return get(`/api/report`, params)
}

export function getRepotExcel(params) {
  return download(`/api/report/excel`, params)
}

export function getRepotTimes() {
  return get(`/api/report/reportTimes`)
}

export function review(params) {
  return post(`/api/report/review`, params)
}
