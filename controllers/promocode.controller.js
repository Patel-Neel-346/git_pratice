// /**

// Promocode controller

// @author
// */
// import httpStatus from "http-status";

// import * as errors from "../utils/api-error.js";
// import * as response from "../middlewares/response-handler.js";
// import {
//   findAll,
//   findById,
//   create,
//   deleteById,
//   editById,
// } from "../services/promocode.service.js";
// import {findById} as findUserById from "../services/users.service"
// import {findOne} as findDomainByName from "../services/domain.service"
// /**

// @constant {function} responseHandler - function to form generic success response
// */
// const responseHandler = response.default;

// /**
//  * @constant {NotFoundError} NotFoundError - not found error object
//  */
// const { NotFoundError } = errors.default;

// /**

// Add a new promocode

// @param {*} req - express HTTP request object

// @param {*} res - express HTTP response object
// */
// const addPromocode = async (req, res) => {
//   const { code, domain_name, user_id } = data;

//   // Check if domain exists by name
//   const domain = await findDomainByName(domain_name);
//   if (!domain) {
//     return res
//       .status(httpStatus.BAD_REQUEST)
//       .send(
//         responseHandler(null, false, "Invalid domain_name. Domain not found.")
//       );
//   }

//   // Check if user exists
//   const user = await findUserById(user_id);
//   if (!user) {
//     return res
//       .status(httpStatus.BAD_REQUEST)
//       .send(responseHandler(null, false, "Invalid user_id. User not found."));
//   }

//   const promocode = await create(data);
//   res.status(httpStatus.CREATED).send(responseHandler(promocode));
// };

// /**

// Get all promocodes

// @param {*} req - express HTTP request object

// @param {*} res - express HTTP response object
// */
// const getPromocodes = async (req, res) => {
//   const promocodes = await findAll();
//   res.status(httpStatus.OK).send(responseHandler(promocodes));
// };

// /**

// Get promocode by ID

// @param {*} req - express HTTP request object

// @param {*} res - express HTTP response object
// */
// const getPromocode = async (req, res) => {
//   const promocode = await findById(req.params.promocodeId);
//   if (!promocode) {
//     throw new NotFoundError();
//   }

//   res.status(httpStatus.OK).send(responseHandler(promocode));
// };

// /**

// Delete promocode by ID

// @param {*} req - express HTTP request object

// @param {*} res - express HTTP response object
// */
// const deletePromocode = async (req, res) => {
//   const promocode = await findById(req.params.promocodeId);
//   if (!promocode) {
//     throw new NotFoundError();
//   }
//   await deleteById(req.params.promocodeId);

//   res.status(httpStatus.OK).send(responseHandler());
// };

// const editPromocode = async (req, res) => {
//   const promocode = await findById(req.params.promocodeId);
//   if (!promocode) {
//     throw new NotFoundError();
//   }

//   const updatedPromocode = await editById(req.params.promocodeId, req.body);
//   res.status(httpStatus.OK).send(responseHandler(updatedPromocode));
// };

// export {
//   addPromocode,
//   getPromocodes,
//   getPromocode,
//   deletePromocode,
//   editPromocode,
// };

/**
 * Promocode controller
 * @author
 */
import httpStatus from "http-status";

import * as errors from "../utils/api-error.js";
import * as response from "../middlewares/response-handler.js";

import {
  findAll,
  findById,
  create,
  deleteById,
  editById,
  findByCodeAndDomain,
  updatePromocodeStatusById,
} from "../services/promocode.service.js";

import { findById as findUserById } from "../services/users.service.js";
import { findDomainByName as findDomainByName } from "../services/domain.service.js";

/**
 * @constant {function} responseHandler - function to form generic success response
 */
const responseHandler = response.default;

/**
 * @constant {NotFoundError} NotFoundError - not found error object
 */
const { NotFoundError } = errors.default;

