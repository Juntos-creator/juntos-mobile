import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo para contratos y revisiones legales
const legalDocumentsData = [
  { id: '1', title: 'Contrato Marco de Prestación de Servicios', entity: 'Carlos Gómez (Companion)', status: 'Firmado / Vigente', date: 'Vence: Oct 2027' },
  { id: '2', title: 'Política de Privacidad y Tratamiento de Datos (KYC)', entity: 'Plataforma General', status: 'Actualizado', date: 'Versión 2.4' },
  { id: '3', title: 'Acuerdo de Confidencialidad (NDA)', entity: 'Ana Martínez (Enfermera)', status: 'Pendiente Firma', date: 'Emitido hoy' },
];

export default function LegalComplianceScreen() {
  const router = useRouter();
  const [documents, setDocuments] = useState(legalDocumentsData);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleReviewDocument = (docTitle: string) => {
    showAlert('Expediente Legal', `Abriendo visor de documentos seguros para: ${docTitle}`);
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
        
        {/* Cabecera del Módulo */}
        <View style={styles.header}>
          <View>
            <TouchableOpacity onPress={handleGoBackHome} style={styles.logoMark}>
              <Text style={styles.logoHeart}>♡</Text>
            </TouchableOpacity>
            <Text style={styles.welcomeText}>Legal y Cumplimiento</Text>
            <Text style={styles.subText}>Gestión de Contratos, Exequaturs y Normativa</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => showAlert('Seguridad Legal', 'Módulo de cifrado y repositorio normativo activo.')}
            activeOpacity={0.85}
          >
            <Ionicons name="document-lock" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Tarjetas de Métricas Legales */}
        <View style={styles.metricsContainer}>
          <View style={[styles.cardMetric, { borderLeftColor: '#16A34A' }]}>
            <Text style={styles.metricNumber}>94%</Text>
            <Text style={styles.metricLabel}>Compliance Global</Text>
          </View>
          <View style={[styles.cardMetric, { borderLeftColor: '#EAB308' }]}>
            <Text style={styles.metricNumber}>2</Text>
            <Text style={styles.metricLabel}>Contratos por Renovar</Text>
          </View>
        </View>

        {/* Listado de Documentos y Contratos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Repositorio Legal y Expedientes Normativos</Text>
          {documents.map((doc) => {
            const isApproved = doc.status.includes('Firmado') || doc.status.includes('Actualizado');
            return (
              <View key={doc.id} style={styles.docCard}>
                <View style={styles.rowBetween}>
                  <Text style={styles.docTitle}>{doc.title}</Text>
                  <View style={[
                    styles.badge, 
                    { backgroundColor: isApproved ? '#DCFCE7' : '#FEF9C3' }
                  ]}>
                    <Text style={[
                      styles.badgeText, 
                      { color: isApproved ? '#16A34A' : '#CA8A04' }
                    ]}>
                      {doc.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.entityText}>Asociado a: {doc.entity}</Text>
                
                <View style={styles.rowFooter}>
                  <Text style={styles.dateText}>{doc.date}</Text>
                  <TouchableOpacity 
                    style={styles.reviewBtn}
                    onPress={() => handleReviewDocument(doc.title)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.reviewBtnText}>Ver Documento</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
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
  
  addButton: { backgroundColor: '#0284C7', padding: 12, borderRadius: 12, justifyContent: 'center', alignItems: 'center', shadowColor: '#102A43', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  
  metricsContainer: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  cardMetric: { flex: 1, backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, borderLeftWidth: 4, shadowColor: '#102A43', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, borderWidth: 1, borderColor: '#E2E8F0' },
  metricNumber: { fontSize: 22, fontWeight: '900', color: '#102A43' },
  metricLabel: { fontSize: 11, color: '#627D98', marginTop: 4, fontWeight: '600' },
  
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#102A43', marginBottom: 14 },
  
  docCard: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 16, marginBottom: 12, shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1, borderWidth: 1, borderColor: '#E2E8F0' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  docTitle: { fontSize: 15, fontWeight: '800', color: '#102A43', flex: 1, marginRight: 8 },
  entityText: { fontSize: 13, color: '#627D98', marginTop: 6, marginBottom: 10, fontWeight: '600' },
  
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '800' },
  
  rowFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 12, marginTop: 4 },
  dateText: { fontSize: 11, color: '#94A3B8', fontWeight: '600' },
  
  reviewBtn: { backgroundColor: '#F1F5F9', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1' },
  reviewBtnText: { fontSize: 12, color: '#0284C7', fontWeight: '800' },

  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' }
});