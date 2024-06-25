import { ContactsCollection } from '../db/contact.js';

export const getAllContacts = async (skip, limit, sortBy, sortOrder) => {
  const contacts = await ContactsCollection.find()
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);

  return contacts;
};

export const getContactsCount = async () => {
  return await ContactsCollection.countDocuments();
};

export const getContactsById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);

  return contact;
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
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });

  return contact;
};
