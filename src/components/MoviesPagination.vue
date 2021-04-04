<template>
  <div>
    <el-pagination class="movies-pagination d-flex justify-content-center"
      layout="prev, pager, next"
      v-model:total="total"
      v-model:current-page="currentPageModel"
      v-model:page-size="perPage"
      v-model:pager-count="pagerCount"
      prev-text="Prev"
      next-text="Next"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
  },
  emits: ['pageChanged'],

  setup(props, { emit }) {
    const pagerCount = ref(5);

    const currentPageModel = computed({
      get() {
        return props.currentPage;
      },
      set(value) {
        emit('pageChanged', value);
      },
    });

    return {
      currentPageModel,
      pagerCount,
    };
  },
};
</script>

<style scoped>
  .movies-pagination{
    margin-top: auto;
  }

  .movies-pagination >>> .el-pager .number,
  .movies-pagination >>> .el-pager .more,
  .movies-pagination >>> button,
  .movies-pagination >>> button:disabled{
    background-color: transparent;
    font-size: 14px;
    color: #fff;
    border: 1px solid white;
    opacity: 0.7;
    border-radius: 2px;
  }

  .movies-pagination >>> .el-pager .active {
    background-color: #fff;
    color: #000;
  }

  .movies-pagination >>> button:disabled{
    background-color: transparent;
    font-size: 14px;
    color: gray;
    border: 1px solid white;
    opacity: 0.7;
    border-radius: 2px;
  }

</style>
