import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function WalletScreen() {
  const router = useRouter();
  const [balance, setBalance] = useState(0.00);
  const [loading, setLoading] = useState(true);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('user_wallets')
          .select('balance')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setBalance(data.balance);
        }
      }
    } catch (error) {
      console.error('Error al cargar la billetera:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTopUp = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const newBalance = balance + 1000.00;

      const { error } = await supabase
        .from('user_wallets')
        .upsert({ user_id: user.id, balance: newBalance, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });

      if (error) throw error;

      setBalance(newBalance);
      showAlert('¡Recarga Exitosa!', 'Se han agregado RD$ 1,000.00 a tu billetera JUNTOS.');
    } catch (error: any) {
      showAlert('Error', 'No se pudo procesar la recarga.');
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
        
        {/* Cabecera */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBackHome} style={styles.logoMark}>
            <Text style={styles.logoHeart}>♡</Text>
          </TouchableOpacity>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Billetera y Pagos</Text>
          <Text style={styles.subtitle}>Gestiona tus fondos y pagos seguros para los servicios de acompañamiento.</Text>
        </View>

        {/* Tarjeta de Saldo */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo Disponible</Text>
          <Text style={styles.balanceAmount}>
            {loading ? 'Cargando...' : `RD$ ${balance.toLocaleString('es-DO', { minimumFractionDigits: 2 })}`}
          </Text>
          <Text style={styles.balanceSub}>Moneda local (DOP)</Text>
        </View>

        {/* Botones de Acción */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleTopUp} activeOpacity={0.85}>
            <Text style={styles.primaryButtonText}>➕ Recargar Billetera (Simular)</Text>
          </TouchableOpacity>
        </View>

        {/* Historial de Transacciones / Métodos de Pago */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Métodos de Pago Asociados</Text>
          <View style={styles.cardItem}>
            <Text style={styles.cardInfo}>💳 Tarjeta Terminada en •••• 4242</Text>
            <Text style={styles.cardStatus}>Principal</Text>
          </View>
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
  scrollContainer: { padding: 24, alignItems: 'center', flexGrow: 1, paddingBottom: 60 },
  
  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 500 },
  logoMark: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  logoHeart: { fontSize: 24, color: '#0284C7', fontWeight: '700' },
  logoText: { fontSize: 24, fontWeight: '900', color: '#102A43', letterSpacing: 2, marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '800', color: '#102A43', marginBottom: 4, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#627D98', textAlign: 'center', lineHeight: 20 },
  
  balanceCard: { width: '100%', maxWidth: 500, backgroundColor: '#0284C7', borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 20, shadowColor: '#102A43', shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
  balanceLabel: { fontSize: 14, fontWeight: '700', color: '#E0F2FE', marginBottom: 8 },
  balanceAmount: { fontSize: 32, fontWeight: '900', color: '#FFFFFF', marginBottom: 4 },
  balanceSub: { fontSize: 12, color: '#BAE6FD', fontWeight: '600' },

  actionsContainer: { width: '100%', maxWidth: 500, marginBottom: 24 },
  primaryButton: { backgroundColor: '#0F172A', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },

  sectionContainer: { width: '100%', maxWidth: 500, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#102A43', marginBottom: 12 },
  cardItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 16, padding: 18, shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
  cardInfo: { fontSize: 14, fontWeight: '800', color: '#102A43' },
  cardStatus: { fontSize: 12, fontWeight: '800', color: '#16A34A', backgroundColor: '#DCFCE7', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6 },

  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 12, width: '100%', maxWidth: 500 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' }
});