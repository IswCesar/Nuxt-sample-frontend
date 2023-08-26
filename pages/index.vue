<template>
  <user-table />
</template>

<script lang="ts">
import Vue from 'vue'

import UserTable from '~/components/users/UserTable.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { UserTable },
  layout: 'DefaultLayout'
})
</script>
