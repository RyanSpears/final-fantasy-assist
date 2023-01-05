import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
import { createClient } from '@supabase/supabase-js'
import { registerPlugins } from '@/plugins'

// Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create App
const app = createApp(App);

app.use(createPinia());

registerPlugins(app);

app.mount('#app');
