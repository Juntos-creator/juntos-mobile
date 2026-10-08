import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../src/services/supabase'; // Ajusta la ruta según tu estructura

export default function PaymentMethodsScreen() {
  const [cards, setCards] = useState<any[]>([]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

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
      Alert.alert('Campos incompletos', 'Por favor completa todos los datos de la tarjeta.');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Debes iniciar sesión.');

      // Enmascarar número de tarjeta para guardar solo los últimos 4 dígitos por seguridad
      const last4 = cardNumber.slice(-4);

      const payload = {
        user_id: user.id,
        card_holder: cardHolder,
        last_four: last4,
        expiry_date: expiryDate,
        is_default: cards.length === 0, // Si es la primera, marcarla por defecto
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('user_payment_methods').insert([payload]);
      if (error) throw error;

      Alert.alert('¡Tarjeta agregada!', 'Tu método de pago ha sido registrado de forma segura.');
      setCardNumber('');
      setCardHolder('');
      setExpiryDate('');
      setCvv('');
      fetchPaymentMethods();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo guardar la tarjeta.');
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
      Alert.alert('Eliminada', 'El método de pago ha sido removido.');
      fetchPaymentMethods();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la tarjeta.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Cabecera */}
        <View style={styles.header}>
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
                <TouchableOpacity onPress={() => handleDeleteCard(card.id)}>
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
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Guardando...' : 'Guardar Método de Pago'}
            </Text>
          </TouchableOpacity>
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
  
  sectionContainer: { width: '100%', maxWidth: 500, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 12 },
  emptyText: { textAlign: 'center', color: '#64748B', fontStyle: 'italic', marginTop: 8 },

  cardItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, padding: 16, marginBottom: 8 },
  cardInfo: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  cardHolder: { fontSize: 12, color: '#64748B' },
  deleteText: { fontSize: 13, fontWeight: '700', color: '#EF4444' },

  formContainer: { width: '100%', maxWidth: 500 },
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '700', color: '#334155', marginBottom: 6 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#0F172A' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },

  submitButton: { backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' }
});