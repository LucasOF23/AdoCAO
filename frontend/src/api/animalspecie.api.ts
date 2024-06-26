import { getAnom, post, remove } from './general.api';

async function getAll() {
  const res = await getAnom('animal-species');
  return res.data;
}

async function getByName(name) {
  const res = await getAnom('animal-species/name/' + name);
  return res.data;
}

function create(name) {
  return post('animal-species', { name });
}

function removeSpecie(id) {
  return remove(`animal-species/${id}`);
}

export default {
  getAll, getByName, create, removeSpecie
}

