import { supabase } from './supabase';

export interface CarePreferencePayload {
  mobility_needs: string;
  daily_routine: string;
  emergency_contact: string;
}

export interface ServiceRequestPayload {
  companion_id: string;
  address: string;
  notes: string;
}

// Obtenemos las preferencias del usuario actual
export const getCarePreferences = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('care_preferences')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

// Guardamos o actualizamos preferencias
export const saveCarePreferences = async (payload: CarePreferencePayload) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Usuario no autenticado');

  const { error } = await supabase
    .from('care_preferences')
    .upsert(
      {
        user_id: user.id,
        ...payload,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    );

  if (error) throw error;
};

// Crear una nueva solicitud de acompañamiento
export const createServiceRequest = async (payload: ServiceRequestPayload) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Usuario no autenticado');

  const { error } = await supabase
    .from('service_requests')
    .insert([
      {
        client_id: user.id,
        companion_id: payload.companion_id,
        address: payload.address,
        notes: payload.notes,
        status: 'pending',
      },
    ]);

  if (error) throw error;
};

// Obtener los acompañamientos activos para el Portal Familiar
export const getActiveFamilyServices = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('service_requests')
    .select(`
      id,
      address,
      notes,
      status,
      created_at,
      companion:companion_id ( full_name )
    `)
    .eq('client_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};