import createHttpError from 'http-errors';
import { ROLES } from '../contacts/index.js';
import { ContactsCollection } from '../db/contact.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(createHttpError(401));
      return;
    }

    const { role } = user;
    if (roles.includes(ROLES.ADMIN) && role === ROLES.ADMIN) {
      next();
      return;
    }

    if (roles.includes(ROLES.ADMIN2) && role === ROLES.ADMIN2) {
      const { contactId } = req.params;
      if (!contactId) {
        next(createHttpError(403));
        return;
      }

      const user = await ContactsCollection.findOne({
        _id: contactId,
        parentId: user._id,
      });

      if (user) {
        next();
        return;
      }
    }

    next(createHttpError(403));
  };
