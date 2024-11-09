
const BASE_URL = 'http://127.0.0.1:8000/'

const getMovieSearchURL = () => {
  return BASE_URL + 'movie/';
}

const getHistoryURL = () => {
  return BASE_URL + 'history/';
}

export const searchMovie = async (searchText, user) => {
  return fetch(getMovieSearchURL() + '?' + new URLSearchParams({
    user: user,
    movieName: searchText
  }).toString()
  )
    .then(response => response.json())
    .catch(error => console.error(error));
}

export const getHistory = async () => {
  return fetch(getHistoryURL())
    .then(response => response.json())
    .catch(error => console.error(error));
}