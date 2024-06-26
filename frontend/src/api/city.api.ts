import { getAnom } from './general.api.ts';

async function getByState(state) {
  return getAnom('cities', { params: { state } });
} 

async function getByName(name, state?) {
  const params = { name };
  if(state) params.state = state;
  
  return getAnom('cities', { params });
}

export default {
  getByName,
  getByState
}

