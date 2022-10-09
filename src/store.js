import { writable } from 'svelte/store'

export const posts = writable([])
export const index = writable(null)

const URL = 'https://restorefirsthealth.com/wp-json/wp/v2/posts?per_page=32&_embed'

fetch(URL)
  .then(res => res.json())
  .then(data => posts.set(data))
  .catch(error => console.log(error))
