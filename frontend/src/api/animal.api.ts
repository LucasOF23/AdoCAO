import { baseImageUrl, getAnom, post, postAnom, put, remove } from './general.api';
import { DogInfo } from '@/types/dog';
import { calculateAge } from '@/lib/utils';

function convertToInfo(d): DogInfo {
  let owner = {};
  if(d.User) 
    owner = { kind: 'user', name: d.User.name, id: d.User.id }
  else
    owner = { kind: 'ONG', name: d.ONG.name, id: d.ONG.id }

  return {
    id: d.id,
    name: d.name,
    description: d.description,
    imageUrl: baseImageUrl + d.imagePath,
    owner: owner,
    location: d.City,
    gender: (d.animalGender === 'M') ? 'male' : 'female',
    ageInYears: calculateAge(d.birthdate, new Date()),
    birthdate: d.birthdate,
    weightInKg: d.weightInKg,
    heightInCm: d.heightInCm,
    species: d.AnimalSpecie,
    isNeutered: d.isNeutered,
    isDewormed: d.isDewormed,
    tags: d.AnimalTags
  }
}

async function getAll(): DogInfo[] {
  const res = await getAnom('animals');
  return res.data.map(convertToInfo);
}

async function getFromOng(id) {
  const res = await getAnom(`ongs/${id}/animals`);
  return res.data.map(convertToInfo);
}

async function getFromUser(id) {
  const res = await getAnom(`users/${id}/animals`);
  console.log('Got', res.data);
  return res.data.map(convertToInfo);
}

function create(formData) {
  return post('animals', formData);
}

function getById(id) {
  return getAnom(`animals/${id}`);
}

function update(id, formData) {
  return put(`animals/${id}`, formData);
}

function removeAnimal(id) {
  return remove(`animals/${id}`);
}

function addTag(animalId, tagId) {
  return post(`animals/${animalId}/tag`, { tagId });
}

function removeTag(animalId, tagId) {
  return remove(`animals/${animalId}/tag`, { tagId });
}

async function searchWithFilter(filters): DogInfo[] {
  const res = await postAnom('animals/search', filters);
  return res.data.map(convertToInfo);
}

export default {
  getAll, create, getById, update, removeAnimal, addTag, removeTag, searchWithFilter, getFromOng, getFromUser
}

