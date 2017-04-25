const API_KEY = 'a07e22bc18f5cb106bfe4cc1f83ad8ed'
const URL_PREFIX = 'https://api.themoviedb.org/3/movie'
const NOW_PLAYING_URL = `${URL_PREFIX}/now_playing?api_key=${API_KEY}`
const TOP_RATED_URL = `${URL_PREFIX}/top_rated?api_key=${API_KEY}`

const IMAGE_URL_PREVIX = 'https://image.tmdb.org/t/p/original'
const IMAGE_URL_PREVIX_LOW = 'https://image.tmdb.org/t/p/w45'

export const getPosterUrlHigh = posterPath => `${IMAGE_URL_PREVIX}/${posterPath}`
export const getPosterUrlLow = posterPath => `${IMAGE_URL_PREVIX_LOW}/${posterPath}`
export const getBackdropPath = path => `${IMAGE_URL_PREVIX}/${path}`

export const fetchMovies = () => (
	fetch(NOW_PLAYING_URL)
		.then((response) => response.json())
		.then((response) => response.results)
)
export const fetchTopRatedMovies = () => (
	fetch(TOP_RATED_URL)
		.then((response) => response.json())
		.then((response) => response.results)
)