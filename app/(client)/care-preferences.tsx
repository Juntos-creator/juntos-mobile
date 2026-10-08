import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../src/services/supabase'; // Ajusta la ruta según tu estructura

export default function CarePreferencesScreen() {
  const [mobilityNeeds, setMobilityNeeds] = useState('');
  const [dailyRoutine, setDailyRoutine] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('care_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setMobilityNeeds(data.mobility_needs || '');
          setDailyRoutine(data.daily_routine || '');
          setEmergencyContact(data.emergency_contact || '');
        }
      }
    } catch (error) {
      console.error('Error al cargar preferencias:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Debes iniciar sesión.');

      const payload = {
        user_id: user.id,
        mobility_needs: mobilityNeeds,
        daily_routine: dailyRoutine,
        emergency_contact: emergencyContact,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('care_preferences')
        .upsert(payload, { onConflict: 'user_id' });

      if (error) throw error;

      Alert.alert('¡Actualizado!', 'Las preferencias y rutinas de cuidado se han guardado correctamente.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudieron guardar las preferencias.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Cabecera */}
        <View style={styles.header}>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Preferencias de Acompañamiento</Text>
          <Text style={styles.subtitle}>Información clave para que el acompañante brinde una asistencia personalizada y cómoda.</Text>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Necesidades de Movilidad y Asistencia Física</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Ej. Utiliza bastón, requiere asistencia leve para caminar o subir escal خودرو..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={3}
              value={mobilityNeeds}
              onChangeText={setMobilityNeeds}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Rutina Diaria o Preferencias de Horarios</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Ej. Prefiere salidas matutinas, descanso a las 3:00 PM, almuerzo puntual..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={3}
              value={dailyRoutine}
              onChangeText={setDailyRoutine}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contacto de Emergencia / Familiar Responsable</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre y Teléfono (Ej. María Gómez - 809-000-0000)"
              placeholderTextColor="#94A3B8"
              value={emergencyContact}
              onChangeText={setEmergencyContact}
            />
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, (loading || fetching) && { opacity: 0.7 }]} 
            onPress={handleSavePreferences}
            disabled={loading || fetching}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Guardando...' : 'Guardar Preferencias'}
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { padding: 24, alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 500 },
  logoText: { fontSize: 24, fontWeight: '900', color: '#0F172A', letterSpacing: 2, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', color: '#1E293B', marginBottom: 4, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', paddingHorizontal: 10 },
  
  formContainer: { width: '100%', maxWidth: 500 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '700', color: '#334155', marginBottom: 8 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#0F172A' },
  textArea: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#0F172A', textAlignVertical: 'top', minHeight: 90 },

  submitButton: { backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' }
});