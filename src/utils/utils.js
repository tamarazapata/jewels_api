import ERRORS from  "../helpers/helpers.js";

const findError = (code) => {
  return ERRORS.filter((err) => err.code == code);
}

export { findError }