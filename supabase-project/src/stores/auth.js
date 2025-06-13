import { defineStore } from 'pinia'
import { supabase } from '../supabaseClient'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    username: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        console.error('Error fetching user:', error)
        this.user = null
        this.username = null
        return
      }
      this.user = data.user

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', this.user.id)
        .single()

      if (profileError) {
        console.error('Error fetching profile username:', profileError)
        this.username = null
      } else {
        this.username = profileData?.username || null
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
      this.username = null
    },
  },
})
