import { getAnom, post, remove } from './general.api.ts';

async function getAll() {
  const res = await getAnom('animal-tags');
  return res.data;
}

async function getByName(name) {
  const res = await getAnom('animal-tags/name/' + name);
  return res.data;
}

function create(name) {
  return post('animal-tags', { name });
}

function removeTag(id) {
  return remove(`animal-tags/${id}`);
}

export default {
  getAll, getByName, create, removeTag 
}

