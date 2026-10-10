import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../src/services/supabase';

export default function AuditAccountingScreen() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  useEffect(() => {
    fetchAuditData();
  }, []);

  const fetchAuditData = async () => {
    setLoading(true);
    try {
      // Cargar pagos o transacciones desde Supabase
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setTransactions(data);
      } else {
        // Datos de respaldo si la tabla está vacía
        setTransactions([
          { id: '1', plan: 'Acompañamiento Clínico', amount: 2500, status: 'completed', created_at: new Date().toISOString() },
          { id: '2', plan: 'Asistencia Domiciliaria', amount: 1800, status: 'review', created_at: new Date().toISOString() },
          { id: '3', plan: 'Monitoreo Prolongado', amount: 3200, status: 'completed', created_at: new Date().toISOString() },
        ]);
      }
    } catch (error: any) {
      console.error('Error al cargar contabilidad:', error.message);
    } finally {
      setLoading(false);
    }
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
            <Text style={styles.welcomeText}>Auditoría y Contabilidad</Text>
            <Text style={styles.subText}>Trazabilidad Financiera y Control de Glosas</Text>
          </View>
          <TouchableOpacity style={styles.reportButton} onPress={fetchAuditData} activeOpacity={0.85}>
            <Ionicons name="document-text" size={20} color="#0284C7" />
          </TouchableOpacity>
        </View>

        {/* Tarjetas de Métricas Financieras */}
        <View style={styles.metricsContainer}>
          <View style={[styles.cardMetric, { borderLeftColor: '#0284C7' }]}>
            <Text style={styles.metricNumber}>RD$ 75.4K</Text>
            <Text style={styles.metricLabel}>Facturado Mes</Text>
          </View>
          <View style={[styles.cardMetric, { borderLeftColor: '#DC2626' }]}>
            <Text style={styles.metricNumber}>RD$ 1,800</Text>
            <Text style={styles.metricLabel}>En Glosa / Objeción</Text>
          </View>
        </View>

        {/* Listado de Transacciones / Auditoría */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Validación de Facturación y Servicios</Text>
          
          {loading ? (
            <Text style={styles.emptyText}>Cargando registros contables...</Text>
          ) : transactions.length === 0 ? (
            <Text style={styles.emptyText}>No hay transacciones registradas.</Text>
          ) : (
            transactions.map((item) => {
              const isApproved = item.status === 'completed' || item.status === 'Validado' || item.status === 'Pagado';
              const statusLabel = isApproved ? 'Validado' : 'Glosa / Revisión';

              return (
                <View key={item.id} style={styles.transactionCard}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.serviceIdText}>
                      {item.plan || 'Servicio JUNTOS'}
                    </Text>
                    <View style={[
                      styles.badge, 
                      { backgroundColor: isApproved ? '#DCFCE7' : '#FEE2E2' }
                    ]}>
                      <Text style={[
                        styles.badgeText, 
                        { color: isApproved ? '#16A34A' : '#DC2626' }
                      ]}>
                        {statusLabel}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={styles.clientText}>Fecha: {new Date(item.created_at).toLocaleDateString()}</Text>
                  
                  <View style={styles.rowFooter}>
                    <Text style={styles.amountText}>RD$ {Number(item.amount || 0).toLocaleString()}</Text>
                    <TouchableOpacity 
                      style={styles.auditBtn} 
                      onPress={() => showAlert('Soportes', `Revisando expediente y glosas técnicas para la transacción ${item.id}`)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.auditBtnText}>Revisar Soportes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
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
  
  reportButton: { backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center', shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },
  
  metricsContainer: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  cardMetric: { flex: 1, backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, borderLeftWidth: 4, shadowColor: '#102A43', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, borderWidth: 1, borderColor: '#E2E8F0' },
  metricNumber: { fontSize: 22, fontWeight: '900', color: '#102A43' },
  metricLabel: { fontSize: 11, color: '#627D98', marginTop: 4, fontWeight: '600' },
  
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#102A43', marginBottom: 14 },
  emptyText: { textAlign: 'center', color: '#627D98', fontStyle: 'italic', marginTop: 12, fontSize: 13 },
  
  transactionCard: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 16, marginBottom: 12, shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1, borderWidth: 1, borderColor: '#E2E8F0' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  serviceIdText: { fontSize: 15, fontWeight: '800', color: '#102A43' },
  clientText: { fontSize: 12, color: '#627D98', marginTop: 6, marginBottom: 10, fontWeight: '600' },
  
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '800' },
  
  rowFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 12, marginTop: 4 },
  amountText: { fontSize: 16, fontWeight: '900', color: '#0284C7' },
  
  auditBtn: { backgroundColor: '#F1F5F9', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1' },
  auditBtnText: { fontSize: 12, color: '#0284C7', fontWeight: '800' },

  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' }
});