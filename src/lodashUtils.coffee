# utilities "borrowed" from lodash sources, to
#  avoid the need for an underscorejs dependency

# Used for built-in method references.
objectProto = Object.prototype

# Used to check objects for own properties.
hasOwnProperty = objectProto.hasOwnProperty

# Built-in value references.
symToStringTag = if Symbol then Symbol.toStringTag else undefined
nullTag = "[object Null]"
stringTag = "[object String]"
symbolTag = "[object Symbol]"
undefinedTag = "[object Undefined]"

# Used to resolve the
# [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
# of values.
nativeObjectToString = objectProto.toString

# Returns true if the given value is undefined, false otherwise.
isUndefined = (value) ->
  value is undefined

# Checks if `value` is object-like. A value is object-like if it's not
# `null` and has a `typeof` result of "object".
#
# @param {*} value The value to check.
# @returns {boolean} Returns `true` if `value` is object-like, else `false`.
isObjectLike = (value) ->
  value != null and typeof value is "object"

# A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
#
# @private
# @param {*} value The value to query.
# @returns {string} Returns the raw `toStringTag`.
getRawTag = (value) ->
  isOwn = hasOwnProperty.call(value, symToStringTag)
  typedSymToStringTag = symToStringTag
  tag = value[typedSymToStringTag]
  unmasked = false

  try
    value[typedSymToStringTag] = undefined
    unmasked = true
  catch e

  result = nativeObjectToString.call(value)
  if unmasked
    if isOwn
      value[typedSymToStringTag] = tag
    else
      delete value[typedSymToStringTag]
  result

# Converts `value` to a string using `Object.prototype.toString`.
#
# @private
# @param {*} value The value to convert.
# @returns {string} Returns the converted string.
objectToString = (value) ->
  nativeObjectToString.call(value)

# The base implementation of `getTag` without fallbacks for buggy environments.
#
# @private
# @param {*} value The value to query.
# @returns {string} Returns the `toStringTag`.
baseGetTag = (value) ->
  if value == null
    if value is undefined then undefinedTag else nullTag
  else
    if symToStringTag and symToStringTag in Object(value)
      getRawTag(value)
    else
      objectToString(value)

# Checks if `value` is classified as a `String` primitive or object.
#
# @param {*} value The value to check.
# @returns {boolean} Returns `true` if `value` is a string, else `false`.
isString = (value) ->
  typeof value is "string" or
    (not Array.isArray(value) and isObjectLike(value) and baseGetTag(value) is stringTag)

export {
  isString,
  isUndefined
};