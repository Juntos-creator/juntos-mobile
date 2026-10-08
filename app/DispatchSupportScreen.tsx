import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo para tickets de soporte y llamadas en curso
const dispatchTicketsData = [
  { id: '1', ticketId: 'INC-402', companion: 'Carlos Gómez', client: 'María Pérez', issue: 'Retraso por tráfico en Av. Winston Churchill', priority: 'Media', time: 'Hace 8 min' },
  { id: '2', ticketId: 'INC-403', companion: 'Ana Martínez', client: 'José Rodríguez', issue: 'Solicitud de asistencia telefónica por duda en dirección', priority: 'Baja', time: 'Hace 15 min' },
];

export default function DispatchSupportScreen() {
  const [activeTab, setActiveTab] = useState<'tickets' | 'calls'>('tickets');

  return (
    <ScrollView style={styles.container}>
      {/* Cabecera de la Mesa de Ayuda */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Mesa de Ayuda / Dispatch</Text>
          <Text style={styles.subText}>Centro de Operaciones y Triage de Incidentes</Text>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Ionicons name="headset" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Tarjetas de Métricas de Soporte */}
      <View style={styles.metricsContainer}>
        <View style={[styles.cardMetric, { borderLeftColor: '#0066CC' }]}>
          <Text style={styles.metricNumber}>3</Text>
          <Text style={styles.metricLabel}>Tickets Activos</Text>
        </View>
        <View style={[styles.cardMetric, { borderLeftColor: '#28A745' }]}>
          <Text style={styles.metricNumber}>1.8 min</Text>
          <Text style={styles.metricLabel}>Tiempo Resp. Promedio</Text>
        </View>
      </View>

      {/* Listado de Tickets y Llamadas de Campo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Incidentes Activos en Campo</Text>
        {dispatchTicketsData.map((ticket) => (
          <View key={ticket.id} style={styles.ticketCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.ticketIdText}>{ticket.ticketId}</Text>
              <View style={[
                styles.badge, 
                { backgroundColor: ticket.priority === 'Media' ? '#FEF7E0' : '#E6F4EA' }
              ]}>
                <Text style={[
                  styles.badgeText, 
                  { color: ticket.priority === 'Media' ? '#B06000' : '#137333' }
                ]}>
                  Prioridad {ticket.priority}
                </Text>
              </View>
            </View>
            
            <Text style={styles.partyText}>Companion: <Text style={{fontWeight: 'bold'}}>{ticket.companion}</Text></Text>
            <Text style={styles.partyText}>Cliente: <Text style={{fontWeight: 'bold'}}>{ticket.client}</Text></Text>
            <Text style={styles.issueText}>{ticket.issue}</Text>
            
            <View style={styles.rowFooter}>
              <Text style={styles.timeText}>{ticket.time}</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={[styles.actionBtn, {marginRight: 8, backgroundColor: '#E2E8F0'}]}>
                  <Text style={[styles.actionBtnText, {color: '#0066CC'}]}>Llamar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#137333'}]}>
                  <Text style={[styles.actionBtnText, {color: '#FFF'}]}>Resolver</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  welcomeText: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  subText: { fontSize: 14, color: '#666' },
  callButton: { backgroundColor: '#0066CC', padding: 10, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  metricsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  cardMetric: { flex: 1, backgroundColor: '#FFF', padding: 14, borderRadius: 8, marginHorizontal: 4, borderLeftWidth: 4, elevation: 2 },
  metricNumber: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  metricLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  ticketCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ticketIdText: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  partyText: { fontSize: 13, color: '#555', marginTop: 4 },
  issueText: { fontSize: 13, color: '#333', marginTop: 6, marginBottom: 10, fontStyle: 'italic' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  badgeText: { fontSize: 11, fontWeight: 'bold' },
  rowFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 10, marginTop: 4 },
  timeText: { fontSize: 12, color: '#666' },
  actionBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  actionBtnText: { fontSize: 12, fontWeight: '600' }
});