import { groq } from 'next-sanity';

const GET_LOGO = groq`*[_type == "general"][0]{logo}`;
const GET_GENERAL = groq`*[_type == "general"][0]`;
const GET_HOME_PAGE = groq`*[_type == "home"][0]`;
const GET_FEATURES_PAGE = groq`*[_type == "features"][0]`;

export default {
  GET_LOGO,
  GET_HOME_PAGE,
  GET_GENERAL,
  GET_FEATURES_PAGE
};
