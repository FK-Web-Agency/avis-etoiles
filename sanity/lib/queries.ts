import { groq } from 'next-sanity';

const GET_LOGO = groq`*[_type == "general"][0]{logo}`;
const GET_HOME_PAGE = groq`*[_type == "home"][0]`;

export default {
  GET_LOGO,
  GET_HOME_PAGE,
};
