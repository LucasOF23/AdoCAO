import { postAnom, post, storeToken } from './general.api';

async function login(email: string, password: string) {
  const res = await postAnom('signin', { email, password });

  if (res.status === 200)
    storeToken(res.data.token);

  return res;
}



async function register(name: string, email: string, password: string) {
  const res = await postAnom('signup', { name, email, password });

  if (res.status === 201)
    storeToken(res.data.token);

  return res;
}

function logout() {
  storeToken(null);
}

async function changePassword(oldPassword: string, newPassword: string) {
  return post('change_password', { oldPassword, newPassword });
}

export default {
  login, register, changePassword, logout
}

