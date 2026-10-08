import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../src/services/supabase'; // Ajusta la ruta según tu estructura

export default function FavoriteLocationsScreen() {
  const [locations, setLocations] = useState<any[]>([]);
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('favorite_locations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (data) setLocations(data);
      }
    } catch (error) {
      console.error('Error al cargar ubicaciones:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleAddLocation = async () => {
    if (!label.trim() || !address.trim()) {
      Alert.alert('Campos incompletos', 'Por favor ingresa un nombre para el lugar y la dirección.');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Debes iniciar sesión.');

      const payload = {
        user_id: user.id,
        label: label.trim(),
        address: address.trim(),
        notes: notes.trim(),
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('favorite_locations').insert([payload]);
      if (error) throw error;

      Alert.alert('¡Guardado!', 'La dirección favorita ha sido registrada exitosamente.');
      setLabel('');
      setAddress('');
      setNotes('');
      fetchLocations();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo guardar la dirección.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLocation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('favorite_locations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      Alert.alert('Eliminado', 'El lugar favorito ha sido removido.');
      fetchLocations();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la dirección.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Cabecera */}
        <View style={styles.header}>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Lugares y Direcciones Favoritas</Text>
          <Text style={styles.subtitle}>Guarda destinos frecuentes para agilizar la coordinación de los acompañamientos.</Text>
        </View>

        {/* Listado de Lugares Guardados */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tus Destinos Frecuentes</Text>
          {fetching ? (
            <Text style={styles.emptyText}>Cargando lugares...</Text>
          ) : locations.length === 0 ? (
            <Text style={styles.emptyText}>No tienes direcciones favoritas guardadas.</Text>
          ) : (
            locations.map((loc) => (
              <View key={loc.id} style={styles.locationItem}>
                <View style={{ flex: 1, marginRight: 12 }}>
                  <Text style={styles.locationLabel}>📍 {loc.label}</Text>
                  <Text style={styles.locationAddress}>{loc.address}</Text>
                  {loc.notes ? <Text style={styles.locationNotes}>Nota: {loc.notes}</Text> : null}
                </View>
                <TouchableOpacity onPress={() => handleDeleteLocation(loc.id)}>
                  <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* Formulario para Agregar Dirección */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Agregar Nuevo Lugar</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre o Etiqueta del Lugar</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Casa de la Hija, Consultorio Dr. Pérez, Parque Mirador"
              placeholderTextColor="#94A3B8"
              value={label}
              onChangeText={setLabel}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dirección Completa</Text>
            <TextInput
              style={styles.input}
              placeholder="Calle, Número, Sector, Ciudad"
              placeholderTextColor="#94A3B8"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notas de Acceso o Referencia (Opcional)</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Ej. Tocar timbre 3B, portón blanco, ascensor disponible..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={3}
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, loading && { opacity: 0.7 }]} 
            onPress={handleAddLocation}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Guardando...' : 'Guardar Dirección'}
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
  
  sectionContainer: { width: '100%', maxWidth: 500, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 12 },
  emptyText: { textAlign: 'center', color: '#64748B', fontStyle: 'italic', marginTop: 8 },

  locationItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, padding: 16, marginBottom: 10 },
  locationLabel: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  locationAddress: { fontSize: 13, color: '#334155', marginBottom: 4 },
  locationNotes: { fontSize: 12, color: '#64748B', fontStyle: 'italic' },
  deleteText: { fontSize: 13, fontWeight: '700', color: '#EF4444', marginTop: 2 },

  formContainer: { width: '100%', maxWidth: 500 },
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '700', color: '#334155', marginBottom: 6 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#0F172A' },
  textArea: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#0F172A', textAlignVertical: 'top', minHeight: 80 },

  submitButton: { backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' }
});