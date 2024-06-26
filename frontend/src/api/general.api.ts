import axios from 'axios';

const apiUrl = 'http://localhost:8080/';
const baseImageUrl = 'http://192.168.0.14:9000/fotos-adocao/';

export {
  apiUrl as url,
  baseImageUrl
};

export function storeToken(token) {
  window.sessionStorage.setItem('token-adocao', token);
}

export function getToken() {
  return window.sessionStorage.getItem('token-adocao');
}

export function getAnom(url, config?) {
  return axios.get(apiUrl + url, config);
}

export function postAnom(url, data?, config?) {
  return axios.post(apiUrl + url, data, config);
}

