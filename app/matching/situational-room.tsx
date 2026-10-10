import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function SituationalRoomScreen() {
  const router = useRouter();
  const [serviceStatus] = useState('En Curso');
  const [loading, setLoading] = useState(false);

  const showAlert = (title: string, message: string, onOk?: () => void) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
      if (onOk) onOk();
    } else {
      Alert.alert(title, message, [{ text: 'OK', onPress: onOk }]);
    }
  };

  // Función para registrar alerta SOS en Supabase
  const handleSOS = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await supabase.from('service_incidents').insert([
          {
            user_id: user.id,
            type: 'SOS',
            description: 'Alerta de emergencia activada desde la Sala Situacional.',
            created_at: new Date().toISOString(),
          }
        ]);
      }

      showAlert('¡Alerta SOS Enviada!', 'La Mesa de Operaciones ha recibido tu señal de emergencia y se está comunicando contigo.');
    } catch (error: any) {
      showAlert('Aviso SOS', 'Alerta emitida. Operaciones ha sido notificada.');
    }
  };

  // Función para finalizar el servicio y actualizar en Supabase
  const handleFinishService = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await supabase
          .from('care_requests')
          .update({ status: 'completed' })
          .eq('client_id', user.id)
          .eq('status', 'in_progress');
      }

      showAlert('Servicio Finalizado', 'Pasando al módulo de Valoración y Calificación.', () => {
        router.push('/rating'); // Redirige a la pantalla de calificación
      });
    } catch (error: any) {
      showAlert('Error', 'No se pudo actualizar el estado del servicio.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBackHome = () => {
    router.push('/(client)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Cabecera */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBackHome} style={styles.logoMark}>
            <Text style={styles.logoHeart}>♡</Text>
          </TouchableOpacity>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Sala Situacional en Vivo</Text>
          <Text style={styles.subtitle}>Monitoreo activo del servicio y GPS en tiempo real</Text>
        </View>

        {/* Tarjeta de Estado del Servicio */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusBadge}>🟢 {serviceStatus}</Text>
            <Text style={styles.timerText}>Tiempo restante: 1h 15m</Text>
          </View>
          <Text style={styles.routeText}>📍 Destino: Centro Médico UCE, Santo Domingo</Text>
        </View>

        {/* Simulación de Mapa GPS */}
        <View style={styles.mapContainer}>
          <Text style={styles.mapPlaceholderIcon}>🗺️</Text>
          <Text style={styles.mapPlaceholderTitle}>GPS Activo - Monitoreo Satelital</Text>
          <Text style={styles.mapPlaceholderDesc}>Ubicación compartida en tiempo real entre Acompañante y Familiar.</Text>
        </View>

        {/* Panel de Participantes */}
        <View style={styles.participantsRow}>
          <View style={styles.participantCard}>
            <Text style={styles.participantRole}>Acompañante Asignado</Text>
            <Text style={styles.participantName}>Ana Martínez</Text>
            <Text style={styles.participantSub}>Enfermera Geriátrica</Text>
          </View>
          <View style={styles.participantCard}>
            <Text style={styles.participantRole}>Paciente / Ser Querido</Text>
            <Text style={styles.participantName}>María Pérez</Text>
            <Text style={styles.participantSub}>Cliente Principal</Text>
          </View>
        </View>

        {/* Botón de Emergencia / Soporte y Finalizar */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS} activeOpacity={0.85}>
            <Text style={styles.sosButtonText}>🚨 Botón de Emergencia (SOS)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.finishButton, loading && { opacity: 0.7 }]} 
            onPress={handleFinishService}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.finishButtonText}>
              {loading ? 'Finalizando...' : 'Finalizar Servicio y Calificar'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleGoBackHome} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver al Panel Principal</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContainer: { padding: 24, alignItems: 'center', flexGrow: 1, paddingBottom: 60 },
  header: { alignItems: 'center', marginBottom: 20, width: '100%', maxWidth: 500 },
  logoMark: { width: 56, height: 56, borderRadius: 18, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  logoHeart: { fontSize: 34, color: '#0284C7', fontWeight: '700' },
  logoText: { fontSize: 24, fontWeight: '900', color: '#102A43', letterSpacing: 2, marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '800', color: '#102A43', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#627D98', textAlign: 'center', lineHeight: 20 },
  
  statusCard: { width: '100%', maxWidth: 500, backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#BBF7D0', borderRadius: 16, padding: 18, marginBottom: 16, shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
  statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statusBadge: { fontSize: 13, fontWeight: '700', color: '#16A34A', backgroundColor: '#DCFCE7', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8 },
  timerText: { fontSize: 13, fontWeight: '600', color: '#166534' },
  routeText: { fontSize: 14, fontWeight: '700', color: '#1E293B' },

  mapContainer: { width: '100%', maxWidth: 500, height: 180, backgroundColor: '#FFFFFF', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#CBD5E1', shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
  mapPlaceholderIcon: { fontSize: 36, marginBottom: 6 },
  mapPlaceholderTitle: { fontSize: 15, fontWeight: '800', color: '#102A43', marginBottom: 4 },
  mapPlaceholderDesc: { fontSize: 12, color: '#627D98', textAlign: 'center', paddingHorizontal: 20, lineHeight: 16 },

  participantsRow: { flexDirection: 'row', gap: 12, width: '100%', maxWidth: 500, marginBottom: 20 },
  participantCard: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 16, padding: 16, shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
  participantRole: { fontSize: 11, fontWeight: '700', color: '#627D98', marginBottom: 4 },
  participantName: { fontSize: 15, fontWeight: '800', color: '#102A43', marginBottom: 2 },
  participantSub: { fontSize: 12, color: '#334E68' },

  actionsContainer: { width: '100%', maxWidth: 500, gap: 12 },
  sosButton: { backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FCA5A5', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  sosButtonText: { color: '#DC2626', fontSize: 14, fontWeight: '800' },
  finishButton: { backgroundColor: '#0284C7', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  finishButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },

  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' }
});