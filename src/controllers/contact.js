// import createHttpError from 'http-errors';

// import {
//   createContact,
//   deleteContact,
//   getAllContacts,
//   getContactsById,
//   getContactsCount,
//   updateContact,
// } from '../services/contacts.js';

// export const getContactsController = async (req, res, next) => {
//   try {
//     const {
//       page = 1,
//       perPage = 10,
//       sortBy = 'name',
//       sortOrder = 'asc',
//     } = req.query;

//     const skip = (page - 1) * perPage;

//     const sortOrderValue = sortOrder === 'asc' ? 1 : -1;

//     const [contacts, totalItems] = await Promise.all([
//       getAllContacts(skip, parseInt(perPage), sortBy, sortOrderValue),
//       getContactsCount(),
//     ]);

//     const totalPages = Math.ceil(totalItems / perPage);

//     res.json({
//       status: 200,
//       message: 'Successfully found contacts!',
//       data: {
//         data: contacts,
//         page: parseInt(page),
//         perPage: parseInt(perPage),
//         totalItems,
//         totalPages,
//         hasPreviousPage: page > 1,
//         hasNextPage: page < totalPages,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getContactsByIdController = async (req, res, next) => {
//   const contactId = req.params.contactId;
//   const contact = await getContactsById(contactId);

//   if (!contact) {
//     next(createHttpError(404, 'Contact not found'));
//     return;
//   }

//   res.json({
//     status: 200,
//     message: `Successfully found contact with id ${contactId}!`,
//     data: contact,
//   });
// };

// export const createContactController = async (req, res, next) => {
//   const body = req.body;
//   const name = req.body.name;
//   const phoneNumber = req.body.phoneNumber;
//   const contact = await createContact(body);

//   if (!name) {
//     next(createHttpError(400, 'Name is required'));
//     return;
//   }

//   if (!phoneNumber) {
//     next(createHttpError(400, 'phoneNumber is required'));
//     return;
//   }

//   res.status(201).json({
//     status: 201,
//     message: 'Successfully created a contact!',
//     data: contact,
//   });
// };

// export const patchContactController = async (req, res, next) => {
//   const contactId = req.params.contactId;
//   const body = req.body;
//   const result = await updateContact(contactId, body);

//   if (!result) {
//     next(createHttpError(404, 'Contact not found'));
//     return;
//   }

//   res.json({
//     status: 200,
//     message: `Successfully patched contact with id ${contactId}!`,
//     data: result,
//   });
// };

// export const deleteContactController = async (req, res, next) => {
//   const { contactId } = req.params.contactId;

//   const contact = await deleteContact(contactId);

//   if (!contact) {
//     next(createHttpError(404, 'Contact not found'));
//     return;
//   }

//   res.status(204).send();
// };

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
    // Используем функцию для получения параметров пагинации
    const { skip, limit, sortBy, sortOrderValue, currentPage } =
      parsePaginationParams(req.query);

    // Получаем данные о контактах и их общее количество
    const [contacts, totalItems] = await Promise.all([
      getAllContacts(skip, limit, sortBy, sortOrderValue),
      getContactsCount(),
    ]);

    // Рассчитываем общее количество страниц
    const totalPages = Math.ceil(totalItems / limit);

    // Отправляем ответ с данными
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
    const contactId = req.params.contactId;
    const contact = await getContactsById(contactId);

    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.json({
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
    const body = req.body;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;

    if (!name) {
      next(createHttpError(400, 'Name is required'));
      return;
    }

    if (!phoneNumber) {
      next(createHttpError(400, 'Phone number is required'));
      return;
    }

    const contact = await createContact(body);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const body = req.body;

    const result = await updateContact(contactId, body);

    if (!result) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.json({
      status: 200,
      message: `Successfully patched contact with id ${contactId}!`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params.contactId;

    const contact = await deleteContact(contactId);

    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
