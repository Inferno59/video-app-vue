import axios from '@/plugins/axios';
import IDs from '@/store/mock/imdb_top250';
import mutations from '@/store/mutations';

const {
  MOVIES, CURRENT_PAGE, REMOVE_MOVIE, TOGGLE_SEARCH,
} = mutations;

function seriallizeRespons(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

const moviesStore = {
  namespaced: true,
  state: {
    top250Ids: IDs,
    currentPage: 1,
    moviesPerPage: 12,
    movies: {},
    isSearch: false,
  },
  getters: {
    moviesLength: ({ top250Ids, movies, isSearch }) => {
      let length = 0;
      if (isSearch) {
        length = Object.keys(movies).length;
      } else {
        length = Object.keys(top250Ids).length;
      }
      return length;
    },
    moviesList: ({ movies }) => movies,
    sliceIds: ({ top250Ids }) => (from, to) => top250Ids.slice(from, to),
    getCurrentPage({ currentPage }) {
      return currentPage;
    },
    getMoviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    isSearch: ({ isSearch }) => isSearch,
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    },

    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },

    [REMOVE_MOVIE](state, index) {
      state.top250Ids.splice(index, 1); // Методы тоже вызывают реактивность
    },
    [TOGGLE_SEARCH](state, bool) {
      state.isSearch = bool;
    },
  },
  actions: {
    // Action может быь обьектом, и пометрой root мы его можем сделать
    // глобальным и он будет доступен из любого места, из корневой сторы или
    // из индекса сторы
    initMovieStore: {
      handler({ dispatch }) {
        dispatch('fetchVideoInfo');
      },
      root: true,
    },
    // Добавляем вызов лоадера
    async fetchVideoInfo({ getters, commit, dispatch }) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const { getCurrentPage, getMoviesPerPage, sliceIds } = getters;
        const from = (getCurrentPage * getMoviesPerPage) - getMoviesPerPage;
        const to = (getCurrentPage * getMoviesPerPage);
        const moviesToFetch = sliceIds(from, to);

        const requests = moviesToFetch.map((id) => axios.get(`/?i=${id}`));

        const response = await Promise.all(requests);
        const movies = seriallizeRespons(response);
        commit(MOVIES, movies);
      } catch (err) {
        console.log(err);
      } finally {
        // Root делает его вызов от рута
        dispatch('toggleLoader', false, { root: true });
      }
    },

    async fetchSearchedMoviesInfo({ commit, dispatch }, moviesObj) {
      try {
        dispatch('toggleLoader', true, { root: true });

        const requests = Object.keys(moviesObj).map((id) => axios.get(`/?i=${id}`));

        const response = await Promise.all(requests);
        const movies = seriallizeRespons(response);
        commit(MOVIES, movies);
      } catch (err) {
        console.log(err);
      } finally {
        // Root делает его вызов от рута
        dispatch('toggleLoader', false, { root: true });
      }
    },

    changeCurrentPage({ commit, dispatch }, page) {
      commit(CURRENT_PAGE, page);
      dispatch('fetchVideoInfo');
    },

    removeMovie({ commit, dispatch, state }, id) {
      const index = state.top250Ids.findIndex((item) => item === id);

      if (index !== -1) {
        commit(REMOVE_MOVIE, index);
        dispatch('fetchVideoInfo');
      }
    },

    async searchMovies({ dispatch }, query) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const response = await axios.get(`/?s=${query}`);

        if (response.Error) { throw Error(response.Error); }

        const movies = seriallizeRespons(response.Search);
        dispatch('fetchSearchedMoviesInfo', movies);
        // console.log(movies);
        // commit(MOVIES, movies);
      } catch (err) {
        dispatch('showNotify', {
          msg: err.message,
          title: 'Error',
          variant: 'error',
        }, { root: true });
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    },
    toggleSearchState({ commit }, bool) {
      commit(TOGGLE_SEARCH, bool);
    },
  },
};

export default moviesStore;
