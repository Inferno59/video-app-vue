<template>
  <div class="container">
    <h3 class="list-title">{{ listTitle }}</h3>

    <div class="row justify-content-center">
      <template v-if="isExist">
        <div class="col-sm-5 col-md-4 col-xl-3" v-for="(movie, key) in list" :key="key">
          <MovieItem
            :movie="movie"
            @mouseover.native="onMouseOver(movie.Poster)"
            @removeItem="onRemoveItem"
            @showModal="onShowMovieInfo"
          />
        </div>
      </template>
      <template v-else>
        <div class=empty>
          Empty list
        </div>
      </template>
    </div>
    <el-dialog :width="width"
      custom-class="movie-modal-body"
      v-model="dialogVisible"
      modal="true"
      :before-close="onCloseModal">
      <MovieInfoModalContent :movie="selectedMovie" />
    </el-dialog>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { ElMessageBox } from 'element-plus';
import MovieItem from './MovieItem';
import MovieInfoModalContent from './MovieInfoModalContent';

export default {
  components: {
    MovieItem,
    MovieInfoModalContent,
  },
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const store = useStore();
    const isExist = computed(() => !!Object.keys(props.list).length);
    const removeMovie = (id) => store.dispatch('movies/removeMovie', id);
    const dialogVisible = ref(false);
    const selectedMovieId = ref('');
    const width = ref('');

    // Method for getting width of client
    const clientWidth = () => {
      if (window.innerWidth < 800) { width.value = '80%'; } else { width.value = '60%'; }
    };
    clientWidth();
    window.addEventListener('resize', clientWidth);

    function onMouseOver(poster) {
      emit('changePoster', poster);
    }

    async function onRemoveItem({ id, title }) {
      const isConfirmed = await ElMessageBox.confirm(
        `Are you sure want to delete ${title}. Continue?`,
        'Warning', {
          customClass: 'message-box-width',
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          // type: 'warning',
        },
      ).then(() => {
        store.dispatch('showNotify', {
          msg: 'Movie was successully deleted',
          title: 'Info',
          variant: 'success',
        });

        return true;
      }).catch(() => {
        store.dispatch('showNotify', {
          msg: 'Movie delete was successully canceled',
          title: 'Info',
          variant: 'info',
        });

        return false;
      });

      if (isConfirmed) {
        removeMovie(id);
      }
    }

    function onShowMovieInfo(id) {
      dialogVisible.value = true;
      selectedMovieId.value = id;
      console.log(selectedMovieId.value);
    }

    const isSearch = computed(() => (store.getters['movies/isSearch']));
    const selectedMovie = computed(() => {
      console.log(props.list[selectedMovieId.value]);
      return selectedMovieId.value ? props.list[selectedMovieId.value] : {};
    });

    function onCloseModal(done) {
      selectedMovieId.value = null;
      dialogVisible.value = false;
      done();
    }

    return {
      isExist,
      listTitle: computed(() => (isSearch.value ? 'Search result' : 'IMDB Top 250')),
      onMouseOver,
      onRemoveItem,
      onShowMovieInfo,
      dialogVisible,
      selectedMovie,
      onCloseModal,
      width,
    };
  },
};

</script>

<style scoped>
  .list-title{
    font-size: 50px;
    padding-top: 50px;
    margin-bottom: 50px;
    color: #fff;
  }

</style>

<style>
  .movie-modal-body{
    padding: 0 !important;
  }
  .movie-modal-body .el-dialog__header{
    padding: 0px !important;
  }
  .movie-modal-body .el-dialog__body{
    padding: 0px !important;
  }

  @media (max-width: 1000px) {
    .message-box-width{
      width: 300px !important;
    }
  }
</style>
