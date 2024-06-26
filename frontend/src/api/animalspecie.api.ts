import { getAnom, post, delete } from './general.api.ts';

export function getAll() {
  return getAnom('animal-species');
}

export function getByName(name) {
  return getAnom('animal-species/name/' + name);
}

export function create(name) {
  return post('animal-species', { name });
}

export function remove(id) {
  return delete(`animal-species/${id}`);
}

