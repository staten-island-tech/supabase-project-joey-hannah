import { defineStore } from 'pinia'
import { supabase } from '../supabaseClient'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.user
  },

  actions: {

    async fetchUser() {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error)
        this.user = null
      } else {
        this.user = data.user
      }
    },


    login(userData) {
      this.user = userData
    },

    async logout() {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Logout failed:', error)
        return
      }
      this.user = null
    }
  }
})
