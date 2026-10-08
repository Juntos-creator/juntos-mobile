import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo para servicios activos y alertas en tiempo real
const activeServicesData = [
  { id: '1', client: 'María Pérez', companion: 'Carlos Gómez', status: 'En curso', location: 'Piantini, Sto. Domingo', time: '45 min' },
  { id: '2', client: 'José Rodríguez', companion: 'Ana Martínez', status: 'En destino', location: 'Naco, Sto. Domingo', time: '1h 20m' },
];

const alertData = [
  { id: 'a1', type: 'SOS / Retraso', message: 'Companion Carlos Gómez reporta desvío de ruta menor.', time: 'Hace 5 min' }
];

export default function AdminDashboardScreen() {
  const [activeTab, setActiveTab] = useState<'monitoring' | 'alerts'>('monitoring');

  return (
    <ScrollView style={styles.container}>
      {/* Cabecera del Panel */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Mesa de Operaciones</Text>
          <Text style={styles.subText}>Centro de Control y Monitoreo Global</Text>
        </View>
        <TouchableOpacity style={styles.refreshButton}>
          <Ionicons name="refresh" size={22} color="#0066CC" />
        </TouchableOpacity>
      </View>

      {/* Tarjetas de Métricas Clave (KPIs) */}
      <View style={styles.metricsContainer}>
        <View style={[styles.cardMetric, { borderLeftColor: '#28A745' }]}>
          <Text style={styles.metricNumber}>12</Text>
          <Text style={styles.metricLabel}>Servicios Activos</Text>
        </View>
        <View style={[styles.cardMetric, { borderLeftColor: '#FFC107' }]}>
          <Text style={styles.metricNumber}>28</Text>
          <Text style={styles.metricLabel}>Companions Libres</Text>
        </View>
        <View style={[styles.cardMetric, { borderLeftColor: '#DC3545' }]}>
          <Text style={styles.metricNumber}>1</Text>
          <Text style={styles.metricLabel}>Alerta Activa</Text>
        </View>
      </View>

      {/* Navegación por pestañas internas */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'monitoring' && styles.activeTabButton]}
          onPress={() => setActiveTab('monitoring')}
        >
          <Text style={[styles.tabText, activeTab === 'monitoring' && styles.activeTabText]}>Monitoreo GPS</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'alerts' && styles.activeTabButton]}
          onPress={() => setActiveTab('alerts')}
        >
          <Text style={[styles.tabText, activeTab === 'alerts' && styles.activeTabText]}>Centro de Alertas</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido según la pestaña */}
      {activeTab === 'monitoring' ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acompañamientos en Vivo</Text>
          {activeServicesData.map((item) => (
            <View key={item.id} style={styles.serviceCard}>
              <View style={styles.rowBetween}>
                <Text style={styles.clientName}>{item.client}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
              <Text style={styles.companionText}>Companion: {item.companion}</Text>
              <View style={styles.rowBetween}>
                <Text style={styles.locationText}><Ionicons name="location-outline" size={14} /> {item.location}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Incidentes y Alertas Recientes</Text>
          {alertData.map((alert) => (
            <View key={alert.id} style={styles.alertCard}>
              <Ionicons name="warning" size={24} color="#DC3545" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.alertTitle}>{alert.type}</Text>
                <Text style={styles.alertMessage}>{alert.message}</Text>
                <Text style={styles.timeText}>{alert.time}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  welcomeText: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  subText: { fontSize: 14, color: '#666' },
  refreshButton: { padding: 8, backgroundColor: '#E2E8F0', borderRadius: 8 },
  metricsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  cardMetric: { flex: 1, backgroundColor: '#FFF', padding: 12, borderRadius: 8, marginHorizontal: 4, borderLeftWidth: 4, elevation: 2 },
  metricNumber: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  metricLabel: { fontSize: 11, color: '#666', marginTop: 4 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#E2E8F0', borderRadius: 8, padding: 4, marginBottom: 20 },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 6 },
  activeTabButton: { backgroundColor: '#FFF', elevation: 1 },
  tabText: { fontSize: 14, color: '#666', fontWeight: '600' },
  activeTabText: { color: '#0066CC' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  serviceCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 10, marginBottom: 10, elevation: 1 },
  alertCard: { flexDirection: 'row', backgroundColor: '#FFF', padding: 16, borderRadius: 10, marginBottom: 10, alignItems: 'center', elevation: 1, borderLeftWidth: 4, borderLeftColor: '#DC3545' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  clientName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  companionText: { fontSize: 13, color: '#444', marginTop: 2 },
  locationText: { fontSize: 12, color: '#666' },
  timeText: { fontSize: 12, color: '#999' },
  statusBadge: { backgroundColor: '#E6F4EA', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusText: { color: '#137333', fontSize: 12, fontWeight: 'bold' },
  alertTitle: { fontSize: 14, fontWeight: 'bold', color: '#DC3545' },
  alertMessage: { fontSize: 13, color: '#333', marginVertical: 2 }
});