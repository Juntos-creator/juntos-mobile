import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';

export default function ConsumerLandingScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Header Comercial / Barra de Navegación */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>JUNTOS</Text>
            <Text style={styles.logoSubtext}>Cuidado y Acompañamiento</Text>
          </View>
          <View style={styles.authButtons}>
            <TouchableOpacity style={styles.loginBtn} onPress={() => alert('Ir a Iniciar Sesión (Módulo Auth)')}>
              <Text style={styles.loginBtnText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerBtn} onPress={() => alert('Ir a Registro (Módulo Auth)')}>
              <Text style={styles.registerBtnText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section (Impacto Principal) */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Tranquilidad para tu familia, compañía experta para tus seres queridos</Text>
          <Text style={styles.heroSubtitle}>
            Conectamos familias en Santo Domingo con profesionales de salud y acompañamiento altamente verificados, con monitoreo en tiempo real y seguridad garantizada.
          </Text>
          
          <View style={styles.ctaContainer}>
            <TouchableOpacity style={styles.primaryCta} onPress={() => alert('Iniciar Solicitud de Servicio')}>
              <Text style={styles.primaryCtaText}>Solicitar Acompañante Ahora</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryCta} onPress={() => alert('Registro de Acompañante KYC')}>
              <Text style={styles.secondaryCtaText}>Quiero ser Acompañante</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Propuesta de Valor (Características) */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>¿Por qué confiar en Juntos?</Text>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🛡️</Text>
            <Text style={styles.featureTitle}>Verificación Rigurosa (KYC)</Text>
            <Text style={styles.featureDesc}>Exequatur, antecedentes médicos y validación de identidad para cada profesional.</Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📍</Text>
            <Text style={styles.featureTitle}>Sala Situacional en Vivo</Text>
            <Text style={styles.featureDesc}>Monitoreo GPS, alertas activas y seguimiento minuto a minuto del servicio.</Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>💳</Text>
            <Text style={styles.featureTitle}>Pagos Seguros y Transparentes</Text>
            <Text style={styles.featureDesc}>Tarifas claras por horas o servicios mensuales con facturación automatizada.</Text>
          </View>
        </View>

        {/* Footer Comercial */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 Juntos Platform. Todos los derechos reservados. Santo Domingo, R.D.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { paddingBottom: 40 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 24, 
    paddingVertical: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F1F5F9' 
  },
  logoContainer: {},
  logoText: { fontSize: 22, fontWeight: '900', color: '#0F172A', letterSpacing: 1 },
  logoSubtext: { fontSize: 10, fontWeight: '600', color: '#64748B' },
  authButtons: { flexDirection: 'row', gap: 10 },
  loginBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1' },
  loginBtnText: { fontSize: 13, fontWeight: '600', color: '#334155' },
  registerBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, backgroundColor: '#0284C7' },
  registerBtnText: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  
  heroSection: { padding: 32, alignItems: 'center', backgroundColor: '#F8FAFC', textAlign: 'center' },
  heroTitle: { fontSize: 28, fontWeight: '800', color: '#0F172A', textAlign: 'center', marginBottom: 16, maxWidth: 700 },
  heroSubtitle: { fontSize: 16, color: '#475569', textAlign: 'center', marginBottom: 28, maxWidth: 600, lineHeight: 24 },
  ctaContainer: { flexDirection: 'row', gap: 16, flexWrap: 'wrap', justifyContent: 'center' },
  primaryCta: { backgroundColor: '#0F172A', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12 },
  primaryCtaText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  secondaryCta: { backgroundColor: '#FFFFFF', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, borderWidth: 1, borderColor: '#0F172A' },
  secondaryCtaText: { color: '#0F172A', fontSize: 15, fontWeight: '700' },

  featuresSection: { padding: 32, alignItems: 'center' },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: '#0F172A', marginBottom: 24 },
  featureCard: { width: '100%', maxWidth: 500, backgroundColor: '#F1F5F9', padding: 20, borderRadius: 16, marginBottom: 16, alignItems: 'center' },
  featureIcon: { fontSize: 28, marginBottom: 8 },
  featureTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  featureDesc: { fontSize: 13, color: '#64748B', textAlign: 'center' },

  footer: { padding: 24, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  footerText: { fontSize: 12, color: '#94A3B8' }
});