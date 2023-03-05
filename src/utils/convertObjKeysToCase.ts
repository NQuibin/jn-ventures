import { camelCase, snakeCase } from 'lodash';

type CaseFn = typeof camelCase | typeof snakeCase;

function processValue(val: any): any {
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

function convertObjKeysToCase(obj: object, caseFn: CaseFn) {
  if (Array.isArray(obj)) {
    return obj.map(processValue);
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => {
      return [caseFn(key), processValue(val)];
    })
  );
}

export function convertObjKeysToCamelCase(obj: object): object {
  return convertObjKeysToCase(obj, camelCase);
}

export function convertObjKeysToSnakeCase(obj: object): object {
  return convertObjKeysToCase(obj, snakeCase);
}
