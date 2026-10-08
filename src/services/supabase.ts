// src/services/supabase.ts
import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://sb_publishable_LT2Q_mX_X5Mkf82j-7NnuA_o4qy_oyq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkdGZ1YmNyaHRpcnR4Y2prdWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNzg0NjIsImV4cCI6MjEwNjk1NDQ2Mn0.XvcMNzPJfE9KmFkPV5ityrKbJpwjGASBQT0jmK8YRfE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Controlar el ciclo de vida de la sesión en móvil
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});