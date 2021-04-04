<template>
  <div></div>
</template>

<script>
import { ElNotification } from 'element-plus';
import { computed, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const msgPool = computed(() => store.getters.messagePool);

    const showNotification = ({ variant, msg, title }) => {
      ElNotification({
        title,
        message: msg,
        type: variant,
        duration: 2000,
      });
    };
    watch(msgPool, (val) => showNotification(val));

    //     open() {
    //   this.$notify({
    //     title: 'HTML String',
    //     dangerouslyUseHTMLString: true,
    //     message: '<strong>This is <i>HTML</i> string</strong>'
    //   });
    // }
    return {
      showNotification,
    };
  },
};
</script>

<style>

</style>
