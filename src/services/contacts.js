import { ContactsCollection } from '../db/contact.js';

// export const getAllContacts = async (skip, limit, sortBy, sortOrder) => {
//   const contacts = await ContactsCollection.find()
//     .sort({ [sortBy]: sortOrder })
//     .skip(skip)
//     .limit(limit);

//   return contacts;
// };

export const getAllContacts = async (
  userId,
  skip,
  limit,
  sortBy,
  sortOrder,
) => {
  const contacts = await ContactsCollection.find({ userId })
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
  return contacts;
};

export const getContactsCount = async (userId) => {
  return await ContactsCollection.countDocuments({ userId });
};

// export const getContactsById = async (contactId) => {
//   const contact = await ContactsCollection.findById(contactId);

//   return contact;
// };

export const getContactsById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
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

// export const updateContact = async (contactId, payload) => {
//   try {
//     const result = await ContactsCollection.findByIdAndUpdate(
//       contactId,
//       payload,
//       { new: true },
//     );
//     return result;
//   } catch (error) {
//     throw new Error(`Database Error: ${error.message}`);
//   }
// };

export const updateContact = async (contactId, userId, payload) => {
  const result = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true },
  );
  return result;
};

// export const deleteContact = async (contactId) => {
//   const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });

//   return contact;
// };

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
