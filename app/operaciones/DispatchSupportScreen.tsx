import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo para tickets de soporte y llamadas en curso
const dispatchTicketsData = [
  { id: '1', ticketId: 'INC-402', companion: 'Carlos Gómez', client: 'María Pérez', issue: 'Retraso por tráfico en Av. Winston Churchill', priority: 'Media', time: 'Hace 8 min' },
  { id: '2', ticketId: 'INC-403', companion: 'Ana Martínez', client: 'José Rodríguez', issue: 'Solicitud de asistencia telefónica por duda en dirección', priority: 'Baja', time: 'Hace 15 min' },
];

export default function DispatchSupportScreen() {
  const router = useRouter();
  const [tickets, setTickets] = useState(dispatchTicketsData);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleCallCompanion = (companionName: string) => {
    showAlert('Llamada en curso', `Estableciendo comunicación con la central y el acompañante ${companionName}...`);
  };

  const handleResolveTicket = (ticketId: string) => {
    setTickets(prev => prev.filter(t => t.id !== ticketId));
    showAlert('Ticket Resuelto', `El incidente ${ticketId} ha sido marcado como solucionado y archivado.`);
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
        
        {/* Cabecera de la Mesa de Ayuda */}
        <View style={styles.header}>
          <View>
            <TouchableOpacity onPress={handleGoBackHome} style={styles.logoMark}>
              <Text style={styles.logoHeart}>♡</Text>
            </TouchableOpacity>
            <Text style={styles.welcomeText}>Mesa de Ayuda / Dispatch</Text>
            <Text style={styles.subText}>Centro de Operaciones y Triage de Incidentes</Text>
          </View>
          <TouchableOpacity 
            style={styles.callButton} 
            onPress={() => showAlert('Central de Operaciones', 'Línea de soporte directo activa.')}
            activeOpacity={0.85}
          >
            <Ionicons name="headset" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Tarjetas de Métricas de Soporte */}
        <View style={styles.metricsContainer}>
          <View style={[styles.cardMetric, { borderLeftColor: '#0284C7' }]}>
            <Text style={styles.metricNumber}>{tickets.length}</Text>
            <Text style={styles.metricLabel}>Tickets Activos</Text>
          </View>
          <View style={[styles.cardMetric, { borderLeftColor: '#16A34A' }]}>
            <Text style={styles.metricNumber}>1.8 min</Text>
            <Text style={styles.metricLabel}>Tiempo Resp. Promedio</Text>
          </View>
        </View>

        {/* Listado de Tickets y Llamadas de Campo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Incidentes Activos en Campo</Text>
          
          {tickets.length === 0 ? (
            <Text style={styles.emptyText}>No hay incidentes activos en este momento.</Text>
          ) : (
            tickets.map((ticket) => (
              <View key={ticket.id} style={styles.ticketCard}>
                <View style={styles.rowBetween}>
                  <Text style={styles.ticketIdText}>{ticket.ticketId}</Text>
                  <View style={[
                    styles.badge, 
                    { backgroundColor: ticket.priority === 'Media' ? '#FEF7E0' : '#DCFCE7' }
                  ]}>
                    <Text style={[
                      styles.badgeText, 
                      { color: ticket.priority === 'Media' ? '#B06000' : '#16A34A' }
                    ]}>
                      Prioridad {ticket.priority}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.partyText}>Companion: <Text style={{fontWeight: 'bold', color: '#102A43'}}>{ticket.companion}</Text></Text>
                <Text style={styles.partyText}>Cliente: <Text style={{fontWeight: 'bold', color: '#102A43'}}>{ticket.client}</Text></Text>
                <Text style={styles.issueText}>{ticket.issue}</Text>
                
                <View style={styles.rowFooter}>
                  <Text style={styles.timeText}>{ticket.time}</Text>
                  <View style={{flexDirection: 'row', gap: 8}}>
                    <TouchableOpacity 
                      style={[styles.actionBtn, {backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1'}]}
                      onPress={() => handleCallCompanion(ticket.companion)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.actionBtnText, {color: '#0284C7'}]}>Llamar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.actionBtn, {backgroundColor: '#16A34A'}]}
                      onPress={() => handleResolveTicket(ticket.id)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.actionBtnText, {color: '#FFF'}]}>Resolver</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
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
  scrollContainer: { padding: 24, flexGrow: 1, paddingBottom: 60 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, width: '100%' },
  logoMark: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  logoHeart: { fontSize: 24, color: '#0284C7', fontWeight: '700' },
  welcomeText: { fontSize: 22, fontWeight: '900', color: '#102A43' },
  subText: { fontSize: 13, color: '#627D98', marginTop: 2 },
  
  callButton: { backgroundColor: '#0284C7', padding: 12, borderRadius: 12, justifyContent: 'center', alignItems: 'center', shadowColor: '#102A43', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  
  metricsContainer: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  cardMetric: { flex: 1, backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, borderLeftWidth: 4, shadowColor: '#102A43', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, borderWidth: 1, borderColor: '#E2E8F0' },
  metricNumber: { fontSize: 22, fontWeight: '900', color: '#102A43' },
  metricLabel: { fontSize: 11, color: '#627D98', marginTop: 4, fontWeight: '600' },
  
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#102A43', marginBottom: 14 },
  emptyText: { textAlign: 'center', color: '#627D98', fontStyle: 'italic', marginTop: 12, fontSize: 13 },
  
  ticketCard: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 16, marginBottom: 12, shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1, borderWidth: 1, borderColor: '#E2E8F0' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ticketIdText: { fontSize: 15, fontWeight: '800', color: '#102A43' },
  partyText: { fontSize: 13, color: '#627D98', marginTop: 4 },
  issueText: { fontSize: 13, color: '#334E68', marginTop: 8, marginBottom: 12, fontStyle: 'italic', lineHeight: 18 },
  
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '800' },
  
  rowFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 12, marginTop: 4 },
  timeText: { fontSize: 11, color: '#94A3B8', fontWeight: '600' },
  
  actionBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  actionBtnText: { fontSize: 12, fontWeight: '800' },

  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' }
});