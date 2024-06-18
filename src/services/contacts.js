import { ContactsCollection } from '../db/contact.js';

export const getAllContacts = async () => {
  return await ContactsCollection.find();
};

export const getContactById = async (contactId) => {
  return await ContactsCollection.findById(contactId);
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload) => {
  const result = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
    },
  );

  return result;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};
