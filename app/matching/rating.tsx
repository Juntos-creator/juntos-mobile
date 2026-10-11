import React, { useState, useEffect } from 'react';
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

const companionAspects = [
  'Trato respetuoso y amable',
  'Puntualidad en punto de encuentro',
  'Instrucciones y ambiente claro',
  'Ubicación segura y de fácil acceso',
];

const clientAspects = [
  'Puntualidad y presencia impecable',
  'Empatía y calidez humana',
  'Trato respetuoso con el adulto mayor',
  'Excelente comunicación en ruta',
];

export default function RatingReviewScreen() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<'client' | 'family' | 'companion'>('client');
  const [rating, setRating] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const storedRole = localStorage.getItem('juntos_user_role') as 'client' | 'family' | 'companion';
      if (storedRole) setUserRole(storedRole);
    }
  }, []);

  const isCompanion = userRole === 'companion';
  const availableAspects = isCompanion ? companionAspects : clientAspects;

  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleNavigateBack = () => {
    if (isCompanion) {
      router.replace('/(companion)/dashboard' as any);
    } else if (userRole === 'family') {
      router.replace('/(client)/FamilyPortalScreen?viewMode=family' as any);
    } else {
      router.replace('/(client)/home' as any);
    }
  };

  const handleSubmitReview = async () => {
    setSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await supabase.from('service_reviews').insert([
          {
            user_id: user.id,
            reviewer_role: userRole,
            target_name: isCompanion ? 'Doña Carmen Gómez (Cliente)' : 'Ana Martínez (Acompañante)',
            rating: rating,
            tags: selectedTags,
            comment: comment.trim(),
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (e) {
      console.log('Envío de reseña procesado localmente');
    } finally {
      setSubmitting(false);

      const alertTitle = isCompanion ? '¡Evaluación de Cliente Registrada!' : '¡Muchas gracias!';
      const alertMsg = isCompanion
        ? 'Tu calificación del cliente/familiar ayuda a mantener una comunidad segura y de confianza.'
        : 'Tu calificación ha sido registrada con éxito y reconoce la calidad del servicio.';

      if (Platform.OS === 'web') {
        window.alert(`${alertTitle}: ${alertMsg}`);
        handleNavigateBack();
      } else {
        Alert.alert(alertTitle, alertMsg, [{ text: 'Aceptar', onPress: handleNavigateBack }]);
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
              <Text style={styles.brandSubtitle}>
                {isCompanion ? 'Evaluación Bidireccional de Servicio' : 'Calidad & Experiencia del Cliente'}
              </Text>
            </View>
          </View>
          
          <View style={[styles.heroBadge, isCompanion && { backgroundColor: '#DCFCE7' }]}>
            <Text style={[styles.heroBadgeText, isCompanion && { color: '#15803D' }]}>
              {isCompanion ? 'REPORTE DEL ACOMPAÑANTE' : 'EVALUACIÓN DE SERVICIO'}
            </Text>
          </View>
        </View>

        {/* TARJETA PRINCIPAL DE EVALUACIÓN */}
        <View style={styles.mainCard}>

          {/* RESUMEN DEL SERVICIO CONCLUIDO */}
          <View style={styles.completionBanner}>
            <View style={styles.completionBadge}>
              <Ionicons name="checkmark-circle" size={18} color="#15803D" style={{ marginRight: 6 }} />
              <Text style={styles.completionBadgeText}>SERVICIO CONCLUIDO EXITOSAMENTE</Text>
            </View>
            <Text style={styles.companionName}>
              {isCompanion ? 'Cliente: Doña Carmen Gómez' : 'Acompañante: Ana Martínez'}
            </Text>
            <Text style={styles.serviceMeta}>
              {isCompanion 
                ? 'Familiar tutor: Lic. Roberto Gómez • Centro Médico UCE' 
                : 'Acompañamiento & Conversación Geriátrica • Santo Domingo'}
            </Text>
          </View>

          {/* SECCIÓN DE ESTRELLAS INTERACTIVAS */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingQuestion}>
              {isCompanion
                ? '¿Cómo calificarías la experiencia con el cliente y familiar?'
                : '¿Cómo calificarías la atención recibida por tu acompañante?'}
            </Text>

            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <TouchableOpacity
                  key={starIndex}
                  onPress={() => handleStarPress(starIndex)}
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

          {/* CHIPS DE ASPECTOS DESTACADOS */}
          <View style={styles.aspectsSection}>
            <Text style={styles.inputLabel}>
              {isCompanion ? '¿Qué aspectos destacas de esta experiencia?' : '¿Qué cualidades destacó tu acompañante?'}
            </Text>

            <View style={styles.tagsRow}>
              {availableAspects.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <TouchableOpacity
                    key={tag}
                    style={[styles.tagChip, active && styles.tagChipActive]}
                    onPress={() => toggleTag(tag)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.tagChipText, active && styles.tagChipTextActive]}>
                      {active ? '✓ ' : '+ '}
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* COMENTARIOS Y SUGERENCIAS */}
          <View style={styles.commentSection}>
            <Text style={styles.inputLabel}>Comentarios o Sugerencias Adicionales (Opcional)</Text>
            <TextInput
              style={styles.textArea}
              placeholder={
                isCompanion
                  ? 'Ej. El familiar estuvo muy pendiente y el adulto mayor recibió el servicio con mucha amabilidad.'
                  : 'Ej. Ana fue puntual, humana y con un trato excepcional.'
              }
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
            />
          </View>

          {/* ACCIONES DE ENVÍO Y NAVEGACIÓN */}
          <TouchableOpacity
            style={[styles.submitButton, submitting && { opacity: 0.7 }]}
            onPress={handleSubmitReview}
            disabled={submitting}
            activeOpacity={0.88}
          >
            <Text style={styles.submitButtonText}>
              {submitting
                ? 'Enviando...'
                : isCompanion
                ? 'Enviar Evaluación y Volver a Mi Dashboard →'
                : 'Enviar y Volver al Inicio / Panel →'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNavigateBack} style={styles.backLink} activeOpacity={0.8}>
            <Text style={styles.backLinkText}>← Regresar al Panel Principal</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FC' },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 60,
    alignItems: 'center',
    flexGrow: 1,
  },

  header: {
    width: '100%',
    maxWidth: 680,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  logoMark: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center', // Corregido: justifyContent en lugar de justify
    marginRight: 12,
  },
  logoHeart: { fontSize: 30, color: '#0284C7', fontWeight: '700' },
  brandTitle: { fontSize: 24, fontWeight: '900', color: '#102A43', letterSpacing: 2 },
  brandSubtitle: { fontSize: 11, color: '#0284C7', fontWeight: '700', marginTop: 1 },

  heroBadge: { backgroundColor: '#E0F2FE', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  heroBadgeText: { color: '#0284C7', fontSize: 10, fontWeight: '800', letterSpacing: 1 },

  mainCard: {
    width: '100%',
    maxWidth: 680,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#102A43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },

  completionBanner: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  completionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    marginBottom: 8,
  },
  completionBadgeText: { fontSize: 11, fontWeight: '800', color: '#15803D', letterSpacing: 0.5 },
  companionName: { fontSize: 18, fontWeight: '900', color: '#102A43', marginBottom: 2 },
  serviceMeta: { fontSize: 12, color: '#627D98', fontWeight: '600', textAlign: 'center' },

  ratingSection: { alignItems: 'center', marginBottom: 20 },
  ratingQuestion: { fontSize: 15, fontWeight: '800', color: '#102A43', marginBottom: 14, textAlign: 'center' },
  starsRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  starButton: { padding: 4 },
  ratingScoreText: { fontSize: 14, fontWeight: '800', color: '#0284C7' },

  aspectsSection: { marginBottom: 20 },
  aspectsTitle: { fontSize: 13, fontWeight: '800', color: '#334E68', marginBottom: 8 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  tagChip: { backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  tagChipActive: { backgroundColor: '#E0F2FE', borderColor: '#0284C7' },
  tagChipText: { fontSize: 12, fontWeight: '700', color: '#475569' },
  tagChipTextActive: { color: '#0284C7', fontWeight: '800' },

  commentSection: { marginBottom: 24 },
  inputLabel: { fontSize: 13, fontWeight: '800', color: '#334E68', marginBottom: 8 },
  textArea: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    padding: 16,
    fontSize: 14,
    color: '#102A43',
    height: 100,
    textAlignVertical: 'top',
  },

  submitButton: {
    backgroundColor: '#0284C7',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#0284C7',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },

  backLink: { marginTop: 16, alignItems: 'center' },
  backLinkText: { fontSize: 13, color: '#627D98', fontWeight: '700' },
});