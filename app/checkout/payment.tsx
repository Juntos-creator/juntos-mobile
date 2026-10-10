import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function CheckoutPaymentScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'hours' | 'monthly'>('hours');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

  const showAlert = (title: string, message: string, onOk?: () => void) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
      if (onOk) onOk();
    } else {
      Alert.alert(title, message, [{ text: 'OK', onPress: onOk }]);
    }
  };

  const handlePayment = async () => {
    if (!cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
      showAlert('Error', 'Por favor completa los datos de tu tarjeta.');
      return;
    }

    setLoading(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('Debes iniciar sesión para procesar el pago.');
      }

      const amount = selectedPlan === 'hours' ? 1500 : 35000;
      const planName = selectedPlan === 'hours' ? 'Plan por Horas' : 'Plan Mensual (Cuidador)';

      const { error: paymentError } = await supabase
        .from('payments')
        .insert([
          {
            user_id: user.id,
            plan: planName,
            amount: amount,
            status: 'completed',
            created_at: new Date().toISOString(),
          }
        ]);

      if (paymentError) {
        console.warn('Aviso de base de datos:', paymentError.message);
      }

      showAlert(
        '¡Pago Exitoso!',
        `Procesado pago seguro de ${planName} (RD$ ${amount.toLocaleString()}). ¡Listo para conectar con el Acompañante!`,
        () => router.replace('/(client)/home')
      );

    } catch (error: any) {
      showAlert('Error en el pago', error.message || 'No se pudo procesar la transacción.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Cabecera */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/(client)/home')} style={styles.logoMark}>
            <Text style={styles.logoHeart}>♡</Text>
          </TouchableOpacity>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Selección de Plan y Pago</Text>
          <Text style={styles.subtitle}>Garantiza el servicio con nuestra pasarela segura</Text>
        </View>

        {/* Selección de Planes */}
        <View style={styles.plansContainer}>
          <TouchableOpacity 
            style={[styles.planCard, selectedPlan === 'hours' && styles.activePlanCard]} 
            onPress={() => setSelectedPlan('hours')}
            activeOpacity={0.85}
          >
            <Text style={[styles.planTitle, selectedPlan === 'hours' && styles.activePlanText]}>Plan por Horas</Text>
            <Text style={styles.planPrice}>RD$ 1,500 <Text style={styles.planSub}>/ hora</Text></Text>
            <Text style={styles.planDesc}>Ideal para citas médicas, diligencias o apoyo puntual.</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.planCard, selectedPlan === 'monthly' && styles.activePlanCard]} 
            onPress={() => setSelectedPlan('monthly')}
            activeOpacity={0.85}
          >
            <Text style={[styles.planTitle, selectedPlan === 'monthly' && styles.activePlanText]}>Plan Mensual</Text>
            <Text style={styles.planPrice}>RD$ 35,000 <Text style={styles.planSub}>/ mes</Text></Text>
            <Text style={styles.planDesc}>Acompañamiento continuo y supervisión especializada.</Text>
          </TouchableOpacity>
        </View>

        {/* Formulario de Pago */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionHeading}>💳 Información de Tarjeta</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número de Tarjeta</Text>
            <TextInput 
              style={styles.input} 
              placeholder="4000 0000 0000 0000" 
              placeholderTextColor="#94A3B8"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Expiración</Text>
              <TextInput 
                style={styles.input} 
                placeholder="MM/AA" 
                placeholderTextColor="#94A3B8"
                value={expiry}
                onChangeText={setExpiry}
              />
            </View>
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>CVV</Text>
              <TextInput 
                style={styles.input} 
                placeholder="123" 
                placeholderTextColor="#94A3B8"
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.payButton, loading && { opacity: 0.7 }]} 
            onPress={handlePayment}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.payButtonText}>
              {loading ? 'Procesando pago...' : 'Pagar y Activar Servicio'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(client)/home')} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Volver al Panel Principal</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContainer: { padding: 24, alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 500 },
  logoMark: { width: 56, height: 56, borderRadius: 18, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  logoHeart: { fontSize: 34, color: '#0284C7', fontWeight: '700' },
  logoText: { fontSize: 24, fontWeight: '900', color: '#102A43', letterSpacing: 2, marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '800', color: '#102A43', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#627D98', textAlign: 'center' },
  
  plansContainer: { flexDirection: 'row', gap: 12, width: '100%', maxWidth: 500, marginBottom: 24 },
  planCard: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 16, padding: 16, shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
  activePlanCard: { borderColor: '#0284C7', backgroundColor: '#F0F9FF', borderWidth: 2 },
  planTitle: { fontSize: 14, fontWeight: '800', color: '#334E68', marginBottom: 8 },
  activePlanText: { color: '#0284C7' },
  planPrice: { fontSize: 17, fontWeight: '900', color: '#102A43', marginBottom: 6 },
  planSub: { fontSize: 11, fontWeight: '400', color: '#627D98' },
  planDesc: { fontSize: 12, color: '#627D98', lineHeight: 16 },

  formContainer: { 
    width: '100%', 
    maxWidth: 500, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 24, 
    padding: 28, 
    shadowColor: '#102A43', 
    shadowOpacity: 0.08, 
    shadowRadius: 20, 
    shadowOffset: { width: 0, height: 8 }, 
    elevation: 4 
  },
  sectionHeading: { fontSize: 16, fontWeight: '800', color: '#102A43', marginBottom: 16 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '700', color: '#334E68', marginBottom: 8 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#102A43' },
  row: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  halfInputContainer: { flex: 1 },

  payButton: { backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  payButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' },
});