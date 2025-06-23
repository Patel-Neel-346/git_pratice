/**
 * PromoVisit controller
 */
import httpStatus from 'http-status';
import * as response from '../middlewares/response-handler.js';
import {
  create,
  findAllByPromoCodeId,
} from '../services/promovisit.service.js';
import * as errors from '../utils/api-error.js';
import { findById as findPromocodeById } from '../services/promocode.service.js';
import { findDomainByName as findDomainByName } from '../services/domain.service.js';

const responseHandler = response.default;

/**
 * @constant {NotFoundError} NotFoundError - not found error object
 */
const { NotFoundError } = errors.default;

/**
 * Add a new promo visit
 *
 * @param {*} req - Express HTTP request
 * @param {*} res - Express HTTP response
 */

const addPromoVisit = async (req, res) => {
  try {
    const data = req.body;
    console.lop(data);
    const { promo_code_id, domain_name } = data;

    const promocode = await findPromocodeById(promo_code_id);
    if (!promocode) {
      throw new NotFoundError('Promocode not found or inactive');
    }

    const domain = await findDomainByName(domain_name);
    if (!domain) {
      throw new NotFoundError('Domain not found or inactive');
    }

    const promoVisit = await create(data);
    res.status(httpStatus.CREATED).send(responseHandler(promoVisit));
  } catch (error) {
    console.error('Error adding promo visit:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      msg: error.message || 'Something went wrong',
    });
  }
};

/**
 * Get all promo visits by promo code ID
 *
 * @param {*} req - Express HTTP request
 * @param {*} res - Express HTTP response
 */
const getPromoVisitsByPromoCode = async (req, res) => {
  try {
    const { promocodeId } = req.params;

    const promoVisits = await findAllByPromoCodeId(promocodeId);
    res.status(httpStatus.OK).send(responseHandler(promoVisits));
  } catch (error) {
    console.error('Error fetching promo visits:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      msg: error.message || 'Something went wrong',
    });
  }
};

export { addPromoVisit, getPromoVisitsByPromoCode };
