import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactsById,
  getContactsCount,
  updateContact,
} from '../services/contacts.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res, next) => {
  try {
    const { skip, limit, sortBy, sortOrderValue, currentPage } =
      parsePaginationParams(req.query);
    const userId = req.user._id;

    const [contacts, totalItems] = await Promise.all([
      getAllContacts(userId, skip, limit, sortBy, sortOrderValue),
      getContactsCount(userId),
    ]);

    const totalPages = Math.ceil(totalItems / limit);
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: contacts,
        page: currentPage,
        perPage: limit,
        totalItems,
        totalPages,
        hasPreviousPage: currentPage > 1,
        hasNextPage: currentPage < totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getContactsByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;

    const contact = await getContactsById(contactId, userId);
    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res) => {
  const { file, body } = req;

  if (file) {
    body.photo = await saveFileToCloudinary(file);
  }

  const contact = await createContact(body);

  res.status(201).json({
    message: 'Contact successfully created',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const { file, body } = req;

  if (file) {
    body.photo = await saveFileToCloudinary(file);
  }

  const contact = await updateContact(contactId, req.user._id, body);

  res.status(200).json({
    message: 'Contact successfully updated',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;

    const contact = await deleteContact(contactId, userId);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
