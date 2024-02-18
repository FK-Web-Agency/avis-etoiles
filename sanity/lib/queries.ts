import { groq } from 'next-sanity';

const TAG_GENERAL = 'general';
const TAG_HOME = 'home';
const TAG_FEATURES = 'features';
const TAG_PRICES = 'prices';
const TAG_ABOUT = 'about';

const GET_LOGO = groq`*[_type == "${TAG_GENERAL}"][0]{logo}`;
const GET_GENERAL = groq`*[_type == "${TAG_GENERAL}"][0]`;
const GET_HOME_PAGE = groq`*[_type == "${TAG_HOME}"][0]`;
const GET_FEATURES_PAGE = groq`*[_type == "${TAG_FEATURES}"][0]`;
const GET_PRICES_PAGE = groq`*[_type == "${TAG_PRICES}"][0]`;
const GET_ABOUT_PAGE = groq`*[_type == "${TAG_ABOUT}"][0]`;

export default {
  GET_LOGO,
  GET_HOME_PAGE,
  GET_GENERAL,
  GET_FEATURES_PAGE,
  GET_PRICES_PAGE,
  GET_ABOUT_PAGE,

  TAG_GENERAL,
  TAG_HOME,
  TAG_FEATURES,
  TAG_PRICES,
  TAG_ABOUT,
};
