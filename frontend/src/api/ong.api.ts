import { getAnom, get, post, put, remove } from './general.api.ts';

function convertToProfileInfo(d) {
  const c = d.ContactInfo;
  return {
    id: d.id,
    user_type: 'ONG',
    name: d.name,
    location: d.City,
    address: d.address,
    cnpj: d.cnpj,
    contato: {
      email: c.email,
      insta: c.instagramProfile,
      face: c.facebookProfile,
      telefone: c.telephoneNumber,
      outro: c.other
    },
    isManager: d.isManager
  }
}

async function getAll() {
  const res = await getAnom('ongs');
  return res.data.map(d => convertToProfileInfo(d));
}

async function getUserActualOngs() {
  const res = await get('users/ongs');
  return res.data.map(d => convertToProfileInfo(d));
}

function create(name, address, cnpj) {
  return post('ongs', { name, address, cnpj });
}

async function getById(id) {
  const res = await getAnom(`ongs/${id}`);
  return convertToProfileInfo(res.data);
}

function edit(id, opt) {
  return put(`ongs/${id}`, opt);
}

function getWorkers(id) {
  return getAnom(`ongs/${id}/users`);
}

async function assignWorker(ongId, email, isManager) {
  const res = await post(`ongs/${ongId}/users`, { email, isManager });
  return res.status === 200;
}

async function unassignWorker(ongId, email) {
  const res = await remove(`ongs/${ongId}/users`, { data: { email } });
  return res.status;
}


function updateContactInfo(id, data) {
  return put(`ongs/${id}/contact-info`, data);
}

export default { getAll, getUserActualOngs, create, getById, edit, getWorkers, assignWorker, unassignWorker, updateContactInfo }

