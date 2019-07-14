interface IImg {
  url: string;
  alt: string | null;
}

interface IUrl {
  url: string;
}

//text helper
export const TextHelper = (object: Array<any> | undefined): string | null => {
  if (object && object[0] && object[0].text && object[0].text.length > 0)
    return object[0].text;
  return null;
};

//number helper
export const NumberHelper = (object: Number | undefined): number | null => {
  if (object && typeof object === "number") return object;
  return null;
};

//short information helper like date/uid/dropdown/color
export const SmallTextHelper = (
  object: String | null | undefined
): string | null => {
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
export const UrlHelper = (object: IUrl | undefined): string | null => {
  if (object && object.url && object.url.length > 0) return object.url;
  return null;
};

//img helper
export const ImgHelper = (object: IImg | undefined): IImg | null => {
  if (object && object.url && object.url.length > 0)
    return { url: object.url, alt: SmallTextHelper(object.alt) };
  return null;
};

//rich text helper
export const ArrayHelper = (
  object: Array<any> | undefined
): Array<any> | null => {
  if (object && Array.isArray(object) && object[0] && object.length > 0)
    return object;
  return null;
};

//short information helper like date/uid/dropdown/color
export const EmbedHelper = (object: any | undefined): any | null => {
  if (object) return object;
  return null;
};

//all helpers at the same time
export default {
  TextHelper,
  NumberHelper,
  SmallTextHelper,
  UrlHelper,
  ImgHelper,
  ArrayHelper,
  EmbedHelper
};
