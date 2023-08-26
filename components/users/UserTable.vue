<template>
  <b-container class="mt-5">
    <b-row>
      <b-col>
        <div>
          <b-button v-b-modal.modal-1 variant="info" @click="openModal()">{{
            buttonAdd
          }}</b-button>

          <b-modal v-model="modalShow" title="Item" hide-footer>
            <b-form @submit="handleItem">
              <b-form-group
                id="input-group-1"
                label="Your Name:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="user.firstname"
                  placeholder="Enter name"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Your Lastname:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="user.lastname"
                  placeholder="Enter lastname"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-."
                label="Email address:"
                label-for="input-3"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-3"
                  v-model="user.email"
                  type="email"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-4"
                label="Your phone:"
                label-for="input-4"
              >
                <b-form-input
                  id="input-4"
                  v-model="user.phone"
                  placeholder="Enter phone"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-5"
                label="Your birthday"
                label-for="input-5"
                required
              >
                <b-form-datepicker
                  id="input-group-5"
                  v-model="user.birthday"
                  class="mb-4"
                ></b-form-datepicker>
              </b-form-group>

              <b-button
                v-show="user.id !== undefined"
                type="submit"
                variant="primary"
                >Update</b-button
              >
              <b-button
                v-show="user.id === undefined || user.id === ''"
                type="submit"
                variant="primary"
                >Submit</b-button
              >
            </b-form>
          </b-modal>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col>
        <b-table striped hover :items="users" :fields="fields" sort-by="updatedAt" :sort-desc="true">
          <template #cell(createdAt)="data">
            <b class="text-info">{{ formatDate(data.value) }}</b>
          </template>
          <template #cell(actions)="data">
            <b-row>
              <b-col
                ><b-button
                  size="sm"
                  variant="danger"
                  @click="deleteItem(data.item)"
                  >{{ deleteAction }}</b-button
                ></b-col
              >
              <b-col
                ><b-button
                  size="sm"
                  variant="warning"
                  @click="openUpdate(data.item)"
                  >{{ updateAction }}</b-button
                ></b-col
              >
            </b-row>
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
    const modalShow: boolean = false
    const buttonAdd: string = 'Add Item'
    const deleteAction: string = 'Delete'
    const updateAction: string = 'Update'
    const itemId: string = ''
    const users: User[] = []
    const user: User = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      birthday: '',
    }
    const fields: string[] = [
      'firstname',
      'lastname',
      'email',
      'phone',
      'birthday',
      'createdAt',
      'actions',
    ]
    return {
      itemId,
      updateAction,
      deleteAction,
      buttonAdd,
      fields,
      users,
      user,
      modalShow,
    }
  },

  mounted() {
    this.loadUsers()
  },

  methods: {
    formatDate(date: Date): string {
      return moment(date).format('MMMM d, YYYY')
    },

    openModal() {
      const vm = this
      vm.cleanUser()
      vm.modalShow = true
    },
    
    cleanUser() {
      const vm = this
      vm.user = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        birthday: '',
      }
    },

    handleItem(event: any) {
      const vm = this
      event.preventDefault()
      console.log(vm.user)
      if (vm.user.id !== undefined) {
        vm.updateItem()
      } else {
        vm.createItem()
      }
    },

    async loadUsers(): Promise<void> {
      const vm = this
      const { data } = await UserDataService.getAll()
      vm.users = data
    },

    async createItem(): Promise<void> {
      const vm = this
      if (vm.user.birthday !== '') {
        await UserDataService.create(vm.user)
        await vm.loadUsers()
        vm.cleanUser()
        vm.modalShow = false
      } else {
        alert('Please enter a birthday')
      }
    },

    async updateItem(): Promise<void> {
      const vm = this
      if (vm.user.birthday !== '') {
        delete vm.user.id;
        await UserDataService.update(vm.itemId, vm.user)
        await vm.loadUsers()
        vm.cleanUser()
        vm.modalShow = false
      } else {
        alert('Please enter a birthday')
      }
    },

    async deleteItem(user: User): Promise<void> {
      const vm = this
      await UserDataService.delete(user.id!)
      await vm.loadUsers()
    },

    openUpdate(user: User): void {
      const vm = this
      console.log(user);
      vm.itemId = user.id!;
      const userAux: User = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        birthday: user.birthday,
      }

      vm.user = userAux
      vm.modalShow = true
    },
  },
})
</script>
