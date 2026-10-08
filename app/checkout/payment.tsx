import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function CheckoutPaymentScreen() {
  const [selectedPlan, setSelectedPlan] = useState<'hours' | 'monthly'>('hours');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    alert(`Procesando pago seguro de plan ${selectedPlan === 'hours' ? 'por Horas' : 'Mensual'}. ¡Listo para conectar con el Acompañante!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Cabecera */}
        <View style={styles.header}>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Selección de Plan y Pago</Text>
          <Text style={styles.subtitle}>Garantiza el servicio con nuestra pasarela segura</Text>
        </View>

        {/* Selección de Planes */}
        <View style={styles.plansContainer}>
          <TouchableOpacity 
            style={[styles.planCard, selectedPlan === 'hours' && styles.activePlanCard]} 
            onPress={() => setSelectedPlan('hours')}
          >
            <Text style={[styles.planTitle, selectedPlan === 'hours' && styles.activePlanText]}>Plan por Horas</Text>
            <Text style={styles.planPrice}>$RD 1,500 <Text style={styles.planSub}>/ hora</Text></Text>
            <Text style={styles.planDesc}>Ideal para citas médicas, diligencias o apoyo puntual.</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.planCard, selectedPlan === 'monthly' && styles.activePlanCard]} 
            onPress={() => setSelectedPlan('monthly')}
          >
            <Text style={[styles.planTitle, selectedPlan === 'monthly' && styles.activePlanText]}>Plan Mensual (Cuidador)</Text>
            <Text style={styles.planPrice}>$RD 35,000 <Text style={styles.planSub}>/ mes</Text></Text>
            <Text style={styles.planDesc}>Acompañamiento continuo y supervisión especializada.</Text>
          </TouchableOpacity>
        </View>

        {/* Formulario de Pago */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionHeading}>💳 Información de Tarjeta</Text>

          <Text style={styles.label}>Número de Tarjeta</Text>
          <TextInput 
            style={styles.input} 
            placeholder="4000 0000 0000 0000" 
            placeholderTextColor="#94A3B8"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />

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

          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Pagar y Activar Servicio</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { padding: 24, justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 450 },
  logoText: { fontSize: 24, fontWeight: '900', color: '#0F172A', letterSpacing: 2, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '800', color: '#1E293B', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#64748B', textAlign: 'center' },
  
  plansContainer: { flexDirection: 'row', gap: 12, width: '100%', maxWidth: 450, marginBottom: 24 },
  planCard: { flex: 1, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, padding: 16 },
  activePlanCard: { borderColor: '#0284C7', backgroundColor: '#F0F9FF', borderWidth: 2 },
  planTitle: { fontSize: 14, fontWeight: '700', color: '#334155', marginBottom: 8 },
  activePlanText: { color: '#0369A1' },
  planPrice: { fontSize: 18, fontWeight: '900', color: '#0F172A', marginBottom: 6 },
  planSub: { fontSize: 11, fontWeight: '400', color: '#64748B' },
  planDesc: { fontSize: 11, color: '#64748B', lineHeight: 16 },

  formContainer: { width: '100%', maxWidth: 450 },
  sectionHeading: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#0F172A', marginBottom: 16 },
  row: { flexDirection: 'row', gap: 12 },
  halfInputContainer: { flex: 1 },

  payButton: { backgroundColor: '#0F172A', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  payButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' }
});