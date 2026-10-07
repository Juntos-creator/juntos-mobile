// src/services/supabase.ts
import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://sb_publishable_zitDgY_AycCCUS-QIl17sA_Tm3b6mDs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzamJ0cGJ3enlkaGxyZWR0cWlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4OTYyNjAsImV4cCI6MjEwNjQ3MjI2MH0.HS2ptlso6Pcs4mG8U1vDMT9Npk1htewGrzVEEJr_CCs';

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