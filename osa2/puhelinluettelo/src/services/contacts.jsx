import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllContacts = () => {
  return axios.get(baseUrl);
};

const createContact = (newContact) => {
  const req = axios.post(baseUrl, newContact);
  return req.then((res) => res.data);
};

const updateContact = (id, newContact) => {
  const req = axios.put(`${baseUrl}/${id}`, newContact);
  return req.then((res) => res.data);
};

const deleteContact = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
};

const contactService = {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
};

export default contactService;
