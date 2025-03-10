// utilities "borrowed" from lodash sources, to
//  avoid the need for an underscorejs dependency

/** Used for built-in method references. */
const objectProto = Object.prototype;

/** Used to check objects for own properties. */
export const hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
const symToStringTag = Symbol ? Symbol.toStringTag : undefined;
const nullTag = "[object Null]";
const stringTag = "[object String]";
const undefinedTag = "[object Undefined]";

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
const nativeObjectToString = objectProto.toString;

/**
 * Returns true if the given value is undefined, false otherwise.
 * @param  {any}  value The value to check.
 * @return {boolean}     Whether the value is undefined.
 */
export const isUndefined = (value: any) => {
  return value === undefined;
};

/**
 * Checks if `value` is object-like. A value is object-like if it's not
 * `null` and has a `typeof` result of "object".
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
const isObjectLike = (value: any) => {
  return value != null && typeof value == "object";
};

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  const isOwn = hasOwnProperty.call(value, symToStringTag);
  const typedSymToStringTag = symToStringTag as typeof Symbol.toStringTag;
  const tag = value[typedSymToStringTag];
  let unmasked = false;

  try {
    value[typedSymToStringTag] = undefined;
    unmasked = true;
  } catch (e) {}

  const result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[typedSymToStringTag] = tag;
    } else {
      delete value[typedSymToStringTag];
    }
  }
  return result;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value)
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 */
export const isString = (value: any) => {
  return (
    typeof value == "string" ||
    (!Array.isArray(value) &&
      isObjectLike(value) &&
      baseGetTag(value) == stringTag)
  );
};
