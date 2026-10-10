import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { createServiceRequest } from '../../src/services/clientService';

export default function SelectCompanionScreen() {
  const router = useRouter();
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const companions = [
    {
      id: '1',
      name: 'Ana Martínez',
      role: 'Especialista en Lectura y Conversación',
      rating: '4.9',
      reviews: '48',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400',
    },
    {
      id: '2',
      name: 'Carlos Gómez',
      role: 'Acompañante de Paseos y Recados',
      rating: '5.0',
      reviews: '32',
      photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400',
    },
    {
      id: '3',
      name: 'Laura Peralta',
      role: 'Apoyo en Actividades Recreativas',
      rating: '4.8',
      reviews: '19',
      photo: 'https://images.unsplash.com/photo-1594824813572-c2f8f8ef1923?q=80&w=400',
    },
  ];

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleConfirmRequest = async () => {
    if (!selectedCompanion) {
      showAlert('Atención', 'Por favor selecciona un acompañante de la lista.');
      return;
    }

    if (!address.trim()) {
      showAlert('Atención', 'Por favor ingresa la dirección o lugar del encuentro.');
      return;
    }

    setLoading(true);

    try {
      // Guardar directamente la solicitud en Supabase
      await createServiceRequest({
        companion_id: selectedCompanion,
        address: address.trim(),
        notes: notes.trim(),
      });

      showAlert(
        '¡Solicitud Enviada!',
        'Tu servicio ha sido registrado correctamente en la plataforma.'
      );

      // Redireccionar al Portal Familiar para ver el monitoreo activo
      router.replace('/(client)/FamilyPortalScreen');
    } catch (error: any) {
      console.error('Error al crear solicitud:', error);
      showAlert('Error', error.message || 'No se pudo enviar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Cabecera */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Solicitar Acompañamiento</Text>
        </View>

        {/* Paso 1: Selección de Acompañante */}
        <View style={styles.sectionCard}>
          <Text style={styles.stepTitle}>1. Elige un Acompañante Verificado</Text>
          <Text style={styles.stepSubtitle}>Personas capacitadas para compañía, paseos y apoyo cotidiano.</Text>

          <View style={styles.companionList}>
            {companions.map((item) => {
              const isSelected = selectedCompanion === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.cardItem, isSelected && styles.cardItemSelected]}
                  onPress={() => setSelectedCompanion(item.id)}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: item.photo }} style={styles.photo} />
                  <View style={styles.infoContainer}>
                    <Text style={styles.companionName}>{item.name}</Text>
                    <Text style={styles.companionRole}>{item.role}</Text>
                    <Text style={styles.companionRating}>⭐ {item.rating} ({item.reviews} acompañamientos)</Text>
                  </View>
                  <View style={[styles.radio, isSelected && styles.radioSelected]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Paso 2: Detalles de la Solicitud */}
        <View style={styles.sectionCard}>
          <Text style={styles.stepTitle}>2. Detalles del Lugar y Asistencia</Text>
          <Text style={styles.stepSubtitle}>Indica dónde y qué actividades coordinarán durante el servicio.</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dirección o Lugar del Encuentro</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Residencia, Parque Central, Centro Comercial"
              placeholderTextColor="#94A3B8"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Instrucciones o Detalles Adicionales</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ej. Le gusta conversar sobre lectura, caminata suave de 30 minutos."
              placeholderTextColor="#94A3B8"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitBtn, loading && { opacity: 0.7 }]}
            onPress={handleConfirmRequest}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>
              {loading ? 'Enviando solicitud...' : 'Confirmar y Solicitar Acompañamiento'}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 24, alignItems: 'center' },
  header: { width: '100%', maxWidth: 700, flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { paddingRight: 16 },
  backButtonText: { fontSize: 15, fontWeight: '700', color: '#0284C7' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#102A43' },

  sectionCard: { width: '100%', maxWidth: 700, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  stepTitle: { fontSize: 18, fontWeight: '800', color: '#102A43', marginBottom: 4 },
  stepSubtitle: { fontSize: 13, color: '#627D98', marginBottom: 18 },

  companionList: { gap: 12 },
  cardItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 14, borderRadius: 16, borderWidth: 2, borderColor: '#E2E8F0' },
  cardItemSelected: { borderColor: '#0284C7', backgroundColor: '#E0F2FE' },
  photo: { width: 54, height: 54, borderRadius: 27, marginRight: 14 },
  infoContainer: { flex: 1 },
  companionName: { fontSize: 15, fontWeight: '800', color: '#102A43' },
  companionRole: { fontSize: 12, color: '#627D98', marginTop: 2 },
  companionRating: { fontSize: 11, color: '#D97706', fontWeight: '700', marginTop: 4 },

  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' },
  radioSelected: { borderColor: '#0284C7' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#0284C7' },

  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '700', color: '#334E68', marginBottom: 6 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#102A43' },
  textArea: { height: 80, textAlignVertical: 'top' },

  submitBtn: { backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  submitBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
});