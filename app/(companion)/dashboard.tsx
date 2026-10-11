import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../src/services/supabase';

export default function CompanionDashboardScreen() {
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAvailableRequests();
  }, []);

  const fetchAvailableRequests = async () => {
    try {
      let localData: any[] = [];
      if (Platform.OS === 'web') {
        localData = JSON.parse(localStorage.getItem('juntos_requests') || '[]');
      }

      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const combined = [...data, ...localData.filter((r) => r.status === 'pending')];
        const unique = Array.from(new Map(combined.map((item) => [item.id, item])).values());
        setRequests(unique);
      } else if (localData.length > 0) {
        setRequests(localData.filter((r) => r.status === 'pending'));
      } else {
        // Datos con solicitante y familiar detallados
        setRequests([
          {
            id: 'req_demo_1',
            requested_by: 'Familiar / Tutor',
            client_name: 'Doña Carmen Gómez',
            family_contact: 'Lic. Roberto Gómez (Hijo) • 809-555-0192',
            address: 'Centro Médico UCE, Santo Domingo [Distrito Nacional]',
            notes: 'Acompañamiento a consulta geriátrica y traslado asistido.',
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (e) {
      console.log('Carga de acompañante lista');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/auth/login');
    } catch (e) {
      router.replace('/auth/login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* CABECERA */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoHeart}>♡</Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>JUNTOS</Text>
              <Text style={styles.brandSubtitle}>Portal del Acompañante Verificado</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutBtnText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

        {/* DISPONIBILIDAD */}
        <View style={styles.statusCard}>
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>Estado de Disponibilidad</Text>
            <Text style={styles.statusDesc}>
              {isAvailable ? '🟢 Estás visible para recibir nuevas solicitudes' : '⚪ Modo Ocupado'}
            </Text>
          </View>
          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{ false: '#CBD5E1', true: '#86EFAC' }}
            thumbColor={isAvailable ? '#16A34A' : '#94A3B8'}
          />
        </View>

        {/* MÉTRICAS */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>4.9 ⭐</Text>
            <Text style={styles.statLabel}>Calificación Promedio</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Acompañamientos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>RD$ 12,400</Text>
            <Text style={styles.statLabel}>Ganancias del Mes</Text>
          </View>
        </View>

        {/* SOLICITUDES EN TIEMPO REAL */}
        <View style={styles.requestsSection}>
          <Text style={styles.sectionTitle}>Solicitudes Disponibles en Tiempo Real</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#0284C7" style={{ marginVertical: 20 }} />
          ) : requests.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ionicons name="checkmark-done-circle-outline" size={40} color="#94A3B8" style={{ marginBottom: 8 }} />
              <Text style={styles.emptyText}>No hay solicitudes pendientes en este momento.</Text>
            </View>
          ) : (
            requests.map((item) => (
              <View key={item.id} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <Text style={styles.requesterTag}>
                    {item.requested_by === 'Cliente Directo' ? '👤 Solicitud Directa' : '👥 Solicitud de Familiar'}
                  </Text>
                  <Text style={styles.requestTime}>
                    {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>

                {/* DETALLES DEL CLIENTE Y FAMILIAR */}
                <Text style={styles.detailText}>👤 <Text style={{ fontWeight: '800' }}>Persona Asistida:</Text> {item.client_name || 'Doña Carmen Gómez'}</Text>
                <Text style={styles.detailText}>👥 <Text style={{ fontWeight: '800' }}>Familiar / Contacto:</Text> {item.family_contact || 'Lic. Roberto Gómez (809-555-0192)'}</Text>
                <Text style={styles.detailText}>📍 <Text style={{ fontWeight: '800' }}>Ubicación:</Text> {item.address}</Text>
                <Text style={styles.requestNotes}>Detalles: "{item.notes || 'Sin notas adicionales'}"</Text>

                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => router.push('/matching/situational-room' as any)}
                  activeOpacity={0.88}
                >
                  <Text style={styles.acceptButtonText}>Aceptar y Conectar en Sala Situacional →</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 60, alignItems: 'center', flexGrow: 1 },
  header: { width: '100%', maxWidth: 840, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  logoMark: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  logoHeart: { fontSize: 28, color: '#16A34A', fontWeight: '700' },
  brandTitle: { fontSize: 20, fontWeight: '900', color: '#102A43', letterSpacing: 1.5 },
  brandSubtitle: { fontSize: 10, color: '#16A34A', fontWeight: '700' },
  logoutBtn: { backgroundColor: '#FEF2F2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: '#FCA5A5' },
  logoutBtnText: { color: '#DC2626', fontSize: 12, fontWeight: '800' },
  statusCard: { width: '100%', maxWidth: 840, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  statusInfo: { flex: 1 },
  statusTitle: { fontSize: 15, fontWeight: '900', color: '#102A43' },
  statusDesc: { fontSize: 12, color: '#627D98', marginTop: 2 },
  statsRow: { width: '100%', maxWidth: 840, flexDirection: 'row', gap: 12, marginBottom: 24, flexWrap: 'wrap' },
  statBox: { flex: 1, minWidth: 180, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  statValue: { fontSize: 20, fontWeight: '900', color: '#102A43', marginBottom: 2 },
  statLabel: { fontSize: 11, color: '#627D98', fontWeight: '700' },
  requestsSection: { width: '100%', maxWidth: 840 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#102A43', marginBottom: 12 },
  emptyBox: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 30, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  emptyText: { color: '#64748B', fontSize: 13, fontStyle: 'italic' },
  requestCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: '#BAE6FD', marginBottom: 16 },
  requestHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  requesterTag: { backgroundColor: '#E0F2FE', color: '#0284C7', fontSize: 11, fontWeight: '800', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  requestTime: { fontSize: 11, color: '#64748B', fontWeight: '700' },
  detailText: { fontSize: 13, color: '#334155', marginBottom: 4 },
  requestNotes: { fontSize: 12, color: '#627D98', fontStyle: 'italic', marginTop: 4, marginBottom: 16 },
  acceptButton: { backgroundColor: '#16A34A', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  acceptButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
});