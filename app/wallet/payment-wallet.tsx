import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase'; // Ajusta la ruta según tu estructura

export default function WalletScreen() {
  const router = useRouter();
  const [balance, setBalance] = useState(0.00);
  const [loading, setLoading] = useState(true);

  // Cargar saldo de la billetera desde Supabase
  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
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

      const newBalance = balance + 1000.00; // Simulación de recarga de RD$ 1,000

      const { error } = await supabase
        .from('user_wallets')
        .upsert({ user_id: user.id, balance: newBalance, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });

      if (error) throw error;

      setBalance(newBalance);
      Alert.alert('¡Recarga Exitosa!', 'Se han agregado RD$ 1,000.00 a tu billetera JUNTOS.');
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo procesar la recarga.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Cabecera */}
        <View style={styles.header}>
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
          <TouchableOpacity style={styles.primaryButton} onPress={handleTopUp}>
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

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { padding: 24, alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 500 },
  logoText: { fontSize: 24, fontWeight: '900', color: '#0F172A', letterSpacing: 2, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', color: '#1E293B', marginBottom: 4, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', paddingHorizontal: 10 },
  
  balanceCard: { width: '100%', maxWidth: 500, backgroundColor: '#0284C7', borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
  balanceLabel: { fontSize: 14, fontWeight: '600', color: '#E0F2FE', marginBottom: 8 },
  balanceAmount: { fontSize: 32, fontWeight: '900', color: '#FFFFFF', marginBottom: 4 },
  balanceSub: { fontSize: 12, color: '#BAE6FD' },

  actionsContainer: { width: '100%', maxWidth: 500, marginBottom: 24 },
  primaryButton: { backgroundColor: '#0F172A', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },

  sectionContainer: { width: '100%', maxWidth: 500 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 12 },
  cardItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, padding: 16 },
  cardInfo: { fontSize: 14, fontWeight: '600', color: '#334155' },
  cardStatus: { fontSize: 12, fontWeight: '700', color: '#16A34A', backgroundColor: '#DCFCE7', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6 }
});