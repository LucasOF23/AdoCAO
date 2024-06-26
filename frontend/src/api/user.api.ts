import { getAnom, get, post, put } from './general.api.ts';

export function updateContactInfo(data, id?) {
  return put('users/' + (id ? `${id}/` : '') + 'contact-info', data);
}

export function getCurrent() {
  return get('users');
}

export function getById(id) {
  return getAnom(`users/${id}`);
}

export function update(data, id?) {
  return put('users' + (id ? `/${id}` : ''), data);
}

export function changeSuperAdmin(id, newStatus) {
  return post(`users/${id}/change-super-admin`, { newStatus });
}

export function getAnimals(id) {
  return getAnom(`users/${id}/animals`);
}

