import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';

export default function SituationalRoomScreen() {
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
            <Text style={styles.statusBadge}>🟢 En Curso</Text>
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
          <TouchableOpacity style={styles.sosButton} onPress={() => alert('¡Alerta SOS enviada a la Mesa de Operaciones!')}>
            <Text style={styles.sosButtonText}>🚨 Botón de Emergencia (SOS)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.finishButton} onPress={() => alert('Servicio finalizado. Pasando a módulo de Valoración.')}>
            <Text style={styles.finishButtonText}>Finalizar Servicio y Calificar</Text>
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