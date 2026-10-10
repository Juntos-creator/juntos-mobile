import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo para los expedientes del personal
const hrStaffData = [
  { id: '1', name: 'Carlos Gómez', role: 'Companion Médico', status: 'Verificado', license: 'Licencia / Exequatur OK', compliance: '98%' },
  { id: '2', name: 'Ana Martínez', role: 'Cuidadora / Enfermera', status: 'Pendiente Validación', license: 'Certificado INFOTEP', compliance: '85%' },
  { id: '3', name: 'Roberto Sánchez', role: 'Acompañante Geriátrico', status: 'Revisión Legal', license: 'En trámite', compliance: '60%' },
];

export default function HRManagementScreen() {
  const router = useRouter();
  const [staffList, setStaffList] = useState(hrStaffData);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleReviewStaff = (name: string) => {
    showAlert('Expediente de RRHH', `Abriendo legajo, exequatur y credenciales de: ${name}`);
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
            <Text style={styles.welcomeText}>Recursos Humanos</Text>
            <Text style={styles.subText}>Control de Expedientes y Credenciales</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => showAlert('Nuevo Registro', 'Iniciando proceso de alta de nuevo Companion / Personal.')}
            activeOpacity={0.85}
          >
            <Ionicons name="person-add" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Tarjetas de Métricas de Personal */}
        <View style={styles.metricsContainer}>
          <View style={[styles.cardMetric, { borderLeftColor: '#16A34A' }]}>
            <Text style={styles.metricNumber}>45</Text>
            <Text style={styles.metricLabel}>Personal Activo</Text>
          </View>
          <View style={[styles.cardMetric, { borderLeftColor: '#CA8A04' }]}>
            <Text style={styles.metricNumber}>5</Text>
            <Text style={styles.metricLabel}>Pendientes de Validación</Text>
          </View>
        </View>

        {/* Listado de Expedientes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Directorio y Validación de Personal</Text>
          {staffList.map((staff) => {
            const isVerified = staff.status === 'Verificado';
            return (
              <View key={staff.id} style={styles.staffCard}>
                <View style={styles.rowBetween}>
                  <Text style={styles.staffName}>{staff.name}</Text>
                  <View style={[
                    styles.badge, 
                    { backgroundColor: isVerified ? '#DCFCE7' : '#FEF9C3' }
                  ]}>
                    <Text style={[
                      styles.badgeText, 
                      { color: isVerified ? '#16A34A' : '#CA8A04' }
                    ]}>
                      {staff.status}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.staffRole}>
                  {staff.role} • <Text style={{color: '#627D98'}}>{staff.license}</Text>
                </Text>
                
                <View style={styles.rowFooter}>
                  <Text style={styles.complianceText}>Cumplimiento: <Text style={{fontWeight: '900', color: '#102A43'}}>{staff.compliance}</Text></Text>
                  <TouchableOpacity 
                    style={styles.actionBtn}
                    onPress={() => handleReviewStaff(staff.name)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.actionBtnText}>Ver Expediente</Text>
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
  
  staffCard: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 16, marginBottom: 12, shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1, borderWidth: 1, borderColor: '#E2E8F0' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  staffName: { fontSize: 15, fontWeight: '800', color: '#102A43' },
  staffRole: { fontSize: 13, color: '#334E68', marginTop: 6, marginBottom: 12, fontWeight: '600' },
  
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '800' },
  
  rowFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 12, marginTop: 4 },
  complianceText: { fontSize: 12, color: '#627D98', fontWeight: '600' },
  
  actionBtn: { backgroundColor: '#F1F5F9', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1' },
  actionBtnText: { fontSize: 12, color: '#0284C7', fontWeight: '800' },

  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' }
});