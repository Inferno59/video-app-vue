<template>
  <div class="loader-wrap" v-if="isShowLoader">
    <div class="spinner-border light-spinner" role="status">
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const isShowLoader = computed(() => store.getters.isShowLoader);

    return {
      isShowLoader,
    };
  },
};
</script>

<style>
  .loader-wrap{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .light-spinner{
    color: white;
  }
</style>
