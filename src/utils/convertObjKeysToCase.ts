import { camelCase, snakeCase } from 'lodash';

function processValue(val) {
  if (val === null || val === undefined) {
    return val;
  }

  if (typeof val === 'object') {
    return convertObjKeysToCamelCase(val);
  }

  if (Array.isArray(val)) {
    return val.map(processValue);
  }

  return val;
}

function convertObjKeysToCase(obj, caseFn) {
  if (Array.isArray(obj)) {
    return obj.map(processValue);
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => {
      return [caseFn(key), processValue(val)];
    })
  );
}

export function convertObjKeysToCamelCase(obj) {
  return convertObjKeysToCase(obj, camelCase);
}

export function convertObjKeysToSnakeCase(obj) {
  return convertObjKeysToCase(obj, snakeCase);
}
