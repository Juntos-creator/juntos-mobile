import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';

export default function ConsumerLandingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Cabecera con Título de Marca */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>JUNTOS</Text>
          <Text style={styles.brandSubtitle}>Agencia de Acompañamiento y Cuidado No Clínico</Text>
        </View>

        {/* Hero Section con Imagen de Adulto Mayor / Envejeciente */}
        <View style={styles.heroContainer}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Compañía, calidez y bienestar para el adulto mayor</Text>
            <Text style={styles.heroDescription}>
              Conectamos a familias en Santo Domingo con acompañantes geriátricos y asistentes de confianza rigurosamente verificados. Brindamos apoyo diario, seguridad y un trato humano excepcional sin intervenciones médicas.
            </Text>
          </View>
          <View style={styles.imageCard}>
            {/* Imagen actualizada de un adulto mayor sonriente disfrutando al aire libre */}
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop' }} 
              style={styles.careImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlayText}>
              <Text style={styles.overlayTextTitle}>Bienestar y Vida al Aire Libre</Text>
              <Text style={styles.overlayTextSubtitle}>Momentos de paz y compañía en cada paseo</Text>
            </View>
          </View>
        </View>

        {/* Quiénes Somos */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>¿Quiénes Somos?</Text>
          <Text style={styles.sectionParagraph}>
            Somos una agencia especializada en servicios de acompañamiento no clínico para la tercera edad en Santo Domingo. Nuestro objetivo principal es elevar la calidad de vida de los adultos mayores y brindar absoluta tranquilidad a sus familias a través de cuidadores profesionales, empáticos y debidamente evaluados.
          </Text>
        </View>

        {/* Qué Hacemos */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>¿Qué Hacemos?</Text>
          <View style={styles.gridContainer}>
            <View style={styles.featureCard}>
              <Text style={styles.featureCardTitle}>🤝 Acompañamiento Diario</Text>
              <Text style={styles.featureCardText}>Conversación, lectura, paseos recreativos, apoyo en actividades cotidianas del hogar y supervisión general con absoluta calidez humana.</Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureCardTitle}>📱 Monitoreo y Tranquilidad</Text>
              <Text style={styles.featureCardText}>Reportes continuos de llegada y seguimiento constante del servicio para mantener informados a los familiares en todo momento.</Text>
            </View>

            <View style={styles.featureCard}>
              <Text style={styles.featureCardTitle}>🛡️ Cuidadores Confiables</Text>
              <Text style={styles.featureCardText}>Estrictos filtros de selección, revisión de antecedentes y referencias personales para garantizar absoluta seguridad.</Text>
            </View>
          </View>
        </View>

        {/* Llamado a la Acción Comercial */}
        <View style={styles.ctaContainer}>
          <Text style={styles.ctaTitle}>¿Buscas un acompañante ideal para tu familiar?</Text>
          <Text style={styles.ctaSubtitle}>Confía en nuestra red de profesionales dedicados al bienestar no clínico del adulto mayor.</Text>
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