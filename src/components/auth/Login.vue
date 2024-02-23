<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-md-6 mx-auto">
        <ValidationErrors :errors="store.errors"></ValidationErrors>
        <div class="card rounded-0 shadow-sm">
          <div class="card-header bg-white">
            <h5 class="text-center mt-2">
              Login
            </h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="userAuth"> 
              <div class="form-group mb-3">
                <input 
                  type="text" 
                  v-model="data.user.email"
                  placeholder="Email*" class="form-control">
              </div>
              <div class="form-group mb-3">
                <input 
                  type="password" 
                  v-model="data.user.password"
                  placeholder="Password*" class="form-control">
              </div>
              <div class="form-group mb-3">
                <Spinner v-if="data.loading" />
                <button v-else type="submit" class="btn btn-dark btn-sm rounded-0">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onUnmounted, reactive } from "vue"
  import router from '../../router'
  import { useAuthStore } from '../../stores/useAuthStore.js'
  import axios from 'axios'
  import { useToast } from "vue-toastification"
  import { BASE_URL } from '../../helpers/baseUrl'
  import ValidationErrors from '../layouts/ValidationErrors.vue'
  import Spinner from '../layouts/Spinner.vue'

  const toast = useToast()
  
  const store = useAuthStore()
  
  const data = reactive({
    loading: false,
    user: {
      email: '',
      password: ''
    }
  })

  const userAuth = async () => {
    store.clearErrors();
    data.loading = true;
    try {
        const response = await axios.post(`${BASE_URL}/user/login`, data.user);
        data.loading = false
        if(response.data.error) {
            toast.error(response.data.error, {
              timeout: 3000
            })
        }else {
            store.setToken(response.data.currentToken)
            store.setUser(response.data.user)
            toast.success(response.data.message, {
              timeout: 3000
            })
            router.push('/')
        }
    } catch (error) {
      data.loading = false
      if(error.response.status === 422) {
        store.setErrors(error.response.data.errors)
      }
      console.log(error);
    }
  }
  
  onUnmounted(() => store.clearErrors())
</script>

<style>
</style>
