import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import {
  addUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
} from '../../controllers/users.controller.js';
import {
  addUserSchema,
  editUserSchema,
  userIdParamSchema,
  userNameSearchValidation,
} from '../../validations/users-schema.js';

const router = express.Router();
const { validate } = new Validator();


router
  .route('/')
  .post(validate({ body: addUserSchema }), addUser)
  .get(validate({ query: userNameSearchValidation }), getUsers);

router
  .route('/:userId')
  .get(validate({ params: userIdParamSchema }), getUser)
  .put(validate({ params: userIdParamSchema, body: editUserSchema }), editUser)
  .delete(validate({ params: userIdParamSchema }), deleteUser);

export default router;
