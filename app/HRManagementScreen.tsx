import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo para los expedientes del personal
const hrStaffData = [
  { id: '1', name: 'Carlos Gómez', role: 'Companion Médico', status: 'Verificado', license: 'Licencia / Exequatur OK', compliance: '98%' },
  { id: '2', name: 'Ana Martínez', role: 'Cuidadora / Enfermera', status: 'Pendiente Validación', license: 'Certificado INFOTEP', compliance: '85%' },
  { id: '3', name: 'Roberto Sánchez', role: 'Acompañante Geriátrico', status: 'Revisión Legal', license: 'En trámite', compliance: '60%' },
];

export default function HRManagementScreen() {
  const [activeTab, setActiveTab] = useState<'staff' | 'pending'>('staff');

  return (
    <ScrollView style={styles.container}>
      {/* Cabecera del Módulo */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Recursos Humanos</Text>
          <Text style={styles.subText}>Control de Expedientes y Credenciales</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="person-add" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Tarjetas de Métricas de Personal */}
      <View style={styles.metricsContainer}>
        <View style={[styles.cardMetric, { borderLeftColor: '#28A745' }]}>
          <Text style={styles.metricNumber}>45</Text>
          <Text style={styles.metricLabel}>Personal Activo</Text>
        </View>
        <View style={[styles.cardMetric, { borderLeftColor: '#FFC107' }]}>
          <Text style={styles.metricNumber}>5</Text>
          <Text style={styles.metricLabel}>Pendientes de Validación</Text>
        </View>
      </View>

      {/* Listado de Expedientes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Directorio y Validación de Personal</Text>
        {hrStaffData.map((staff) => (
          <View key={staff.id} style={styles.staffCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.staffName}>{staff.name}</Text>
              <View style={[
                styles.badge, 
                { backgroundColor: staff.status === 'Verificado' ? '#E6F4EA' : '#FEF7E0' }
              ]}>
                <Text style={[
                  styles.badgeText, 
                  { color: staff.status === 'Verificado' ? '#137333' : '#B06000' }
                ]}>
                  {staff.status}
                </Text>
              </View>
            </View>
            <Text style={styles.staffRole}>{staff.role} • {staff.license}</Text>
            
            <View style={styles.rowFooter}>
              <Text style={styles.complianceText}>Cumplimiento: <Text style={{fontWeight: 'bold'}}>{staff.compliance}</Text></Text>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>Ver Expediente</Text>
              </TouchableOpacity>
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
  addButton: { backgroundColor: '#0066CC', padding: 10, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  metricsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  cardMetric: { flex: 1, backgroundColor: '#FFF', padding: 14, borderRadius: 8, marginHorizontal: 4, borderLeftWidth: 4, elevation: 2 },
  metricNumber: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  metricLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  staffCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  staffName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  staffRole: { fontSize: 13, color: '#555', marginTop: 4, marginBottom: 10 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  badgeText: { fontSize: 11, fontWeight: 'bold' },
  rowFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 10, marginTop: 4 },
  complianceText: { fontSize: 12, color: '#666' },
  actionBtn: { backgroundColor: '#E2E8F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  actionBtnText: { fontSize: 12, color: '#0066CC', fontWeight: '600' }
});