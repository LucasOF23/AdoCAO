import axios from 'axios';

const apiUrl = 'http://localhost:8080/';
const baseImageUrl = 'http://localhost:9000/fotos-adocao/';

export {
  apiUrl as url,
  baseImageUrl
};

export function storeToken(token) {
  window.sessionStorage.setItem('token-adocao', JSON.stringify(token));
}

export function getToken() {
  if(!window) return null;
  const data = window.sessionStorage.getItem('token-adocao');
  return data ? JSON.parse(data) : null;
}

export function getAnom(url, config?) {
  return axios.get(apiUrl + url, config);
}

export function postAnom(url, data?, config?) {
  return axios.post(apiUrl + url, data, config);
}

export function putAnom(url, data?, config?) {
  return axios.put(apiUrl + url, data, config);
}

function addTokenConfig(config?) {
  const token = getToken().token;
  
  config = config || {};
  config.headers = config.headers || {};
  config.headers.Authorization = `Bearer ${token}`;

  return config
}

export function get(url, config?) {
  return axios.get(apiUrl + url, addTokenConfig(config));
}

export function post(url, data?, config?) {
  return axios.post(apiUrl + url, data, addTokenConfig(config));
}

export function put(url, data?, config?) {
  return axios.put(apiUrl + url, data, addTokenConfig(config));
}

export function remove(url, config?) {
  return axios.delete(apiUrl + url, addTokenConfig(config));
}

export function postForm(url, data?, config?) {
  return axios.postForm(apiUrl + url, data, addTokenConfig(config));
}

export function putForm(url, data?, config?) {
  return axios.putForm(apiUrl + url, data, addTokenConfig(config));
}


