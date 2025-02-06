import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// storing in local
let localContacts: any[] = [];

export const getContacts = async () => {
  if (localContacts.length === 0) {
    const { data } = await axios.get(API_URL);
    localContacts = data;
  }
  return localContacts;
};

export const getContactById = async (id: string) => {
  const contacts = await getContacts();
  return contacts.find((contact) => contact.id === +id);
};

export const createContact = async (contact: any) => {
  const newContact = { id: Date.now(), ...contact.value };
  localContacts.push(newContact);
  return newContact;
};

export const editContact = async ({ id, ...updatedData }: any) => {
  localContacts = localContacts.map((contact) => {
    return contact.id === +id ? { ...contact, ...updatedData.value } : contact;
  });
  return localContacts.find((contact) => contact.id === +id);
};

export const deleteContact = async (id: string) => {
  localContacts = localContacts.filter((contact) => contact.id !== +id);
  return id;
};
