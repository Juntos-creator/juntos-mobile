import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';
import { getActiveFamilyServices } from '../../src/services/clientService';

export default function FamilyPortalScreen(): React.JSX.Element {
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFamilyServices();
  }, []);

  const fetchFamilyServices = async () => {
    try {
      const data = await getActiveFamilyServices();
      setServices(data || []);
    } catch (error) {
      console.error('Error al obtener servicios familiares:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/auth/login');
    } catch (error: any) {
      if (Platform.OS === 'web') {
        window.alert('Error al cerrar sesión');
      } else {
        Alert.alert('Error', 'No se pudo cerrar sesión.');
      }
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabecera del Portal del Familiar */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.push('/(client)/home')} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#0066CC" />
          </TouchableOpacity>
          <View>
            <Text style={styles.welcomeText}>Portal Familiar</Text>
            <Text style={styles.subText}>Supervisión y Seguridad de tus Seres Queridos</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => router.push('/notifications/push-notifications')}
          >
            <Ionicons name="notifications-outline" size={22} color="#0066CC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.logoutChip} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tarjeta de Estado en Vivo / Resumen */}
      <View style={styles.liveCardBanner}>
        <View style={styles.rowBetween}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.liveDot} />
            <Text style={styles.liveBannerTitle}>Monitoreo Activo en Tiempo Real</Text>
          </View>
          <Text style={styles.liveBannerTime}>GPS OK</Text>
        </View>
        <Text style={styles.liveBannerSub}>
          {services.filter(s => s.status === 'in_progress' || s.status === 'pending').length} servicio(s) en curso o pendientes bajo supervisión.
        </Text>
      </View>

      {/* Acciones Rápidas */}
      <View style={styles.quickActionsRow}>
        <TouchableOpacity 
          style={styles.quickActionBtn} 
          onPress={() => router.push('/(client)/select-companion')}
        >
          <Ionicons name="add-circle-outline" size={20} color="#0066CC" />
          <Text style={styles.quickActionText}>Solicitar Acompañamiento</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickActionBtn} 
          onPress={() => router.push('/(client)/care-preferences')}
        >
          <Ionicons name="options-outline" size={20} color="#0066CC" />
          <Text style={styles.quickActionText}>Configurar Preferencias</Text>
        </TouchableOpacity>
      </View>

      {/* Listado de Servicios / Acompañamientos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estado de tus Solicitudes</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0066CC" style={{ marginVertical: 20 }} />
        ) : services.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No tienes solicitudes de acompañamiento registradas aún.</Text>
            <TouchableOpacity 
              style={styles.createServiceLink}
              onPress={() => router.push('/(client)/select-companion')}
            >
              <Text style={styles.createServiceLinkText}>+ Crear primera solicitud</Text>
            </TouchableOpacity>
          </View>
        ) : (
          services.map((item) => {
            const isPending = item.status === 'pending';
            const isInProgress = item.status === 'in_progress';
            const statusLabel = isPending ? 'Pendiente' : isInProgress ? 'En Curso' : 'Completado';
            const badgeBg = isInProgress ? '#E6F4EA' : isPending ? '#FEF3C7' : '#F1F3F4';
            const badgeColor = isInProgress ? '#137333' : isPending ? '#D97706' : '#5F6368';

            return (
              <View key={item.id} style={styles.serviceCard}>
                <View style={styles.rowBetween}>
                  <Text style={styles.seniorName}>{item.address}</Text>
                  <View style={[styles.badge, { backgroundColor: badgeBg }]}>
                    <Text style={[styles.badgeText, { color: badgeColor }]}>
                      {statusLabel}
                    </Text>
                  </View>
                </View>
                <Text style={styles.companionText}>
                  Acompañante: <Text style={{fontWeight: 'bold'}}>{item.companion?.full_name || 'Asignando acompañante...'}</Text>
                </Text>
                {item.notes ? (
                  <Text style={styles.routeText}>
                    <Ionicons name="document-text-outline" size={14} color="#666" /> {item.notes}
                  </Text>
                ) : null}
                
                <View style={styles.rowFooter}>
                  <Text style={styles.timeText}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </Text>
                  <TouchableOpacity 
                    style={styles.trackBtn}
                    onPress={() => router.push('/(client)/select-companion')}
                  >
                    <Ionicons name="location" size={14} color="#FFF" style={{marginRight: 4}} />
                    <Text style={styles.trackBtnText}>Ver Mapa GPS</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </View>

      {/* Botón de Contacto Rápido / Emergencia */}
      <TouchableOpacity 
        style={styles.emergencyButton}
        onPress={() => router.push('/chat/internal-chat')}
      >
        <Ionicons name="call" size={20} color="#FFF" style={{marginRight: 8}} />
        <Text style={styles.emergencyButtonText}>Contactar Mesa de Operaciones</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backBtn: { padding: 8, marginRight: 8, backgroundColor: '#E2E8F0', borderRadius: 8 },
  welcomeText: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  subText: { fontSize: 13, color: '#666' },
  notificationButton: { padding: 8, backgroundColor: '#E2E8F0', borderRadius: 8 },
  logoutChip: { padding: 8, backgroundColor: '#FEF2F2', borderRadius: 8, borderWidth: 1, borderColor: '#FCA5A5' },
  
  liveCardBanner: { backgroundColor: '#E6F4EA', padding: 16, borderRadius: 10, marginBottom: 16, borderWidth: 1, borderColor: '#CEEAD6' },
  liveDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#137333', marginRight: 8 },
  liveBannerTitle: { fontSize: 14, fontWeight: 'bold', color: '#137333' },
  liveBannerTime: { fontSize: 12, fontWeight: 'bold', color: '#137333' },
  liveBannerSub: { fontSize: 12, color: '#3c4043', marginTop: 6 },
  
  quickActionsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  quickActionBtn: { flex: 1, backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#CBD5E1', gap: 6 },
  quickActionText: { fontSize: 12, fontWeight: '700', color: '#0066CC' },

  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  serviceCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 1 },
  emptyCard: { backgroundColor: '#FFF', padding: 24, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  emptyText: { fontSize: 14, color: '#64748B', textAlign: 'center', marginBottom: 12 },
  createServiceLink: { backgroundColor: '#E0F2FE', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  createServiceLinkText: { fontSize: 13, fontWeight: '800', color: '#0284C7' },

  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seniorName: { fontSize: 15, fontWeight: 'bold', color: '#333', flex: 1, marginRight: 8 },
  companionText: { fontSize: 13, color: '#555', marginTop: 6 },
  routeText: { fontSize: 13, color: '#444', marginTop: 4, marginBottom: 10 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  badgeText: { fontSize: 11, fontWeight: 'bold' },
  rowFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 10, marginTop: 4 },
  timeText: { fontSize: 12, color: '#666' },
  trackBtn: { backgroundColor: '#0066CC', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  trackBtnText: { fontSize: 12, color: '#FFF', fontWeight: '600' },
  emergencyButton: { backgroundColor: '#DC3545', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 14, borderRadius: 10, marginBottom: 30, elevation: 2 },
  emergencyButtonText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' }
});