<template>
  <b-container class="mt-5">
    <b-row>
      <b-col>
        <b-table striped hover :items="users" :fields="fields">
          <template #cell(createdAt)="data">
            <b class="text-info">{{ formatDate(data.value)}}</b>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import User from '@/types/users/User'
import UserDataService from '@/services/users/UserDataService'
export default Vue.extend({
  name: 'UserTable',
  data() {
    const users: User[] = []
    const fields: string[] = [
      'firstname',
      'lastname',
      'email',
      'phone',
      'birthday',
      'createdAt',
    ]
    return {
      fields,
      users,
    }
  },

  mounted() {
    this.loadUsers()
  },

  methods: {

    formatDate(date: Date): string {
      return moment(date).format('MMMM d, YYYY'); 
    },

    async loadUsers() {
      const vm = this
      const { data } = await UserDataService.getAll()
      vm.users = data
    },
  },
})
</script>
