import axios from './http'
import QS from 'qs'
import base from './base'

/**
 * post方法，对应post请求
 * @desc注册请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function userRegister(data) {
    return axios({
        url: `${base.url}/register`,
        method: 'post',
        data: QS.stringify(data)
    })
}
/**
 * get方法，对应get请求
 * @desc登录请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function userLogin(data) {
    return axios({
        url: `${base.url}/login`,
        method: 'post',
        data: QS.stringify(data)
    })
}

export function uploadZfbOrder(data) {
    return axios({
        url: `${base.url}/uploadzfbOrder`,
        method: 'post',
        data: JSON.stringify(data)
    })
}

export function AddReportData(data) {
    return axios({
        url: `${base.url}/addReportData`,
        method: 'post',
        data: JSON.stringify(data)
    })
}

export function getOrderList(data) {
    return axios({
        url: `${base.url}/getOrderList`,
        method: 'post',
        data: JSON.stringify(data)
    })
}

export function getReportData(data) {
    return axios({
        url:`${base.url}/getReportData`,
        method: `post`,
        data: JSON.stringify(data)
    })
}
export function reportData(data) {
    return axios({
        url:`${base.url}/reportOrder`,
        method: `post`,
        data: JSON.stringify(data)
    })
}
export function getTechData(data) {
    return axios({
        url:`${base.url}/getTechData`,
        method: `post`,
        data: JSON.stringify(data)
    })
}