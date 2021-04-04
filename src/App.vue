<template>
  <div id="app">
    <Notification />
    <Header />
    <Loader />
    <PosterBg :poster="currentPoster" />
    <moviesListRender :list="moviesList" @changePoster="onChangePoster"/>
    <MoviesPAgination
      :current-page="currentPage"
      :per-page="moviesPerPage"
      :total="moviesLength"
      @pageChanged="onPageChanged"
    />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import moviesListRender from './components/MoviesList';
import PosterBg from './components/PosterBg';
import MoviesPAgination from './components/MoviesPagination';
import Loader from './components/Loader';
import Header from './components/Header';
import Notification from './components/notification';

export default {
  components: {
    moviesListRender,
    PosterBg,
    MoviesPAgination,
    Loader,
    Header,
    Notification,
  },
  methods: {
    onClickRoute() {
      this.$router.push({
        path: '/',
        query: { plan: 'private' },
      });
    },
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const currentPoster = ref('');

    function onChangePoster(poster) {
      currentPoster.value = poster;
    }

    async function onPageChanged(page) {
      router.push({
        query: {
          page,
        },
      });

      await store.dispatch('movies/changeCurrentPage', page);
    }

    return {
      onPageChanged,
      onChangePoster,
      currentPoster,
      moviesList: computed(() => store.getters['movies/moviesList']),
      currentPage: computed(() => store.getters['movies/getCurrentPage']),
      moviesPerPage: computed(() => store.getters['movies/getMoviesPerPage']),
      moviesLength: computed(() => store.getters['movies/moviesLength']),
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Arial, Avenir, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
