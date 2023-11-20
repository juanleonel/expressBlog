function toBoolean(value) {
  if (typeof value === 'boolean') {
    return Boolean(value)
  }

  if (typeof value === 'string' && (value.toLowerCase() === 'true' || value.toLowerCase() === 'yes' || value === '1')) {
    return true
  }

  if (typeof value === 'number' && value > 0) {
    return true
  }

  return false
}

function isIdValid(value, type) {
  if (type === 'number' && typeof parseNumber(value) === 'number') {
    return Number(value)
  }

  throw Error('Id invalido')
}

function parseNumber(value) {
  const numberValue = parseInt(value)

  return isNaN(numberValue) ? undefined : numberValue
}

function isEmpty(value) {
  if (value === undefined || value === null || (typeof value === 'string' || value?.trim() === '')) {
    return true
  }

  return false
}

function isArrayEmpty(arrayValue) {
  if (isEmpty(arrayValue) || Array.isArray(arrayValue) || arrayValue.length === 0) {
    return true
  }

  return false
}

module.exports = {
  toBoolean,
  isIdValid,
  isEmpty,
  isArrayEmpty
}
