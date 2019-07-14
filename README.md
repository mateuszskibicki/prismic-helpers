This project is based on headless CMS - Primic - [Prismic.io](https://prismic.io/). Make your Prismic responses smaller and cleaner!

Author: [Mateusz Skibicki](https://github.com/mateuszskibicki).

# How to install

### `npm i prismic-helpers-sanitize`

# How to import to your project

```javascript
//Node.js
const {
  TextHelper,
  NumberHelper,
  SmallTextHelper,
  UrlHelper,
  ImgHelper,
  ArrayHelper
} = require("prismic-helpers-sanitize");
//or
const PrismicHelpers = require("prismic-helpers-sanitize");

//Front-end -> React.js example
import {
  TextHelper,
  NumberHelper,
  SmallTextHelper,
  UrlHelper,
  ImgHelper,
  ArrayHelper
} from "prismic-helpers-sanitize";
//or
import PrismicHelpers from "prismic-helpers-sanitize";
```

# WHY to use it

In Prismic.io you're getting very big and nested responses. This module is to help you to keep it clear and easy to maintain. This is [example response](https://prismic.io/docs/javascript/query-the-api/the-response-object) from Prismic. Mostly you're aiming to get the `data` key value pairs in it, where is your content from CMS.

With this example to get text from title you should go very deep in response object:

```javascript
const response = await Primis.someDummyQuery();
const titleText = response.results[0].data.title[0].text;
```

It means that there is a lot of places where you can get undefined and break your front-end app for example. I don't know how about you but I don't want to make logic like this for everything:

```javascript
const response = await Primis.someDummyQuery();
const titleText = response.results[0].data.title[0].text;

const DummyReactComponent = () =>
  response &&
  response.results &&
  response.results[0] &&
  response.results[0].data &&
  response.results[0].data.title &&
  response.results[0].data.title[0] &&
  response.results[0].data.title[0].text &&
  response.results[0].data.title[0].text.length > 0 ? (
    <p>{titleText}</p>
  ) : null;
```

This is probbaly the safest way of checking if content exists. Step by step.

# HOW to use it

Create helpers. Modular code. Create for example `helpers` folder where you keep all your helpers (you'll see how often they will talk to each other and reuse the same functionality - DRY code). Keep the same syntax everywhere. This is how I use it with TypeScript:

```typescript
import {
  TextHelper,
  SmallTextHelper,
  ImgHelper
} from "prismic-helpers-sanitize";
import { SEOhelper } from "../SEOhelper";
import { sliceHelper } from "../slice-helpers/SliceHelpers";
import { ISingleArticlePage } from "../../types/article.types";

export const singleArticleHelper = (
  response: any
): ISingleArticlePage | null => {
  if (!response || !response.data) return null;
  const articleData: any = data.data;

  const article: ISingleArticlePage = {
    uid: data.uid,
    title: TextHelper(articleData.title),
    short_description: TextHelper(articleData.short_description),
    series: TextHelper(articleData.series),
    categories: TextHelper(articleData.categories),
    tags: TextHelper(articleData.tags),
    date: SmallTextHelper(articleData.date),
    small_img: ImgHelper(articleData.small_img),
    big_img: ImgHelper(articleData.big_img),
    author:
      articleData.author && articleData.author.data
        ? {
            uid: SmallTextHelper(articleData.author.data.uid),
            full_name: TextHelper(articleData.author.data.full_name),
            short_description: TextHelper(
              articleData.author.data.short_description
            ),
            image_avatar: ImgHelper(articleData.author.data.image_avatar)
          }
        : null,
    SEO: SEOhelper(articleData),
    content: sliceHelper(articleData.body)
  };

  return article;
};
```

On the Back-End/Front-End I just make some `async await` call to the Prismic api and I put whole response in this helper. This is how it looks:

```javascript
import { singleArticleHelper } from "../helpers/singleArticleHelper";

//here some React component - class based or functional with Hooks and this code in it:

const response = await Primis.someDummyQuery();
const clearResponse = singleArticleHelper(response);

//then in render function
clearResponse && <SomeComponent clearResponse={clearResponse} />;
```

# HOW these helpers works

My helper functions here are to make life easier. You can use them with all different types of data from Prismic, it will try to get the data from inside of it or return `null`. It's easier to works on `null` than on `undefined` or `''` (empty string) etc. This is whole code I've used, feel free to copy it and play around with your Prismic responses. If you like it, use library or leave a star :D

```typescript
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
```

# Testing

There is a lot of smaller or bigger unit tests (`Jest`) written for it, so I am sure it will work with everything.

# Author

## [Mateusz Skibicki](https://github.com/mateuszskibicki)

Feel free to use it, contact me if you have any questions (try on github/Linkedin). Have fun!
