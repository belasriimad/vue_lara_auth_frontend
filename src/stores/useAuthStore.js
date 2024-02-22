import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({ 
        user: null,
        access_token: JSON.parse(localStorage.getItem('currentToken')) || null,
        errors: null
    }),
    getters: {},
    actions: {
        setUser(user) {
            this.user = user
        },
        setToken(token) {
            localStorage.setItem('currentToken', JSON.stringify(token))
            this.access_token = token
        },
        clearStoredData() {
            localStorage.removeItem('currentToken')
            this.access_token = null
            this.user = null
        },
        setErrors(errors) {
            this.errors = errors
        },
        clearErrors() {
            this.errors = null
        }
    },
});