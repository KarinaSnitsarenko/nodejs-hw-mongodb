import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getContactsController));

contactRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactsByIdController),
);

contactRouter.post('/contacts', ctrlWrapper(createContactController));

contactRouter.patch(
  '/contacts/:contactId',
  ctrlWrapper(patchContactController),
);

contactRouter.delete(
  '/contacts/:studentId',
  ctrlWrapper(deleteContactController),
);

export default contactRouter;
