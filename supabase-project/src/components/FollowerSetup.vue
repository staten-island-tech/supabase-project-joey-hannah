<template>
  <button v-if="isFollowing" @click="unfollow">Unfollow</button>
  <button v-else @click="follow">Follow</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabaseClient'

const emit = defineEmits(['follow-change'])

const props = defineProps({
  targetUserId: String,
})

const currentUserId = ref(null)
const isFollowing = ref(false)

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  currentUserId.value = user.id
  await checkFollowStatus()
})

const checkFollowStatus = async () => {
  const { data } = await supabase
    .from('followers')
    .select('*')
    .eq('follower_id', currentUserId.value)
    .eq('following_id', props.targetUserId)
    .single()

  isFollowing.value = !!data
}

const follow = async () => {
  await supabase.from('followers').insert({
    follower_id: currentUserId.value,
    following_id: props.targetUserId,
  })
  isFollowing.value = true
  emit('follow-change')
}

const unfollow = async () => {
  await supabase.from('followers').delete().match({
    follower_id: currentUserId.value,
    following_id: props.targetUserId,
  })
  isFollowing.value = false
  emit('follow-change')
}
</script>
