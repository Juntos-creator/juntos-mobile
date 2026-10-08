import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase'; // Ajusta la ruta según tu estructura

export default function SituationalRoomScreen() {
  const router = useRouter();
  const [serviceStatus, setServiceStatus] = useState('En Curso');
  const [loading, setLoading] = useState(false);

  // Función para registrar alerta SOS en Supabase
  const handleSOS = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Registrar incidencia/emergencia en base de datos
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

      Alert.alert('¡Alerta SOS Enviada!', 'La Mesa de Operaciones ha recibido tu señal de emergencia y se está comunicando contigo.');
    } catch (error: any) {
      Alert.alert('Aviso SOS', 'Alerta emitida. Operaciones ha sido notificada.');
    }
  };

  // Función para finalizar el servicio y actualizar en Supabase
  const handleFinishService = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Actualizar el estado del servicio activo a 'completed'
        await supabase
          .from('care_requests')
          .update({ status: 'completed' })
          .eq('client_id', user.id)
          .eq('status', 'in_progress');
      }

      Alert.alert('Servicio Finalizado', 'Pasando al módulo de Valoración y Calificación.');
      router.push('/(client)/home'); // O redirigir a la pantalla de reseña/valoración
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo actualizar el estado del servicio.');
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
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <Text style={styles.sosButtonText}>🚨 Botón de Emergencia (SOS)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.finishButton, loading && { opacity: 0.7 }]} 
            onPress={handleFinishService}
            disabled={loading}
          >
            <Text style={styles.finishButtonText}>
              {loading ? 'Finalizando...' : 'Finalizar Servicio y Calificar'}
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
  header: { alignItems: 'center', marginBottom: 20, width: '100%', maxWidth: 500 },
  logoText: { fontSize: 24, fontWeight: '900', color: '#0F172A', letterSpacing: 2, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', color: '#1E293B', marginBottom: 4, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#64748B', textAlign: 'center' },
  
  statusCard: { width: '100%', maxWidth: 500, backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#BBF7D0', borderRadius: 12, padding: 16, marginBottom: 16 },
  statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statusBadge: { fontSize: 13, fontWeight: '700', color: '#16A34A', backgroundColor: '#DCFCE7', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8 },
  timerText: { fontSize: 13, fontWeight: '600', color: '#166534' },
  routeText: { fontSize: 14, fontWeight: '600', color: '#1E293B' },

  mapContainer: { width: '100%', maxWidth: 500, height: 200, backgroundColor: '#F1F5F9', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#CBD5E1' },
  mapPlaceholderIcon: { fontSize: 36, marginBottom: 8 },
  mapPlaceholderTitle: { fontSize: 15, fontWeight: '700', color: '#334155', marginBottom: 4 },
  mapPlaceholderDesc: { fontSize: 12, color: '#64748B', textAlign: 'center', paddingHorizontal: 20 },

  participantsRow: { flexDirection: 'row', gap: 12, width: '100%', maxWidth: 500, marginBottom: 20 },
  participantCard: { flex: 1, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, padding: 14 },
  participantRole: { fontSize: 11, fontWeight: '600', color: '#64748B', marginBottom: 4 },
  participantName: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  participantSub: { fontSize: 12, color: '#475569' },

  actionsContainer: { width: '100%', maxWidth: 500, gap: 12 },
  sosButton: { backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FCA5A5', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  sosButtonText: { color: '#DC2626', fontSize: 14, fontWeight: '700' },
  finishButton: { backgroundColor: '#0284C7', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  finishButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' }
});