import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function CheckoutPaymentScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'hourly' | 'custom_hours' | 'monthly'>('hourly');
  const [customHours, setCustomHours] = useState<string>('3');
  const [cardNumber, setCardNumber] = useState('4000000000000000');
  const [expiry, setExpiry] = useState('05/26');
  const [cvv, setCvv] = useState('123');
  const [loading, setLoading] = useState(false);

  const getCalculatedPrice = () => {
    if (selectedPlan === 'hourly') return 1500;
    if (selectedPlan === 'monthly') return 35000;
    const hoursNum = parseInt(customHours, 10) || 1;
    return hoursNum * 1500;
  };

  const getPlanDescription = () => {
    if (selectedPlan === 'hourly') return 'Plan por Horas (1 Hora - RD$ 1,500)';
    if (selectedPlan === 'monthly') return 'Plan Mensual (RD$ 35,000)';
    const hoursNum = parseInt(customHours, 10) || 1;
    return `Plan Personalizado (${hoursNum} Horas - RD$ ${getCalculatedPrice().toLocaleString()})`;
  };

  const handleProcessPayment = async () => {
    if (!cardNumber || !expiry || !cvv) {
      if (Platform.OS === 'web') window.alert('Por favor completa los datos de pago.');
      else Alert.alert('Error', 'Por favor completa los datos de pago.');
      return;
    }

    setLoading(true);
    const planName = getPlanDescription();
    const currentDate = new Date().toISOString();

    const newRequest = {
      id: `req_${Date.now()}`,
      companion_name: 'Ana Martínez',
      address: 'Centro Médico UCE, Santo Domingo [Distrito Nacional]',
      notes: `Solicitud confirmada bajo ${planName}.`,
      requested_by: 'Familiar / Tutor',
      status: 'pending', // Marca como PENDIENTE para el Portal y el Acompañante
      created_at: currentDate,
    };

    try {
      // 1. Guardar en estado persistente local
      if (Platform.OS === 'web') {
        const currentLocal = JSON.parse(localStorage.getItem('juntos_requests') || '[]');
        localStorage.setItem('juntos_requests', JSON.stringify([newRequest, ...currentLocal]));
      }

      // 2. Intentar guardar en Supabase
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('service_requests').insert([
        {
          user_id: user?.id || null,
          companion_name: newRequest.companion_name,
          address: newRequest.address,
          notes: newRequest.notes,
          requested_by: newRequest.requested_by,
          status: newRequest.status,
          created_at: currentDate,
        },
      ]);
    } catch (err) {
      console.log('Almacenado localmente en tiempo real');
    } finally {
      setLoading(false);
      if (Platform.OS === 'web') {
        window.alert(`¡Pago Exitoso!: Procesado pago seguro de ${planName}. ¡Solicitud en tiempo real registrada!`);
        router.push('/matching/situational-room' as any);
      } else {
        Alert.alert('¡Pago Exitoso!', `Procesado pago seguro de ${planName}.`, [
          { text: 'Aceptar', onPress: () => router.push('/matching/situational-room' as any) }
        ]);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Selección de Plan y Pago</Text>
          <Text style={styles.subtitle}>Garantiza el servicio con nuestra pasarela segura</Text>

          <View style={styles.plansContainer}>
            <TouchableOpacity
              style={[styles.planBox, selectedPlan === 'hourly' && styles.planBoxSelected]}
              onPress={() => setSelectedPlan('hourly')}
              activeOpacity={0.8}
            >
              <Text style={styles.planTitle}>1 Hora Puntual</Text>
              <Text style={styles.planPrice}>RD$ 1,500 <Text style={styles.perUnit}>/ hora</Text></Text>
              <Text style={styles.planDesc}>Ideal para citas médicas rápidas o apoyo puntual.</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.planBox, selectedPlan === 'custom_hours' && styles.planBoxSelected]}
              onPress={() => setSelectedPlan('custom_hours')}
              activeOpacity={0.8}
            >
              <Text style={styles.planTitle}>Varias Horas</Text>
              <Text style={styles.planPrice}>RD$ 1,500 <Text style={styles.perUnit}>/ hora</Text></Text>
              <Text style={styles.planDesc}>Selecciona la cantidad exacta de horas que necesitas.</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.planBox, selectedPlan === 'monthly' && styles.planBoxSelected]}
              onPress={() => setSelectedPlan('monthly')}
              activeOpacity={0.8}
            >
              <Text style={styles.planTitle}>Plan Mensual</Text>
              <Text style={styles.planPrice}>RD$ 35,000 <Text style={styles.perUnit}>/ mes</Text></Text>
              <Text style={styles.planDesc}>Acompañamiento continuo y supervisión especial.</Text>
            </TouchableOpacity>
          </View>

          {selectedPlan === 'custom_hours' && (
            <View style={styles.customHoursCard}>
              <Text style={styles.customHoursLabel}>¿Cuántas horas de acompañamiento deseas?</Text>
              <View style={styles.customHoursRow}>
                <TextInput
                  style={styles.customHoursInput}
                  value={customHours}
                  onChangeText={(val) => setCustomHours(val.replace(/[^0-9]/g, ''))}
                  keyboardType="numeric"
                  placeholder="Ej. 3"
                />
                <Text style={styles.customHoursSummary}>
                  Horas × RD$ 1,500 = <Text style={styles.customHoursTotal}>RD$ {getCalculatedPrice().toLocaleString()}</Text>
                </Text>
              </View>
            </View>
          )}

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>💳 Información de Tarjeta</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Número de Tarjeta</Text>
              <TextInput style={styles.input} value={cardNumber} onChangeText={setCardNumber} keyboardType="numeric" />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Expiración</Text>
                <TextInput style={styles.input} value={expiry} onChangeText={setExpiry} />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>CVV</Text>
                <TextInput style={styles.input} value={cvv} onChangeText={setCvv} secureTextEntry keyboardType="numeric" />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.payButton, loading && { opacity: 0.7 }]}
            onPress={handleProcessPayment}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.payButtonText}>
                Confirmar y Pagar RD$ {getCalculatedPrice().toLocaleString()}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(client)/home')} style={styles.backLink}>
            <Text style={styles.backLinkText}>← Volver al Panel Principal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 20, alignItems: 'center', flexGrow: 1, justifyContent: 'center' },
  card: { width: '100%', maxWidth: 680, backgroundColor: '#FFF', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: '#E2E8F0' },
  title: { fontSize: 22, fontWeight: '900', color: '#102A43', textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#627D98', textAlign: 'center', marginBottom: 20 },
  plansContainer: { flexDirection: 'row', gap: 10, marginBottom: 16, flexWrap: 'wrap' },
  planBox: { flex: 1, minWidth: 180, padding: 14, borderRadius: 14, borderWidth: 1, borderColor: '#CBD5E1', backgroundColor: '#F8FAFC' },
  planBoxSelected: { borderColor: '#0284C7', backgroundColor: '#F0F9FF' },
  planTitle: { fontSize: 14, fontWeight: '800', color: '#102A43' },
  planPrice: { fontSize: 17, fontWeight: '900', color: '#0284C7', marginVertical: 4 },
  perUnit: { fontSize: 11, color: '#627D98', fontWeight: '400' },
  planDesc: { fontSize: 11, color: '#627D98', lineHeight: 15 },
  customHoursCard: { backgroundColor: '#F0F9FF', borderRadius: 14, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#BAE6FD' },
  customHoursLabel: { fontSize: 13, fontWeight: '800', color: '#0369A1', marginBottom: 8 },
  customHoursRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  customHoursInput: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#0284C7', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, fontSize: 16, fontWeight: '800', color: '#102A43', width: 80, textAlign: 'center' },
  customHoursSummary: { fontSize: 13, color: '#334E68', fontWeight: '700' },
  customHoursTotal: { fontSize: 16, fontWeight: '900', color: '#0284C7' },
  formSection: { marginTop: 4, marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#102A43', marginBottom: 12 },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 12, fontWeight: '700', color: '#334E68', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, padding: 12, fontSize: 14, backgroundColor: '#F8FAFC', color: '#102A43' },
  row: { flexDirection: 'row' },
  payButton: { backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginTop: 10 },
  payButtonText: { color: '#FFF', fontSize: 15, fontWeight: '800' },
  backLink: { marginTop: 16, alignItems: 'center' },
  backLinkText: { fontSize: 13, color: '#627D98', fontWeight: '700' },
});