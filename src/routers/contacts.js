import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contact.js';
import {
  getContactsController,
  getContactsByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contact.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../contacts/index.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get(
  '/',
  checkRoles(ROLES.ADMIN),
  ctrlWrapper(getContactsController),
);

contactsRouter.get(
  '/:contactId',
  checkRoles(ROLES.ADMIN, ROLES.ADMIN2),
  isValidId('contactId'),
  ctrlWrapper(getContactsByIdController),
);

contactsRouter.post(
  '/',
  checkRoles(ROLES.ADMIN),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactId',
  checkRoles(ROLES.ADMIN, ROLES.ADMIN2),
  isValidId('contactId'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  checkRoles(ROLES.ADMIN),
  isValidId('contactId'),
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
