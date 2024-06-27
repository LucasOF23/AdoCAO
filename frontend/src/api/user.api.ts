import { getAnom, get, post, put } from './general.api.ts';

function convertToProfileInfo(d) {
  const c = d.ContactInfo;
  return {
    id: d.id,
    user_type: 'user',
    name: d.name,
    email: d.email,
    contato: {
      email: c.email,
      insta: c.instagramProfile,
      face: c.facebookProfile,
      telefone: c.telephoneNumber,
      outro: c.other
    },
  }
}


function updateContactInfo(data, id?) {
  return put('users/' + (id ? `${id}/` : '') + 'contact-info', data);
}

async function getCurrent() {
  const res = await get('users');
  return convertToProfileInfo(res.data);
}

async function getById(id) {
  const res = await getAnom(`users/${id}`);
  return convertToProfileInfo(res.data);
}

function update(data, id?) {
  return put('users' + (id ? `/${id}` : ''), data);
}

function changeSuperAdmin(id, newStatus) {
  return post(`users/${id}/change-super-admin`, { newStatus });
}

function getAnimals(id) {
  return getAnom(`users/${id}/animals`);
}

export default {
  updateContactInfo, getCurrent, getById, update, changeSuperAdmin, getAnimals
}

