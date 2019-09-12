<template>
  <div class="home">
    <Autocomplete :items="items" />
  </div>
</template>

<script>
// @ is an alias to /src
import Autocomplete from '@/components/Autocomplete.vue';

export default {
  name: 'home',
  components: {
    Autocomplete,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    getAllOptions() {
      this.$axios.get(`${process.env.VUE_APP_API_URL}5ba8efb23100007200c2750c`).then((response) => {
        this.items = response.data || [];
      });
    },
  },
  beforeMount() {
    this.getAllOptions();
  },
};
</script>
