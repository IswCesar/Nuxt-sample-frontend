<template>
  <div>
    <navbar-item />
    <nuxt />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import NavbarItem from '~/components/common/NavbarItem.vue'

export default Vue.extend({
  name: 'DefaultLayout',
  components: { NavbarItem },
})
</script>
