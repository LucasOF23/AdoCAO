import { getAnom, post, delete } from './general.api.ts';

export function getAll() {
  return getAnom('animal-tags');
}

export function getByName(name) {
  return getAnom('animal-tags/name/' + name);
}

export function create(name) {
  return post('animal-tags', { name });
}

export function remove(id) {
  return delete(`animal-tags/${id}`);
}