/**
 * Add a new promocode
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const addPromocode = async (req, res) => {
  const { code, domain_name, user_id } = req.body;

  // Check if domain exists by name
  const domain = await findDomainByName(domain_name);

  // console.log(domain, "domianm in promocode===");
  if (!domain) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send(
        responseHandler("Invalid domain_name. Domain not found or inactive.")
      );
  }

  // Check if user exists
  const user = await findUserById(user_id);

  // console.log(user, "user in promocode===");
  if (!user) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send(responseHandler("Invalid user_id. User not found."));
  }

  try {
    const existingPromocode = await findByCodeAndDomain(code, domain_name);
    if (existingPromocode) {
      return res
        .status(httpStatus.CONFLICT)
        .send(responseHandler("Promo code already exists for this domain."));
    }
    const promocode = await create(req.body);
    return res.status(httpStatus.CREATED).send(responseHandler(promocode));
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get all promocodes
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getPromocodes = async (req, res) => {
  const { search, active } = req.query;
  const promocodes = await findAll(search, active);
  console.log("Found promocodes:", promocodes);
  res.status(httpStatus.OK).send(responseHandler(promocodes));
};

/**
 * Get promocode by ID
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getPromocode = async (req, res) => {
  const promocode = await findById(req.params.promocodeId);
  if (!promocode) {
    throw new NotFoundError("Promocode not found or not active");
  }

  res.status(httpStatus.OK).send(responseHandler(promocode));
};

/**
 * Delete promocode by ID
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const deletePromocode = async (req, res) => {
  const promocode = await findById(req.params.promocodeId);
  if (!promocode) {
    throw new NotFoundError();
  }

  await deleteById(req.params.promocodeId);
  res.status(httpStatus.OK).send(responseHandler());
};

/**
 * Edit promocode by ID
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */

const editPromocode = async (req, res) => {
  const promocodeId = req.params.promocodeId;
  const { code, domain_name, user_id } = req.body;

  const promocode = await findById(promocodeId);
  if (!promocode) {
    throw new NotFoundError("Promocode not found or not active");
  }

  //  Check if domain exists and is active
  if (domain_name) {
    const domain = await findDomainByName(domain_name);
    if (!domain || domain.status === "inactive") {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(responseHandler("Assigned domain is either invalid or inactive"));
    }
  }

  //  Check if another promocode with the same domain_name + code exists
  if (code && domain_name) {
    const existing = await findByCodeAndDomain(code, domain_name);
    if (existing && existing.id !== promocodeId) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(responseHandler("Code already exists for this domain"));
    }
  }

  // Check if user exists
  if (user_id) {
    const user = await findUserById(user_id);

    // console.log(user, "user in promocode===");
    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(responseHandler("Invalid user_id. User not found."));
    }
  }

  const updatedPromocode = await editById(promocodeId, req.body);
  res.status(httpStatus.OK).send(responseHandler(updatedPromocode));
};

const updatePromocodeStatus = async (req, res) => {
  const { active } = req.body;
  const promocodeId = req.params.promocodeId;

  const updatedPromocode = await updatePromocodeStatusById(promocodeId, active);

  res.status(httpStatus.OK).send(responseHandler(updatedPromocode));
};

const reassignToAnotherWorker = async (req, res) => {
  const { promocodeId, user_id } = req.params;

  // Check if domain exists
  const promocode = await findById(promocodeId);
  if (!promocode) {
    throw new NotFoundError("Promocode not found or inactive");
  }
  // Check if design exists
  const user = await findUserById(user_id);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  // Assign the design
  promocode.user_id = user_id;
  await promocode.save();

  res
    .status(httpStatus.OK)
    .send(
      responseHandler(promocode, "Promocode assigned to a worker successfully")
    );
};

export {
  addPromocode,
  getPromocodes,
  getPromocode,
  deletePromocode,
  editPromocode,
  updatePromocodeStatus,
  reassignToAnotherWorker,
};
