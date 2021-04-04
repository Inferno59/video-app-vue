<template>
  <div class="poster-page-bg" :style="newBackgroundImage">
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    poster: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    // background-image: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100% );
    const defaultPosterBg = 'linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100% )';

    const posterStyle = computed(() => {
      return (props.poster ? `url(${props.poster})` : defaultPosterBg);
    });

    const newBackgroundImage = computed(() => ({
      'background-image': posterStyle.value,
    }));

    return {
      posterStyle,
      newBackgroundImage,
    };
  },
};
</script>

<style scoped>
  .poster-page-bg{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-size: cover;
    background-position:center;
    transition: all 0.2s ease;
  }
  .poster-page-bg:before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.7;
    background-image: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100% );
  }
</style>
