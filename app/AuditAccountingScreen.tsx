import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo para transacciones y auditoría de servicios
const auditTransactionsData = [
  { id: '1', serviceId: 'SRV-8902', client: 'María Pérez', amount: '$2,500.00 DOP', status: 'Validado', type: 'Acompañamiento Clínico' },
  { id: '2', serviceId: 'SRV-8903', client: 'José Rodríguez', amount: '$1,800.00 DOP', status: 'Glosa / Revisión', type: 'Asistencia Domiciliaria' },
  { id: '3', serviceId: 'SRV-8904', client: 'Carmen Benítez', amount: '$3,200.00 DOP', status: 'Pagado', type: 'Monitoreo Prolongado' },
];

export default function AuditAccountingScreen() {
  const [filter, setFilter] = useState<'all' | 'pending'>('all');

  return (
    <ScrollView style={styles.container}>
      {/* Cabecera del Módulo */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Auditoría y Contabilidad</Text>
          <Text style={styles.subText}>Trazabilidad Financiera y Control de Glosas</Text>
        </View>
        <TouchableOpacity style={styles.reportButton}>
          <Ionicons name="document-text" size={20} color="#0066CC" />
        </TouchableOpacity>
      </View>

      {/* Tarjetas de Métricas Financieras */}
      <View style={styles.metricsContainer}>
        <View style={[styles.cardMetric, { borderLeftColor: '#0066CC' }]}>
          <Text style={styles.metricNumber}>$75.4K</Text>
          <Text style={styles.metricLabel}>Facturado Mes</Text>
        </View>
        <View style={[styles.cardMetric, { borderLeftColor: '#DC3545' }]}>
          <Text style={styles.metricNumber}>$1,800</Text>
          <Text style={styles.metricLabel}>En Glosa / Objeción</Text>
        </View>
      </View>

      {/* Listado de Transacciones / Auditoría */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validación de Facturación y Servicios</Text>
        {auditTransactionsData.map((item) => (
          <View key={item.id} style={styles.transactionCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.serviceIdText}>{item.serviceId} • <Text style={{color: '#666', fontWeight: 'normal'}}>{item.type}</Text></Text>
              <View style={[
                styles.badge, 
                { backgroundColor: item.status === 'Validado' || item.status === 'Pagado' ? '#E6F4EA' : '#FCE8E6' }
              ]}>
                <Text style={[
                  styles.badgeText, 
                  { color: item.status === 'Validado' || item.status === 'Pagado' ? '#137333' : '#C5221F' }
                ]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <Text style={styles.clientText}>Cliente: {item.client}</Text>
            
            <View style={styles.rowFooter}>
              <Text style={styles.amountText}>{item.amount}</Text>
              <TouchableOpacity style={styles.auditBtn}>
                <Text style={styles.auditBtnText}>Revisar Soportes</Text>
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
  reportButton: { backgroundColor: '#E2E8F0', padding: 10, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  metricsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  cardMetric: { flex: 1, backgroundColor: '#FFF', padding: 14, borderRadius: 8, marginHorizontal: 4, borderLeftWidth: 4, elevation: 2 },
  metricNumber: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  metricLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  transactionCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  serviceIdText: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  clientText: { fontSize: 13, color: '#555', marginTop: 6, marginBottom: 10 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  badgeText: { fontSize: 11, fontWeight: 'bold' },
  rowFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 10, marginTop: 4 },
  amountText: { fontSize: 16, fontWeight: 'bold', color: '#0066CC' },
  auditBtn: { backgroundColor: '#E2E8F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  auditBtnText: { fontSize: 12, color: '#0066CC', fontWeight: '600' }
});