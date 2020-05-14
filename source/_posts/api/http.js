//https://koa.bootcss.com/#response
//https://github.com/axios/axios#handling-errors

import axios from "axios";
import router from "../router";
//这里引入了 vant 的toast组件，可以自己封装。
import { Toast } from "vant";

const url = "http://localhost:3000";

// 创建axios实例，这里的配置会覆盖axios库中默认的配置
var instance = axios.create({
  timeout: 1000 * 10,
  baseURL: url,
});
// 设置post请求头(这个有必有吗？默认的content-type就是这个)

instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// 登录流程控制中，根据本地是否存在token判断用户的登录情况
//token 中自带有过期时间，有服务端进行校验
//参考 ： https://jwt.io/introduction/
//参考规范：https://tools.ietf.org/html/rfc7519#section-4.1
let token = localStorage.getItem("token");
instance.interceptors.request.use(
  (config) => {
    token && (config.headers.Authorization = `Bearer ${token}`);
    return config;
  },
  //到底能干啥？？
  (error) => Promise.reject(error)
);
/**
 * axios中有个配置：`validateStatus`根据响应状态码决定resolve 还是 reject 返回的 response
 * 默认是 2xx  范围内的都resolve，这个用在响应拦截器中，它接受两个回调，如果状态码在 2xx 范围内
 * 第一个回调触发，否则的话，第二个回调函数触发。
 * 如果服务端使用koa的话 可以通过 ctx.status = 200 ctx.message = 'ok'设置响应状态码
 */
// 响应拦截器
instance.interceptors.response.use(
  (res) => Promise.resolve(res.data),
  (error) => {
    //这里的error要参考源码createError()函数,error对象有以下几个属性，还有一个toJSON()方法
    //{config,request,response,config,message,toJSON()}
    //参考： https://github.com/axios/axios/blob/master/dist/axios.js
    if (error.response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        //store.commit("changeNetwork", false);
      } else {
        return Promise.reject(error);
      }
    }
  }
);

/**
 * 统一封装get请求
 * @param url
 * @param params are the URL parameters to be sent with the request,
 *  Must be a plain object or a URLSearchParams object
 */

export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: "get",
      url,
      params,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/* 统一封装post请求 data如果是个js对象,它会在内部序列化成json对象 */
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: "post",
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = (msg) => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true,
  });
};

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: "/login",
    query: {
      redirect: router.currentRoute.fullPath,
    },
  });
};

const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    case 401: //401 "unauthorized" 未登录状态，跳转登录页
      toLogin();
      break;

    case 403: // 403 token过期,清除token并跳转登录页
      tip("登录过期，请重新登录");
      localStorage.removeItem("token");
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;

    case 404: // 404请求不存在
      tip("请求的资源不存在");
      break;
    default:
      console.log(other);
  }
};

