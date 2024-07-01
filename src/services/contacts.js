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
  try {
    const contact = await ContactsCollection.create(payload);
    return contact;
  } catch (error) {
    throw new Error(`Database Error: ${error.message}`);
  }
};

export const updateContact = async (contactId, payload) => {
  try {
    const result = await ContactsCollection.findByIdAndUpdate(
      contactId,
      payload,
      { new: true },
    );
    return result;
  } catch (error) {
    throw new Error(`Database Error: ${error.message}`);
  }
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });

  return contact;
};
