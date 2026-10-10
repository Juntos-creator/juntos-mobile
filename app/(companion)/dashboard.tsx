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
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function CompanionDashboard() {
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    fetchServiceRequests();
  }, []);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const fetchServiceRequests = async () => {
    try {
      // Cargar solicitudes pendientes o activas
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setRequests(data);
    } catch (error) {
      console.error('Error al cargar solicitudes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('service_requests')
        .update({
          companion_id: user.id,
          status: 'in_progress',
        })
        .eq('id', requestId);

      if (error) throw error;

      showAlert('¡Servicio Aceptado!', 'Se ha asignado el acompañamiento a tu cuenta.');
      fetchServiceRequests();
    } catch (error: any) {
      showAlert('Error', error.message || 'No se pudo aceptar la solicitud.');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/auth/login');
    } catch (error) {
      showAlert('Error', 'No se pudo cerrar sesión.');
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
              <Text style={styles.brandSubtitle}>Portal de Acompañante Verificado</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutChip} onPress={handleLogout}>
            <Text style={styles.logoutChipText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

        {/* CONTROLES DE ESTADO Y DISPONIBILIDAD */}
        <View style={styles.availabilityCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.availabilityTitle}>Estado de Disponibilidad</Text>
            <Text style={styles.availabilitySubtitle}>
              {isAvailable ? '🟢 Estás visible para recibir nuevas solicitudes' : '🔴 En pausa (No recibirás alertas)'}
            </Text>
          </View>
          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{ false: '#CBD5E1', true: '#A7F3D0' }}
            thumbColor={isAvailable ? '#059669' : '#94A3B8'}
          />
        </View>

        {/* TARJETAS DE RESUMEN DE MÉTRICAS */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.9 ⭐</Text>
            <Text style={styles.statLabel}>Calificación</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Completados</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>RD$ 12,400</Text>
            <Text style={styles.statLabel}>Ganancias Mes</Text>
          </View>
        </View>

        {/* SECCIÓN DE SOLICITUDES ENTRANTES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Solicitudes Disponibles</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#059669" style={{ marginVertical: 20 }} />
          ) : requests.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No hay solicitudes pendientes en este momento.</Text>
            </View>
          ) : (
            requests.map((item) => {
              const isPending = item.status === 'pending';
              return (
                <View key={item.id} style={styles.requestCard}>
                  <View style={styles.requestHeader}>
                    <Text style={styles.requestAddress}>📍 {item.address}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: isPending ? '#FEF3C7' : '#D1FAE5' }]}>
                      <Text style={[styles.statusBadgeText, { color: isPending ? '#D97706' : '#059669' }]}>
                        {isPending ? 'Pendiente' : 'En Curso'}
                      </Text>
                    </View>
                  </View>

                  {item.notes ? (
                    <Text style={styles.requestNotes}>Notas: {item.notes}</Text>
                  ) : null}

                  <Text style={styles.requestTime}>
                    Fecha: {new Date(item.created_at).toLocaleDateString()}
                  </Text>

                  {isPending && (
                    <TouchableOpacity
                      style={styles.acceptBtn}
                      onPress={() => handleAcceptRequest(item.id)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.acceptBtnText}>Aceptar Acompañamiento</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 50, alignItems: 'center' },

  header: {
    width: '100%',
    maxWidth: 900,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  logoMark: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#D1FAE5', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  logoHeart: { fontSize: 26, color: '#059669', fontWeight: '700' },
  brandTitle: { fontSize: 20, fontWeight: '900', color: '#064E3B', letterSpacing: 1.5 },
  brandSubtitle: { fontSize: 11, color: '#059669', fontWeight: '700' },
  logoutChip: { backgroundColor: '#FEF2F2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: '#FCA5A5' },
  logoutChipText: { fontSize: 12, color: '#DC2626', fontWeight: '800' },

  availabilityCard: {
    width: '100%',
    maxWidth: 900,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#064E3B',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  availabilityTitle: { fontSize: 16, fontWeight: '800', color: '#064E3B', marginBottom: 2 },
  availabilitySubtitle: { fontSize: 12, color: '#475569' },

  statsGrid: { width: '100%', maxWidth: 900, flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  statValue: { fontSize: 18, fontWeight: '900', color: '#064E3B', marginBottom: 4 },
  statLabel: { fontSize: 11, fontWeight: '700', color: '#64748B' },

  section: { width: '100%', maxWidth: 900 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#064E3B', marginBottom: 14 },
  emptyCard: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  emptyText: { color: '#64748B', fontSize: 13, fontStyle: 'italic' },

  requestCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  requestHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  requestAddress: { fontSize: 15, fontWeight: '800', color: '#0F172A', flex: 1, marginRight: 8 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusBadgeText: { fontSize: 11, fontWeight: '800' },
  requestNotes: { fontSize: 13, color: '#334155', fontStyle: 'italic', marginBottom: 8 },
  requestTime: { fontSize: 11, color: '#94A3B8', marginBottom: 12 },

  acceptBtn: { backgroundColor: '#059669', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  acceptBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});