<template>
    <div class="movie-item mb-3">
      <div class="movie-item-poster" :style="posterBg" > </div>
      <div class="movie-item-info-wrap">
        <div class="movie-item-info">
          <h3 class="movie-title">{{ movie.Title }}</h3>
          <span class="movie-year">{{ movie.Year }}</span>
        </div>
        <div class="movie-item-control row no-gutters">
          <div class="col pr-2">
            <el-button
              size="medium"
              class="item-button"
              @click="emitInfoEvent"
            >Info</el-button>
          </div>
          <div class="col pl-2" v-if="!isSearch">
            <el-button
              size="medium"
              class="item-button"
              @click="emitRemoveEvent"
            >Remove</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  emits: ['removeItem', 'showModal'],

  setup(props, { emit }) {
    const store = useStore();
    const posterBg = computed(() => ({ 'background-image': `url(${props.movie.Poster})` }));

    function emitRemoveEvent() {
      emit('removeItem', { id: props.movie.imdbID, title: props.movie.Title });
    }

    function emitInfoEvent() {
      emit('showModal', props.movie.imdbID);
    }

    const isSearch = computed(() => (store.getters['movies/isSearch']));

    return {
      posterBg,
      emitRemoveEvent,
      emitInfoEvent,
      isSearch,
    };
  },
};
</script>
<style scoped>
  .mb-3{
    margin-bottom: 10px;
  }

  .movie-item{
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.2s ease-in;
    height: 300px;
  }

  .movie-item:hover{
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
    transform: scale(1.02);
  }

  .movie-item-poster{
    position: absolute;
    height:400px;
    background-position: center;
    background-size: cover;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-repeat: no-repeat;
    z-index: -1;
  }
  .movie-item-info-wrap{
    padding: 10px 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: 0;
    transition: all 0.2s ease;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .movie-item:hover .movie-item-info-wrap{
    opacity: 1;
  }

  .item-button, .item-button:hover, .item-button:visited, .item-button:active,
  .item-button:focus, .item-button:target{
    color: white;
    background: rgba(205, 214, 219, 0);
  }
  .movie-title{
    font-size: 20px;
    color: #fff;
  }

  .movie-year{
    font-size: 14px;
    color: #fff;
  }

  .item-button{
    width: 100%;
  }
</style>
