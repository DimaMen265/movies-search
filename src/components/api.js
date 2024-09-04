import axios from "axios";

const DEF_PATH_IMAGE = "http://image.tmdb.org/t/p/";
const DEF_LOGO_SIZE = "w185"
const DEF_POSTER_SIZE = "w500";

const API_KEY = "eba3331a63849f6ef17e8f5483af2ec2";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const paramsObj = {
  api_key: API_KEY,
};

const getTrending = async abortController => {
  const params = new URLSearchParams(paramsObj);
  return await axios.get(`/trending/movie/day?${params}`, { signal: abortController.signal });
};

const getSearchMovies = async (title, abortController) => {
  const paramsObjSearch = {
    ...paramsObj,
    query: title,
  };
  const params = new URLSearchParams(paramsObjSearch);
  return await axios.get(`/search/movie?${params}`, { signal: abortController.signal });
};

const getMovieDetails = async (id, abortController) => {
  const params = new URLSearchParams(paramsObj);
  return await axios.get(`/movie/${id}?${params}`, { signal: abortController.signal });
};

const getMovieCredits = async (id, abortController) => {
  const params = new URLSearchParams(paramsObj);
  return await axios.get(`/movie/${id}/credits?${params}`, { signal: abortController.signal });
};

const getMovieReviews = async (id, abortController) => {
  const params = new URLSearchParams(paramsObj);
  return await axios.get(`/movie/${id}/reviews?${params}`, { signal: abortController.signal });
};

export {
  getTrending,
  getSearchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
  DEF_PATH_IMAGE,
  DEF_LOGO_SIZE,
  DEF_POSTER_SIZE,
};
