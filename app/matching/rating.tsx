import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase'; // Ajusta la ruta según tu estructura

export default function RatingScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitRating = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Guardar la valoración en la tabla de reseñas o calificaciones
        await supabase.from('service_ratings').insert([
          {
            client_id: user.id,
            rating: rating,
            comment: comment,
            created_at: new Date().toISOString(),
          }
        ]);
      }

      Alert.alert('¡Gracias!', 'Tu valoración ha sido registrada con éxito.');
      router.push('/(client)/home'); // Regresar al home o panel principal
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo guardar la calificación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Cabecera */}
        <View style={styles.header}>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Califica el Servicio</Text>
          <Text style={styles.subtitle}>Tu opinión nos ayuda a mantener los más altos estándares de calidad.</Text>
        </View>

        {/* Selector de Estrellas */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>¿Cómo calificarías la atención de tu acompañante?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
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
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Enviando...' : 'Enviar Calificación'}
          </Text>
        </TouchableOpacity>

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
  
  card: { width: '100%', maxWidth: 500, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 16, padding: 20, marginBottom: 16 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B', marginBottom: 12, textAlign: 'center' },
  
  starsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 8 },
  starText: { fontSize: 32 },
  ratingText: { textAlign: 'center', fontSize: 14, fontWeight: '600', color: '#475569' },

  textInput: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, padding: 12, fontSize: 14, color: '#0F172A', textAlignVertical: 'top', minHeight: 100 },

  submitButton: { width: '100%', maxWidth: 500, backgroundColor: '#0284C7', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' }
});