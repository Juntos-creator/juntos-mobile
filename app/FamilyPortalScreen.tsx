import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo para los servicios del familiar a cargo
const familyServicesData = [
  { id: '1', seniorName: 'Doña Carmen (Madre)', companion: 'Carlos Gómez', status: 'En Curso', route: 'Casa ➔ Médico (Piantini)', time: '45 min transcurridos' },
  { id: '2', seniorName: 'Don Ramón (Padre)', companion: 'Ana Martínez', status: 'Completado', route: 'Supermercado Nacional', time: 'Ayer, 3:00 PM' },
];

export default function FamilyPortalScreen() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  return (
    <ScrollView style={styles.container}>
      {/* Cabecera del Portal del Familiar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Portal Familiar</Text>
          <Text style={styles.subText}>Supervisión y Seguridad de tus Seres Queridos</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={22} color="#0066CC" />
        </TouchableOpacity>
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
        <Text style={styles.liveBannerSub}>1 servicio en curso actualmente bajo supervisión.</Text>
      </View>

      {/* Listado de Familiares / Acompañamientos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estado de tus Familiares</Text>
        {familyServicesData.map((item) => (
          <View key={item.id} style={styles.serviceCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.seniorName}>{item.seniorName}</Text>
              <View style={[
                styles.badge, 
                { backgroundColor: item.status === 'En Curso' ? '#E6F4EA' : '#F1F3F4' }
              ]}>
                <Text style={[
                  styles.badgeText, 
                  { color: item.status === 'En Curso' ? '#137333' : '#5F6368' }
                ]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <Text style={styles.companionText}>Companion asignado: <Text style={{fontWeight: 'bold'}}>{item.companion}</Text></Text>
            <Text style={styles.routeText}><Ionicons name="navigate-outline" size={14} color="#666" /> {item.route}</Text>
            
            <View style={styles.rowFooter}>
              <Text style={styles.timeText}>{item.time}</Text>
              <TouchableOpacity style={styles.trackBtn}>
                <Ionicons name="location" size={14} color="#FFF" style={{marginRight: 4}} />
                <Text style={styles.trackBtnText}>Ver Mapa GPS</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Botón de Contacto Rápido / Emergencia */}
      <TouchableOpacity style={styles.emergencyButton}>
        <Ionicons name="call" size={20} color="#FFF" style={{marginRight: 8}} />
        <Text style={styles.emergencyButtonText}>Contactar Mesa de Operaciones</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  welcomeText: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  subText: { fontSize: 14, color: '#666' },
  notificationButton: { padding: 8, backgroundColor: '#E2E8F0', borderRadius: 8 },
  liveCardBanner: { backgroundColor: '#E6F4EA', padding: 16, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#CEEAD6' },
  liveDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#137333', marginRight: 8 },
  liveBannerTitle: { fontSize: 14, fontWeight: 'bold', color: '#137333' },
  liveBannerTime: { fontSize: 12, fontWeight: 'bold', color: '#137333' },
  liveBannerSub: { fontSize: 12, color: '#3c4043', marginTop: 6 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  serviceCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seniorName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
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