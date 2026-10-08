import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';

export default function ConsumerLandingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Cabecera con Logotipo y Título de Marca */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=200&auto=format&fit=crop' }} // Placeholder estilizado o puedes usar la ruta de tu logo en assets
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>JUNTOS</Text>
          <Text style={styles.brandSubtitle}>Plataforma de Apoyo Geriátrico y Cuidado Médico</Text>
        </View>

        {/* Hero Section con Imagen Emotiva de Cuidado */}
        <View style={styles.heroContainer}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Cuidado humano y profesional para quienes más amas</Text>
            <Text style={styles.heroDescription}>
              Conectamos familias en Santo Domingo con profesionales de la salud y acompañantes geriátricos rigurosamente verificados, garantizando seguridad, empatía y tranquilidad en cada momento.
            </Text>
          </View>
          <View style={styles.imageCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop' }} 
              style={styles.careImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlayText}>
              <Text style={styles.overlayTextTitle}>Dignidad y Calidez en el Envejecimiento</Text>
              <Text style={styles.overlayTextSubtitle}>Manos que cuidan, corazones que acompañan</Text>
            </View>
          </View>
        </View>

        {/* Quiénes Somos */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>¿Quiénes Somos?</Text>
          <Text style={styles.sectionParagraph}>
            Somos una solución integral especializada en el bienestar de la población adulta mayor en Santo Domingo. Nuestro propósito es ofrecer un puente seguro entre las familias que necesitan asistencia médica o de acompañamiento y los profesionales de la salud más calificados del país.
          </Text>
        </View>

        {/* Qué Hacemos */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>¿Qué Hacemos?</Text>
          <View style={styles.gridContainer}>
            <View style={styles.featureCard}>
              <Text style={styles.featureCardTitle}>🤝 Acompañamiento Geriátrico</Text>
              <Text style={styles.featureCardText}>Brindamos soporte diario, cuidado clínico especializado y asistencia en rutinas de la tercera edad con personal evaluado bajo estrictos estándares.</Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureCardTitle}>📍 Sala Situacional en Vivo</Text>
              <Text style={styles.featureCardText}>Monitoreo en tiempo real, alertas de asistencia y seguimiento minuto a minuto de cada servicio activo para absoluta tranquilidad familiar.</Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureCardTitle}>🔒 Verificación Rigurosa (KYC)</Text>
              <Text style={styles.featureCardText}>Validación exhaustiva de exequatur, antecedentes médicos y de identidad para cada profesional integrado en nuestra red.</Text>
            </View>
          </View>
        </View>

        {/* Llamado a la Acción Comercial */}
        <View style={styles.ctaContainer}>
          <Text style={styles.ctaTitle}>¿Necesitas cuidado especializado hoy?</Text>
          <Text style={styles.ctaSubtitle}>Únete a nuestra plataforma y experimenta la tranquilidad que tu familia merece.</Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Solicitar Acompañamiento</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 20, alignItems: 'center' },
  
  header: { alignItems: 'center', marginBottom: 30, width: '100%', maxWidth: 800 },
  logoImage: { width: 70, height: 70, borderRadius: 35, marginBottom: 10 },
  brandTitle: { fontSize: 28, fontWeight: '900', color: '#0F172A', letterSpacing: 3 },
  brandSubtitle: { fontSize: 14, fontWeight: '600', color: '#0284C7', marginTop: 4 },

  heroContainer: { width: '100%', maxWidth: 900, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  heroTextContainer: { flex: 1, minWidth: 280, paddingRight: 20 },
  heroTitle: { fontSize: 26, fontWeight: '800', color: '#1E293B', marginBottom: 12, lineHeight: 34 },
  heroDescription: { fontSize: 15, color: '#475569', lineHeight: 22 },
  
  imageCard: { width: 340, height: 240, borderRadius: 16, overflow: 'hidden', position: 'relative', marginTop: 15 },
  careImage: { width: '100%', height: '100%' },
  imageOverlayText: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', padding: 12 },
  overlayTextTitle: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  overlayTextSubtitle: { color: '#38BDF8', fontSize: 11, marginTop: 2 },

  sectionContainer: { width: '100%', maxWidth: 900, marginBottom: 35 },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: '#0F172A', marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#0284C7', paddingLeft: 10 },
  sectionParagraph: { fontSize: 15, color: '#475569', lineHeight: 24, backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6 },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between' },
  featureCard: { flex: 1, minWidth: 260, backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 4 },
  featureCardTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  featureCardText: { fontSize: 14, color: '#64748B', lineHeight: 20 },

  ctaContainer: { width: '100%', maxWidth: 900, backgroundColor: '#0F172A', borderRadius: 20, padding: 30, alignItems: 'center', marginBottom: 40 },
  ctaTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 8 },
  ctaSubtitle: { fontSize: 14, color: '#94A3B8', textAlign: 'center', marginBottom: 20 },
  ctaButton: { backgroundColor: '#0284C7', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12 },
  ctaButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' }
});