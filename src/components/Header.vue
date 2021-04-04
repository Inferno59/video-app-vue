<template>
  <header class="header">
    <div class="container">
      <nav class="navbar navbar-expand-lg" style="padding: 10px 0;">
        <a class="navbar-brand" href="#">MovieDB</a>

        <form class="" style="margin-left: auto;">
          <input
            class="form-control me-2 search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchValue"
            @keydown.enter.prevent="onEnter"
          >
        </form>
      </nav>
    </div>
  </header>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const searchValue = ref('');
    let timer = '';

    function onSearchValueChange(val) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        const searchMovies = (query) => store.dispatch('movies/searchMovies', query);
        searchMovies(val);
      }, 500);
    }

    const fetchMovies = () => store.dispatch('movies/fetchVideoInfo');
    const toggleSearchState = (bool) => store.dispatch('movies/toggleSearchState', bool);

    watch(searchValue, (val) => {
      if (val) {
        onSearchValueChange(val);
        toggleSearchState(true);
      } else {
        fetchMovies();
        toggleSearchState(false);
      }
    });

    return {
      searchValue,
    };
  },
};
</script>

<style scoped>
  .header{
    margin-bottom: 30px;
    background-color: rgba(0, 0, 0, 0.7) !important;
  }
  .navbar{
    /* background: rgba(0, 0, 0, 0.7) !important; */
  }
  .navbar a {
    color: #fff !important;
  }
  .search-input{
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(0, 0, 0, 0.6);
  }
  .search-input:focus {
    color: #fff;
    border-color: rgba(0, 0, 0, 0.6);
    background: rgba(255, 255, 255, 0.2);
    /* box-shadow: 0 0 0 0.2rem rgb(255 255 255 / 25%); */
    box-shadow: none;
  }
</style>
