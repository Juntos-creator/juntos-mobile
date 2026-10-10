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

export default function RatingScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const showAlert = (title: string, message: string, onOk?: () => void) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
      if (onOk) onOk();
    } else {
      Alert.alert(title, message, [{ text: 'OK', onPress: onOk }]);
    }
  };

  const handleSubmitRating = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Guardar la valoración en la tabla service_ratings
        const { error } = await supabase.from('service_ratings').insert([
          {
            client_id: user.id,
            rating: rating,
            comment: comment.trim(),
            created_at: new Date().toISOString(),
          },
        ]);

        if (error) {
          console.warn('Aviso de base de datos:', error.message);
        }
      }

      showAlert('¡Gracias!', 'Tu valoración ha sido registrada con éxito.', () => {
        router.push('/(client)/home');
      });
    } catch (error: any) {
      showAlert('Error', error.message || 'No se pudo guardar la calificación.');
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
        
        {/* Cabecera */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBackHome} style={styles.logoMark}>
            <Text style={styles.logoHeart}>♡</Text>
          </TouchableOpacity>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Califica el Servicio</Text>
          <Text style={styles.subtitle}>Tu opinión nos ayuda a mantener los más altos estándares de calidad.</Text>
        </View>

        {/* Selector de Estrellas */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>¿Cómo calificarías la atención de tu acompañante?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)} activeOpacity={0.7}>
                <Text style={styles.starText}>{star <= rating ? '⭐' : '☆'}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingText}>{rating} de 5 Estrellas</Text>
        </View>

        {/* Comentarios */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Comentarios o Sugerencias</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Cuéntanos tu experiencia..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
          />
        </View>

        {/* Botón de Enviar */}
        <TouchableOpacity 
          style={[styles.submitButton, loading && { opacity: 0.7 }]} 
          onPress={handleSubmitRating}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Enviando...' : 'Enviar Calificación'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoBackHome} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver al Inicio</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContainer: { padding: 24, alignItems: 'center', flexGrow: 1, paddingBottom: 60 },
  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 500 },
  logoMark: { width: 56, height: 56, borderRadius: 18, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  logoHeart: { fontSize: 34, color: '#0284C7', fontWeight: '700' },
  logoText: { fontSize: 24, fontWeight: '900', color: '#102A43', letterSpacing: 2, marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '800', color: '#102A43', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#627D98', textAlign: 'center', lineHeight: 20 },
  
  card: { 
    width: '100%', 
    maxWidth: 500, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    padding: 24, 
    marginBottom: 16,
    shadowColor: '#102A43',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#102A43', marginBottom: 14, textAlign: 'center' },
  
  starsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 10 },
  starText: { fontSize: 36 },
  ratingText: { textAlign: 'center', fontSize: 14, fontWeight: '700', color: '#0284C7' },

  textInput: { 
    backgroundColor: '#F8FAFC', 
    borderWidth: 1, 
    borderColor: '#CBD5E1', 
    borderRadius: 12, 
    padding: 14, 
    fontSize: 14, 
    color: '#102A43', 
    textAlignVertical: 'top', 
    minHeight: 110 
  },

  submitButton: { width: '100%', maxWidth: 500, backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' },
});