import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const [cards, setCards] = useState<any[]>([]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('user_payment_methods')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (data) setCards(data);
      }
    } catch (error) {
      console.error('Error al cargar métodos de pago:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleAddCard = async () => {
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      showAlert('Campos incompletos', 'Por favor completa todos los datos de la tarjeta.');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Debes iniciar sesión.');

      const last4 = cardNumber.slice(-4);

      const payload = {
        user_id: user.id,
        card_holder: cardHolder.trim(),
        last_four: last4,
        expiry_date: expiryDate.trim(),
        is_default: cards.length === 0,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('user_payment_methods').insert([payload]);
      if (error) throw error;

      showAlert('¡Tarjeta agregada!', 'Tu método de pago ha sido registrado de forma segura.');
      setCardNumber('');
      setCardHolder('');
      setExpiryDate('');
      setCvv('');
      fetchPaymentMethods();
    } catch (error: any) {
      showAlert('Error', error.message || 'No se pudo guardar la tarjeta.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_payment_methods')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showAlert('Eliminada', 'El método de pago ha sido removido.');
      fetchPaymentMethods();
    } catch (error) {
      showAlert('Error', 'No se pudo eliminar la tarjeta.');
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
          <Text style={styles.title}>Configuración de Pagos</Text>
          <Text style={styles.subtitle}>Administra tus tarjetas y métodos de pago seguros para los servicios.</Text>
        </View>

        {/* Listado de Tarjetas Guardadas */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tus Tarjetas Guardadas</Text>
          {fetching ? (
            <Text style={styles.emptyText}>Cargando tarjetas...</Text>
          ) : cards.length === 0 ? (
            <Text style={styles.emptyText}>No tienes tarjetas registradas.</Text>
          ) : (
            cards.map((card) => (
              <View key={card.id} style={styles.cardItem}>
                <View>
                  <Text style={styles.cardInfo}>💳 •••• •••• •••• {card.last_four}</Text>
                  <Text style={styles.cardHolder}>{card.card_holder} (Exp: {card.expiry_date})</Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteCard(card.id)} activeOpacity={0.8}>
                  <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* Formulario para Agregar Tarjeta */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Agregar Nueva Tarjeta</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre del Titular</Text>
            <TextInput
              style={styles.input}
              placeholder="Como aparece en la tarjeta"
              placeholderTextColor="#94A3B8"
              value={cardHolder}
              onChangeText={setCardHolder}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número de Tarjeta</Text>
            <TextInput
              style={styles.input}
              placeholder="4532 •••• •••• ••••"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              maxLength={16}
              value={cardNumber}
              onChangeText={setCardNumber}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Expiración</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/AA"
                placeholderTextColor="#94A3B8"
                maxLength={5}
                value={expiryDate}
                onChangeText={setExpiryDate}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, loading && { opacity: 0.7 }]} 
            onPress={handleAddCard}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Guardando...' : 'Guardar Método de Pago'}
            </Text>
          </TouchableOpacity>
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
  scrollContainer: { padding: 24, flexGrow: 1, paddingBottom: 60, alignItems: 'center' },
  
  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 500 },
  logoMark: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  logoHeart: { fontSize: 24, color: '#0284C7', fontWeight: '700' },
  logoText: { fontSize: 24, fontWeight: '900', color: '#102A43', letterSpacing: 2, marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '800', color: '#102A43', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#627D98', textAlign: 'center', lineHeight: 20 },
  
  sectionContainer: { width: '100%', maxWidth: 500, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#102A43', marginBottom: 12 },
  emptyText: { textAlign: 'center', color: '#627D98', fontStyle: 'italic', marginTop: 8, fontSize: 13 },

  cardItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 16, padding: 18, marginBottom: 10, shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
  cardInfo: { fontSize: 14, fontWeight: '800', color: '#102A43', marginBottom: 2 },
  cardHolder: { fontSize: 12, color: '#627D98', fontWeight: '600' },
  deleteText: { fontSize: 13, fontWeight: '800', color: '#DC2626' },

  formContainer: { width: '100%', maxWidth: 500 },
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '800', color: '#334E68', marginBottom: 6 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#102A43' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },

  submitButton: { backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },

  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 12, width: '100%', maxWidth: 500 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' }
});