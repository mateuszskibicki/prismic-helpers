"use strict";
exports.__esModule = true;
//text helper
exports.TextHelper = function(object) {
  if (object && object[0] && object[0].text && object[0].text.length > 0)
    return object[0].text;
  return null;
};
//number helper
exports.NumberHelper = function(object) {
  if (object && typeof object === "number") return object;
  return null;
};
//short information helper like date/uid/dropdown/color
exports.SmallTextHelper = function(object) {
  if (
    object &&
    object.length > 0 &&
    object !== null &&
    typeof object === "string"
  )
    return object;
  return null;
};
//url helper
exports.UrlHelper = function(object) {
  if (object && object.url && object.url.length > 0) return object.url;
  return null;
};
//img helper
exports.ImgHelper = function(object) {
  if (object && object.url && object.url.length > 0)
    return { url: object.url, alt: exports.SmallTextHelper(object.alt) };
  return null;
};
//rich text helper
exports.ArrayHelper = function(object) {
  if (object && Array.isArray(object) && object[0] && object.length > 0)
    return object;
  return null;
};
//short information helper like date/uid/dropdown/color
exports.EmbedHelper = function(object) {
  if (object) return object;
  return null;
};
//all helpers at the same time
exports["default"] = {
  TextHelper: exports.TextHelper,
  NumberHelper: exports.NumberHelper,
  SmallTextHelper: exports.SmallTextHelper,
  UrlHelper: exports.UrlHelper,
  ImgHelper: exports.ImgHelper,
  ArrayHelper: exports.ArrayHelper,
  EmbedHelper: exports.EmbedHelper
};
