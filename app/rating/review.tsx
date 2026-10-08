import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function RatingReviewScreen() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleCompleteReview = () => {
    alert(`¡Calificación de ${rating} estrellas enviada con éxito! \n\n• Solicitante redirigido al Home para nuevo pedido.\n• Acompañante redirigido a su panel para nuevos servicios.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Cabecera */}
        <View style={styles.header}>
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
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
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

          <TouchableOpacity style={styles.submitButton} onPress={handleCompleteReview}>
            <Text style={styles.submitButtonText}>Enviar y Volver al Inicio / Panel</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { padding: 24, alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 20, width: '100%', maxWidth: 450 },
  logoText: { fontSize: 24, fontWeight: '900', color: '#0F172A', letterSpacing: 2, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', color: '#1E293B', marginBottom: 4, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#64748B', textAlign: 'center' },
  
  summaryCard: { width: '100%', maxWidth: 450, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, padding: 16, marginBottom: 20, alignItems: 'center' },
  summaryLabel: { fontSize: 12, fontWeight: '700', color: '#16A34A', marginBottom: 4, textTransform: 'uppercase' },
  summaryName: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  summaryDate: { fontSize: 12, color: '#64748B' },

  ratingSection: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 450 },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 12 },
  starsRow: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  starText: { fontSize: 32 },
  ratingValueText: { fontSize: 13, fontWeight: '700', color: '#0284C7' },

  formContainer: { width: '100%', maxWidth: 450 },
  label: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 },
  textArea: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#0F172A', height: 100, textAlignVertical: 'top', marginBottom: 20 },
  
  submitButton: { backgroundColor: '#0F172A', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' }
});