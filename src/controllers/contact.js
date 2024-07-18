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

// export const getContactsByIdController = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const userId = req.user._id;

//     const contact = await getContactsById(contactId, userId);
//     if (!contact) {
//       return next(createHttpError(404, 'Contact not found'));
//     }

//     res.status(200).json({
//       status: 200,
//       message: `Successfully found contact with id ${contactId}!`,
//       data: contact,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

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

// export const createContactController = async (req, res, next) => {
//   try {
//     const { file, body } = req;
//     const userId = req.user._id;

//     if (file) {
//       console.log('File received:', file);
//       body.photo = await saveFileToCloudinary(file);
//     }

//     body.userId = userId;

//     const contact = await createContact(body);
//     console.log('Created contact:', contact);

//     res.status(201).json({
//       message: 'Contact successfully created',
//       data: contact,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
export const createContactController = async (req, res, next) => {
  try {
    const { file, body } = req;
    const userId = req.user._id;

    if (file) {
      console.log('File received:', file);
      body.photo = await saveFileToCloudinary(file);
    }

    body.userId = userId;

    const contact = await createContact(body);
    console.log('Created contact:', contact);

    res.status(201).json({
      message: 'Contact successfully created',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// export const patchContactController = async (req, res) => {
//   const { contactId } = req.params;
//   const { file, body } = req;

//   if (file) {
//     body.photo = await saveFileToCloudinary(file);
//   }

//   const contact = await updateContact(contactId, req.user._id, body);

//   res.status(200).json({
//     message: 'Contact successfully updated',
//     data: contact,
//   });
// };

// export const patchContactController = async (req, res, next) => {
//   const fileUrl = await saveFileToCloudinary(req.file);

//   const contactId = req.params.contactId;
//   const body = req.body;
//   const result = await updateContact(contactId, body, req.user._id, fileUrl);

//   if (!result) {
//     next(createHttpError(404, 'Contact not found'));
//     return;
//   }

//   res.status(200).json({
//     status: 200,
//     message: 'Successfully patched a contact!',
//     data: result,
//   });
// };
export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { file, payload } = req;
    const userId = req.user._id;

    if (file) {
      payload.photo = await saveFileToCloudinary(file);
    }

    const result = await updateContact(contactId, userId, payload);

    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
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
