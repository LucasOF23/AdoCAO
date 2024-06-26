import { getAnom } from './general.api';

async function getAll() {
  const res = await getAnom('cities');
  return res.data;
}

async function getByState(state) {
  const res = await getAnom('cities', { params: { state } });
  return res.data;
} 

async function getByName(name, state?) {
  const params = { name };
  if(state) params.state = state;
  
  const res = await getAnom('cities', { params });
  return res.data;
}

export default {
  getAll,
  getByName,
  getByState
}

