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

export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, ...rest } = req.body;
    const userId = req.user._id;

    if (!name || !phoneNumber) {
      return next(createHttpError(400, 'Name and Phone number are required'));
    }

    const contact = await createContact({ name, phoneNumber, ...rest, userId });

    res.status(201).json({
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;
    const body = req.body;

    const result = await updateContact(contactId, userId, body);

    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.json({
      status: 200,
      message: `Successfully updated contact with id ${contactId}!`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
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
