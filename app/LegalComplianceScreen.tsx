import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo para contratos y revisiones legales
const legalDocumentsData = [
  { id: '1', title: 'Contrato Marco de Prestación de Servicios', entity: 'Carlos Gómez (Companion)', status: 'Firmado / Vigente', date: 'Vence: Oct 2027' },
  { id: '2', title: 'Política de Privacidad y Tratamiento de Datos (KYC)', entity: 'Plataforma General', status: 'Actualizado', date: 'Versión 2.4' },
  { id: '3', title: 'Acuerdo de Confidencialidad (NDA)', entity: 'Ana Martínez (Enfermera)', status: 'Pendiente Firma', date: 'Emitido hoy' },
];

export default function LegalComplianceScreen() {
  const [filter, setFilter] = useState<'all' | 'pending'>('all');

  return (
    <ScrollView style={styles.container}>
      {/* Cabecera del Módulo */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Legal y Cumplimiento</Text>
          <Text style={styles.subText}>Gestión de Contratos, Exequaturs y Normativa</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="document-lock" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Tarjetas de Métricas Legales */}
      <View style={styles.metricsContainer}>
        <View style={[styles.cardMetric, { borderLeftColor: '#28A745' }]}>
          <Text style={styles.metricNumber}>94%</Text>
          <Text style={styles.metricLabel}>Compliance Global</Text>
        </View>
        <View style={[styles.cardMetric, { borderLeftColor: '#FFC107' }]}>
          <Text style={styles.metricNumber}>2</Text>
          <Text style={styles.metricLabel}>Contratos por Renovar</Text>
        </View>
      </View>

      {/* Listado de Documentos y Contratos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Repositorio Legal y Expedientes Normativos</Text>
        {legalDocumentsData.map((doc) => (
          <View key={doc.id} style={styles.docCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.docTitle}>{doc.title}</Text>
              <View style={[
                styles.badge, 
                { backgroundColor: doc.status.includes('Firmado') || doc.status.includes('Actualizado') ? '#E6F4EA' : '#FEF7E0' }
              ]}>
                <Text style={[
                  styles.badgeText, 
                  { color: doc.status.includes('Firmado') || doc.status.includes('Actualizado') ? '#137333' : '#B06000' }
                ]}>
                  {doc.status}
                </Text>
              </View>
            </View>
            <Text style={styles.entityText}>Asociado a: {doc.entity}</Text>
            
            <View style={styles.rowFooter}>
              <Text style={styles.dateText}>{doc.date}</Text>
              <TouchableOpacity style={styles.reviewBtn}>
                <Text style={styles.reviewBtnText}>Ver Documento</Text>
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
  docCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  docTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', flex: 1, marginRight: 8 },
  entityText: { fontSize: 13, color: '#555', marginTop: 6, marginBottom: 10 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  badgeText: { fontSize: 11, fontWeight: 'bold' },
  rowFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 10, marginTop: 4 },
  dateText: { fontSize: 12, color: '#666' },
  reviewBtn: { backgroundColor: '#E2E8F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  reviewBtnText: { fontSize: 12, color: '#0066CC', fontWeight: '600' }
});