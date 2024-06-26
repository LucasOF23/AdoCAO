import { getAnom, post, put, delete } './general.api.ts';

export function getAll() {
  return getAnom('animals');
}

export function create(formData) {
  return post('animals', formData);
}

export function getById(id) {
  return getAnom(`animals/${id}`);
}

export function update(id, formData) {
  return put(`animals/${id}`, formData);
}

export function remove(id) {
  return delete(`animals/${id}`);
}

export function addTag(animalId, tagId) {
  return post(`animals/${animalId}/tag`, { tagId });
}

export function removeTag(animalId, tagId) {
  return delete(`animals/${animalId}/tag`, { tagId });
}

export function searchWithFilter(filters) {
  return post('animals/search', filters);
}

