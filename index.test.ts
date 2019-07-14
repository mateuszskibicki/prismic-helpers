const {
  TextHelper,
  NumberHelper,
  SmallTextHelper,
  UrlHelper,
  ImgHelper,
  ArrayHelper
} = require("./index");

const PrismicHelpers = require("./index");

describe("PrismicHelpers", () => {
  describe("TextHelper", () => {
    test("should be a function", () => {
      expect(TextHelper).toBeDefined();
      expect(typeof TextHelper === "function").toBeTruthy();
    });

    test("should return null when there is wrong type of object", () => {
      expect(TextHelper()).toBeNull();
      expect(TextHelper("string")).toBeNull();
      expect(TextHelper(123)).toBeNull();
      expect(TextHelper([])).toBeNull();
      expect(TextHelper({})).toBeNull();
      expect(TextHelper({ dummy: "string" })).toBeNull();
    });

    test("should return null when there is correct type of object but length === 0", () => {
      expect(TextHelper([{ text: "" }])).toBeNull();
    });

    test("should return text when there is correct type of object and length > 0", () => {
      expect(TextHelper([{ text: "string" }])).toBe("string");
    });
  });

  describe("NumberHelper", () => {
    test("should be a function", () => {
      expect(NumberHelper).toBeDefined();
      expect(typeof NumberHelper === "function").toBeTruthy();
    });

    test("should return null when there is wrong type of object", () => {
      expect(NumberHelper()).toBeNull();
      expect(NumberHelper("string")).toBeNull();
      expect(NumberHelper("123")).toBeNull();
      expect(NumberHelper([])).toBeNull();
      expect(NumberHelper({})).toBeNull();
      expect(NumberHelper(null)).toBeNull();
    });

    test("should return number when argument is a number", () => {
      expect(NumberHelper(123)).toBe(123);
    });
  });

  describe("SmallTextHelper", () => {
    test("should be a function", () => {
      expect(SmallTextHelper).toBeDefined();
      expect(typeof SmallTextHelper === "function").toBeTruthy();
    });

    test("should return null when there is wrong type of object (only not nested strings should work)", () => {
      expect(SmallTextHelper()).toBeNull();
      expect(SmallTextHelper(123)).toBeNull();
      expect(SmallTextHelper([])).toBeNull();
      expect(SmallTextHelper({})).toBeNull();
      expect(SmallTextHelper(null)).toBeNull();
      expect(SmallTextHelper(Symbol())).toBeNull();
    });

    test("should return string when argument is correct", () => {
      expect(SmallTextHelper("string")).toBe("string");
      const date = new Date().getDate();
      expect(SmallTextHelper(String(date))).toBe(String(date));
    });
  });

  describe("UrlHelper", () => {
    test("should be a function", () => {
      expect(UrlHelper).toBeDefined();
      expect(typeof UrlHelper === "function").toBeTruthy();
    });

    test("should return null when there is wrong type of object", () => {
      expect(UrlHelper()).toBeNull();
      expect(UrlHelper(123)).toBeNull();
      expect(UrlHelper([])).toBeNull();
      expect(UrlHelper({})).toBeNull();
      expect(UrlHelper(null)).toBeNull();
      expect(UrlHelper(Symbol())).toBeNull();
    });

    test("should return null when argument is correct but length === 0", () => {
      expect(UrlHelper({ url: "" })).toBeNull();
    });

    test("should return string with URL when argument is correct and length > 0", () => {
      expect(UrlHelper({ url: "https://google.com" })).toBe(
        "https://google.com"
      );
    });
  });

  describe("ImgHelper", () => {
    test("should be a function", () => {
      expect(ImgHelper).toBeDefined();
      expect(typeof ImgHelper === "function").toBeTruthy();
    });

    test("should return null when there is wrong type of object", () => {
      expect(ImgHelper()).toBeNull();
      expect(ImgHelper(123)).toBeNull();
      expect(ImgHelper([])).toBeNull();
      expect(ImgHelper({})).toBeNull();
      expect(ImgHelper(null)).toBeNull();
      expect(ImgHelper(Symbol())).toBeNull();
    });

    test("should return null when argument is correct but length === 0", () => {
      expect(ImgHelper({ url: "" })).toBeNull();
    });

    test("should return string with URL when argument is correct and length > 0", () => {
      expect(ImgHelper({ url: null, alt: null })).toBeNull();
      expect(ImgHelper({ url: null, alt: "Some alt" })).toBeNull();
      expect(ImgHelper({ url: "https://google.com", alt: null }).url).toBe(
        "https://google.com"
      );
      expect(ImgHelper({ url: "https://google.com", alt: null }).alt).toBe(
        null
      );
      expect(ImgHelper({ url: "https://google.com", alt: "" }).alt).toBeNull();
      expect(
        ImgHelper({ url: "https://google.com", alt: "Some alt" }).alt
      ).toBe("Some alt");
    });
  });

  describe("ArrayHelper", () => {
    test("should be a function", () => {
      expect(ArrayHelper).toBeDefined();
      expect(typeof ArrayHelper === "function").toBeTruthy();
    });

    test("should return null when there is wrong type of object", () => {
      expect(ArrayHelper()).toBeNull();
      expect(ArrayHelper(123)).toBeNull();
      expect(ArrayHelper({})).toBeNull();
      expect(ArrayHelper(null)).toBeNull();
      expect(ArrayHelper(Symbol())).toBeNull();
    });

    test("should return null when argument is correct but length === 0", () => {
      expect(ArrayHelper([])).toBeNull();
    });

    test("should return array when argument is correct and length > 0", () => {
      expect(Array.isArray(ArrayHelper([1, 2, 3]))).toBeTruthy;
      expect(ArrayHelper([1, 2, 3])[0]).toBe(1);
      expect(ArrayHelper([1, "2", { dummy: 123 }])[1]).toBe("2");
    });
  });
});

describe("prismic-helpers-sanitize - default all - PrismicHelpers", () => {
  test("should be an object", () => {
    expect(PrismicHelpers).toBeDefined();
    expect(typeof PrismicHelpers === "object").toBeTruthy();
  });
  test("should has all methods", () => {
    expect(PrismicHelpers.TextHelper).toBeDefined();
    expect(typeof PrismicHelpers.TextHelper === "function").toBeTruthy();
    expect(PrismicHelpers.NumberHelper).toBeDefined();
    expect(typeof PrismicHelpers.NumberHelper === "function").toBeTruthy();
    expect(PrismicHelpers.SmallTextHelper).toBeDefined();
    expect(typeof PrismicHelpers.SmallTextHelper === "function").toBeTruthy();
    expect(PrismicHelpers.UrlHelper).toBeDefined();
    expect(typeof PrismicHelpers.UrlHelper === "function").toBeTruthy();
    expect(PrismicHelpers.ImgHelper).toBeDefined();
    expect(typeof PrismicHelpers.ImgHelper === "function").toBeTruthy();
    expect(PrismicHelpers.ArrayHelper).toBeDefined();
    expect(typeof PrismicHelpers.ArrayHelper === "function").toBeTruthy();
    expect(PrismicHelpers.EmbedHelper).toBeDefined();
    expect(typeof PrismicHelpers.EmbedHelper === "function").toBeTruthy();
  });
});
