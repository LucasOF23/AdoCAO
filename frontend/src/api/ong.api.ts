import { getAnom, post, put, remove } from './general.api.ts';

export function getAll() {
  return getAnom('ongs');
}

export function create(name, address, cnpj) {
  return post('ongs', { name, address, cnpj });
}

export function getById(id) {
  return getAnom(`ongs/${id}`);
}

export function edit(id, opt) {
  return put(`ongs/${id}`, opt);
}

export function getWorkers(id) {
  return getAnom(`ongs/${id}/users`);
}

export function assignWorker(ongId, email, isManager) {
  return post(`ongs/${id}/users`, { email, isManager });
}

export function unassignWorker(ongId, email) {
  return remove(`ongs/${id}/users`, { email });
}

export function getAnimals(id) {
  return getAnom(`ongs/${id}/animals`);
}

export function updateContactInfo(id, data) {
  return put(`/ongs/${id}/contact-info`, data);
}

