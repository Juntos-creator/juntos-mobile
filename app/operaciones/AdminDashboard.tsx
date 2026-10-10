import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../src/services/supabase';

export default function AdminDashboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'monitoring' | 'alerts'>('monitoring');
  const [activeServices, setActiveServices] = useState<any[]>([]);
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // 1. Cargar servicios activos (ej: estado 'in_progress' o 'active')
      const { data: servicesData, error: servicesError } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (servicesError) throw servicesError;
      if (servicesData) setActiveServices(servicesData);

      // 2. Cargar incidentes o alertas SOS
      const { data: incidentsData, error: incidentsError } = await supabase
        .from('service_incidents')
        .select('*')
        .order('created_at', { ascending: false });

      if (incidentsError) throw incidentsError;
      if (incidentsData) setIncidents(incidentsData);

    } catch (error: any) {
      console.error('Error al cargar datos de operaciones:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchAdminData();
    showAlert('Actualizado', 'Datos de la mesa de operaciones sincronizados.');
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
        
        {/* Cabecera del Panel */}
        <View style={styles.header}>
          <View>
            <TouchableOpacity onPress={handleGoBackHome} style={styles.logoMark}>
              <Text style={styles.logoHeart}>♡</Text>
            </TouchableOpacity>
            <Text style={styles.welcomeText}>Mesa de Operaciones</Text>
            <Text style={styles.subText}>Centro de Control y Monitoreo Global</Text>
          </View>
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh} activeOpacity={0.85}>
            <Ionicons name="refresh" size={22} color="#0284C7" />
          </TouchableOpacity>
        </View>

        {/* Tarjetas de Métricas Clave (KPIs) */}
        <View style={styles.metricsContainer}>
          <View style={[styles.cardMetric, { borderLeftColor: '#16A34A' }]}>
            <Text style={styles.metricNumber}>{activeServices.length}</Text>
            <Text style={styles.metricLabel}>Servicios Registrados</Text>
          </View>
          <View style={[styles.cardMetric, { borderLeftColor: '#0284C7' }]}>
            <Text style={styles.metricNumber}>28</Text>
            <Text style={styles.metricLabel}>Companions Libres</Text>
          </View>
          <View style={[styles.cardMetric, { borderLeftColor: '#DC2626' }]}>
            <Text style={styles.metricNumber}>{incidents.length}</Text>
            <Text style={styles.metricLabel}>Alertas Activas</Text>
          </View>
        </View>

        {/* Navegación por pestañas internas */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'monitoring' && styles.activeTabButton]}
            onPress={() => setActiveTab('monitoring')}
            activeOpacity={0.85}
          >
            <Text style={[styles.tabText, activeTab === 'monitoring' && styles.activeTabText]}>Monitoreo GPS</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'alerts' && styles.activeTabButton]}
            onPress={() => setActiveTab('alerts')}
            activeOpacity={0.85}
          >
            <Text style={[styles.tabText, activeTab === 'alerts' && styles.activeTabText]}>Centro de Alertas</Text>
          </TouchableOpacity>
        </View>

        {/* Contenido según la pestaña */}
        {activeTab === 'monitoring' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Acompañamientos en Vivo</Text>
            {loading ? (
              <Text style={styles.emptyText}>Cargando servicios...</Text>
            ) : activeServices.length === 0 ? (
              <Text style={styles.emptyText}>No hay servicios activos en este momento.</Text>
            ) : (
              activeServices.map((item) => (
                <View key={item.id} style={styles.serviceCard}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.clientName}>{item.service_type || 'Acompañamiento Geriátrico'}</Text>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>{item.status || 'En curso'}</Text>
                    </View>
                  </View>
                  <Text style={styles.companionText}>Destino: {item.address || 'Santo Domingo'}</Text>
                  <View style={styles.rowBetween}>
                    <Text style={styles.locationText}>
                      <Ionicons name="location-outline" size={14} color="#627D98" /> {item.notes || 'Ruta supervisada'}
                    </Text>
                    <Text style={styles.timeText}>{new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Incidentes y Alertas Recientes</Text>
            {loading ? (
              <Text style={styles.emptyText}>Cargando alertas...</Text>
            ) : incidents.length === 0 ? (
              <Text style={styles.emptyText}>No hay alertas ni incidentes registrados.</Text>
            ) : (
              incidents.map((alert) => (
                <View key={alert.id} style={styles.alertCard}>
                  <Ionicons name="warning" size={24} color="#DC2626" style={{ marginRight: 12 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.alertTitle}>Alerta: {alert.type}</Text>
                    <Text style={styles.alertMessage}>{alert.description}</Text>
                    <Text style={styles.timeText}>{new Date(alert.created_at).toLocaleString()}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        <TouchableOpacity onPress={handleGoBackHome} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver al Panel Principal</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContainer: { padding: 24, flexGrow: 1, paddingBottom: 60 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, width: '100%' },
  logoMark: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  logoHeart: { fontSize: 24, color: '#0284C7', fontWeight: '700' },
  welcomeText: { fontSize: 22, fontWeight: '900', color: '#102A43' },
  subText: { fontSize: 13, color: '#627D98', marginTop: 2 },
  refreshButton: { padding: 10, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1', shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },

  metricsContainer: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  cardMetric: { flex: 1, backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, borderLeftWidth: 4, shadowColor: '#102A43', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, borderWidth: 1, borderColor: '#E2E8F0' },
  metricNumber: { fontSize: 22, fontWeight: '900', color: '#102A43' },
  metricLabel: { fontSize: 11, color: '#627D98', marginTop: 4, fontWeight: '600' },

  tabContainer: { flexDirection: 'row', backgroundColor: '#E2E8F0', borderRadius: 12, padding: 4, marginBottom: 24 },
  tabButton: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10 },
  activeTabButton: { backgroundColor: '#FFFFFF', shadowColor: '#102A43', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  tabText: { fontSize: 13, color: '#627D98', fontWeight: '700' },
  activeTabText: { color: '#0284C7' },

  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#102A43', marginBottom: 14 },
  emptyText: { textAlign: 'center', color: '#627D98', fontStyle: 'italic', marginTop: 12, fontSize: 13 },

  serviceCard: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 16, marginBottom: 12, shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1, borderWidth: 1, borderColor: '#E2E8F0' },
  alertCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 18, borderRadius: 16, marginBottom: 12, alignItems: 'center', shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1, borderLeftWidth: 4, borderLeftColor: '#DC2626', borderWidth: 1, borderColor: '#E2E8F0' },
  
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  clientName: { fontSize: 15, fontWeight: '800', color: '#102A43' },
  companionText: { fontSize: 13, color: '#334E68', marginTop: 4, fontWeight: '600' },
  locationText: { fontSize: 12, color: '#627D98' },
  timeText: { fontSize: 11, color: '#94A3B8', fontWeight: '600' },
  
  statusBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { color: '#16A34A', fontSize: 11, fontWeight: '800' },
  
  alertTitle: { fontSize: 14, fontWeight: '800', color: '#DC2626' },
  alertMessage: { fontSize: 13, color: '#334E68', marginVertical: 2, lineHeight: 18 },

  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' }
});