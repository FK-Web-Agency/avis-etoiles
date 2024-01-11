import { groq } from 'next-sanity';


const GET_HOME_PAGE = groq`*[_type == "home"][0]`


export default {
    GET_HOME_PAGE,
}