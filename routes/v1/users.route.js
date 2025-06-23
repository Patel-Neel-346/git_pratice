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

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: johndoe
 *         user_role:
 *           type: string
 *           example: user
 *         progress:
 *           type: string
 *           example: 40.0%
 *         balance:
 *           type: number
 *           format: float
 *           example: 100.00
 *         logs:
 *           type: integer
 *           example: 5
 *         sales:
 *           type: number
 *           format: float
 *           example: 250.75
 *         hold:
 *           type: number
 *           format: float
 *           example: 20.00
 *         invited_by:
 *           type: integer
 *           nullable: true
 *           example: 2
 *         allowed_domains_count:
 *           type: integer
 *           example: 10
 *         status:
 *           type: string
 *           enum: [new, work, ban]
 *           example: new
 *         owner_panel:
 *           type: string
 *           example: werean
 *         hold_until:
 *           type: string
 *           format: date-time
 *         last_activity:
 *           type: string
 *           format: date-time
 *
 *     CreateUserRequest:
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *
 *     CreateUserSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           $ref: '#/components/schemas/User'
 *
 *     UserListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         body:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 */

/**
 * @openapi
 * /v1/user:
 *   post:
 *     tags:
 *       - User
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: Created user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserSuccess'
 *
 *   get:
 *     tags:
 *       - User
 *     description: Retrieve all users with optional search and status filters
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by username
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [new, work, ban]
 *         description: Filter by user status
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserListResponse'
 */

/**
 * @openapi
 * /v1/user/{userId}:
 *   get:
 *     tags:
 *       - User
 *     description: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserSuccess'
 *       404:
 *         description: User not found
 *
 *   put:
 *     tags:
 *       - User
 *     description: Update user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserSuccess'
 *       404:
 *         description: User not found
 *
 *   delete:
 *     tags:
 *       - User
 *     description: Delete user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: User not found
 */

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
