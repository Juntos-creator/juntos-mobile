import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function RatingReviewScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const showAlert = (title: string, message: string, onOk?: () => void) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
      if (onOk) onOk();
    } else {
      Alert.alert(title, message, [{ text: 'OK', onPress: onOk }]);
    }
  };

  const handleCompleteReview = () => {
    showAlert(
      '¡Calificación enviada!',
      `Calificación de ${rating} estrellas registrada con éxito.\n\nSolicitante redirigido al Home para nuevo pedido.\nAcompañante redirigido a su panel para nuevos servicios.`,
      () => router.push('/(client)/home')
    );
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
          <Text style={styles.title}>Calificación del Servicio</Text>
          <Text style={styles.subtitle}>Tu opinión nos ayuda a mantener los más altos estándares de calidad</Text>
        </View>

        {/* Resumen del Servicio */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Servicio Concluido Exitosamente</Text>
          <Text style={styles.summaryName}>Acompañante: Ana Martínez</Text>
          <Text style={styles.summaryDate}>Fecha: Hoy, Santo Domingo</Text>
        </View>

        {/* Estrellas de Calificación */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionLabel}>¿Cómo calificarías la atención recibida?</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)} activeOpacity={0.7}>
                <Text style={styles.starText}>{star <= rating ? '⭐' : '☆'}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingValueText}>{rating} de 5 Estrellas</Text>
        </View>

        {/* Comentarios */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Comentarios o Sugerencias (Opcional)</Text>
          <TextInput 
            style={styles.textArea} 
            placeholder="Cuéntanos cómo fue tu experiencia..." 
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleCompleteReview} activeOpacity={0.85}>
            <Text style={styles.submitButtonText}>Enviar y Volver al Inicio / Panel</Text>
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
  scrollContainer: { padding: 24, alignItems: 'center', flexGrow: 1, paddingBottom: 60 },
  
  header: { alignItems: 'center', marginBottom: 20, width: '100%', maxWidth: 480 },
  logoMark: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  logoHeart: { fontSize: 24, color: '#0284C7', fontWeight: '700' },
  logoText: { fontSize: 24, fontWeight: '900', color: '#102A43', letterSpacing: 2, marginBottom: 4 },
  title: { fontSize: 22, fontWeight: '800', color: '#102A43', marginBottom: 4, textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#627D98', textAlign: 'center', lineHeight: 18 },
  
  summaryCard: { width: '100%', maxWidth: 480, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 16, padding: 18, marginBottom: 20, alignItems: 'center', shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
  summaryLabel: { fontSize: 12, fontWeight: '800', color: '#16A34A', marginBottom: 4, textTransform: 'uppercase' },
  summaryName: { fontSize: 16, fontWeight: '800', color: '#102A43', marginBottom: 2 },
  summaryDate: { fontSize: 12, color: '#627D98', fontWeight: '600' },

  ratingSection: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 480 },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: '#334E68', marginBottom: 12 },
  starsRow: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  starText: { fontSize: 36 },
  ratingValueText: { fontSize: 14, fontWeight: '800', color: '#0284C7' },

  formContainer: { width: '100%', maxWidth: 480 },
  label: { fontSize: 13, fontWeight: '700', color: '#334E68', marginBottom: 8 },
  textArea: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#102A43', height: 110, textAlignVertical: 'top', marginBottom: 16 },
  
  submitButton: { backgroundColor: '#0284C7', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },

  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' }
});