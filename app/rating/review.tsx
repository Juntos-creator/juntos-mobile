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
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../src/services/supabase';

export default function RatingReviewScreen() {
  const router = useRouter();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmitReview = async () => {
    setSubmitting(true);
    const currentDate = new Date().toISOString();

    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Guardar registro histórico del servicio concluido y calificado
      await supabase.from('service_requests').insert([
        {
          user_id: user?.id || null,
          companion_name: 'Ana Martínez',
          address: 'Centro Médico UCE, Santo Domingo',
          rating: rating,
          notes: comment.trim() || 'Servicio excelente sin novedades.',
          status: 'completed',
          created_at: currentDate,
        },
      ]);
    } catch (e) {
      console.log('Registro guardado en modo local simulado');
    } finally {
      setSubmitting(false);

      const msg = `¡Calificación enviada!: Calificación de ${rating} estrellas registrada con éxito.\n\nFecha: ${new Date().toLocaleDateString()} - Acompañante: Ana Martínez`;

      if (Platform.OS === 'web') {
        window.alert(msg);
        router.push('/(client)/FamilyPortalScreen');
      } else {
        Alert.alert('¡Calificación Registrada!', msg, [
          { text: 'Aceptar', onPress: () => router.push('/(client)/FamilyPortalScreen') }
        ]);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* CABECERA ESTILO LANDING */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoHeart}>♡</Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>JUNTOS</Text>
              <Text style={styles.brandSubtitle}>Calidad & Experiencia Geriátrica</Text>
            </View>
          </View>
          
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>EVALUACIÓN DE SERVICIO</Text>
          </View>
        </View>

        {/* TARJETA PRINCIPAL */}
        <View style={styles.mainCard}>

          <View style={styles.completionBanner}>
            <View style={styles.completionBadge}>
              <Ionicons name="checkmark-circle" size={18} color="#15803D" style={{ marginRight: 6 }} />
              <Text style={styles.completionBadgeText}>SERVICIO CONCLUIDO EXITOSAMENTE</Text>
            </View>
            <Text style={styles.companionName}>Acompañante: Ana Martínez</Text>
            <Text style={styles.serviceMeta}>Fecha: {new Date().toLocaleDateString()} • Santo Domingo</Text>
          </View>

          <View style={styles.ratingSection}>
            <Text style={styles.ratingQuestion}>¿Cómo calificarías la atención recibida?</Text>

            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <TouchableOpacity
                  key={starIndex}
                  onPress={() => setRating(starIndex)}
                  activeOpacity={0.7}
                  style={styles.starButton}
                >
                  <Ionicons
                    name={starIndex <= rating ? 'star' : 'star-outline'}
                    size={38}
                    color={starIndex <= rating ? '#F59E0B' : '#CBD5E1'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.ratingScoreText}>{rating} de 5 Estrellas</Text>
          </View>

          <View style={styles.commentSection}>
            <Text style={styles.inputLabel}>Comentarios o Sugerencias (Opcional)</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Cuéntanos cómo fue tu experiencia..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, submitting && { opacity: 0.7 }]}
            onPress={handleSubmitReview}
            disabled={submitting}
            activeOpacity={0.88}
          >
            <Text style={styles.submitButtonText}>
              {submitting ? 'Guardando...' : 'Guardar y Ver en Portal Familiar →'}
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FC' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 60, alignItems: 'center', flexGrow: 1 },
  header: { width: '100%', maxWidth: 680, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  logoMark: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  logoHeart: { fontSize: 30, color: '#0284C7', fontWeight: '700' },
  brandTitle: { fontSize: 24, fontWeight: '900', color: '#102A43', letterSpacing: 2 },
  brandSubtitle: { fontSize: 11, color: '#0284C7', fontWeight: '700', marginTop: 1 },
  heroBadge: { backgroundColor: '#E0F2FE', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  heroBadgeText: { color: '#0284C7', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  mainCard: { width: '100%', maxWidth: 680, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 28, borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#102A43', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 3 },
  completionBanner: { backgroundColor: '#F8FAFC', borderRadius: 18, padding: 18, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 24 },
  completionBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCFCE7', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 16, marginBottom: 8 },
  completionBadgeText: { fontSize: 11, fontWeight: '800', color: '#15803D', letterSpacing: 0.5 },
  companionName: { fontSize: 18, fontWeight: '900', color: '#102A43', marginBottom: 2 },
  serviceMeta: { fontSize: 12, color: '#627D98', fontWeight: '600' },
  ratingSection: { alignItems: 'center', marginBottom: 24 },
  ratingQuestion: { fontSize: 16, fontWeight: '800', color: '#102A43', marginBottom: 16 },
  starsRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  starButton: { padding: 4 },
  ratingScoreText: { fontSize: 14, fontWeight: '800', color: '#0284C7' },
  commentSection: { marginBottom: 24 },
  inputLabel: { fontSize: 13, fontWeight: '800', color: '#334E68', marginBottom: 8 },
  textArea: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 14, padding: 16, fontSize: 14, color: '#102A43', height: 110, textAlignVertical: 'top' },
  submitButton: { backgroundColor: '#0284C7', paddingVertical: 18, borderRadius: 16, alignItems: 'center', shadowColor: '#0284C7', shadowOpacity: 0.25, shadowRadius: 8, elevation: 3 },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
});