import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/auth/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Barra Superior / Selector Comercial */}
        <View style={styles.topBar}>
          <Text style={styles.brandTitle}>JUNTOS</Text>
          <View style={styles.navLinks}>
            <TouchableOpacity onPress={() => router.push('/client/care-preferences')} style={styles.navLinkButton}>
              <Text style={styles.navLinkText}>Preferencias</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/wallet/payment-wallet')} style={styles.navLinkButton}>
              <Text style={styles.navLinkText}>Pagos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/notifications/push-notifications')} style={styles.navLinkButton}>
              <Text style={styles.navLinkText}>Notificaciones</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cabecera Principal */}
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Panel Principal</Text>
          <Text style={styles.subtitle}>Agencia de Acompañamiento y Asistencia Geriátrica</Text>
        </View>

        {/* Banner Destacado: Mi Cuenta y Configuración */}
        <TouchableOpacity 
          style={styles.profileBanner} 
          activeOpacity={0.85}
          onPress={() => router.push('/profile/user-profile')}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Mi Cuenta y Configuración</Text>
            <Text style={styles.bannerSub}>Gestiona tu saldo, calificaciones, protocolos de emergencia y direcciones</Text>
          </View>
          <View style={styles.bannerArrowContainer}>
            <Text style={styles.arrow}>›</Text>
          </View>
        </TouchableOpacity>

        {/* Cuadrícula de Módulos Operativos */}
        <View style={styles.gridContainer}>
          
          <TouchableOpacity 
            style={styles.gridCard} 
            activeOpacity={0.8}
            onPress={() => router.push('/chat/internal-chat')}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.cardIcon}>💬</Text>
            </View>
            <Text style={styles.cardTitle}>Chat de Agencia</Text>
            <Text style={styles.cardDesc}>Comunicación directa con acompañantes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard} 
            activeOpacity={0.8}
            onPress={() => router.push('/wallet/payment-wallet')}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.cardIcon}>💳</Text>
            </View>
            <Text style={styles.cardTitle}>Billetera y Pagos</Text>
            <Text style={styles.cardDesc}>Saldo disponible y métodos de pago</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard} 
            activeOpacity={0.8}
            onPress={() => router.push('/client/care-preferences')}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.cardIcon}>📋</Text>
            </View>
            <Text style={styles.cardTitle}>Preferencias Cuidado</Text>
            <Text style={styles.cardDesc}>Rutinas, movilidad y necesidades</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard} 
            activeOpacity={0.8}
            onPress={() => router.push('/notifications/push-notifications')}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.cardIcon}>🔔</Text>
            </View>
            <Text style={styles.cardTitle}>Notificaciones</Text>
            <Text style={styles.cardDesc}>Avisos y alertas operativas recientes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard} 
            activeOpacity={0.8}
            onPress={() => router.push('/client/favorite-locations')}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.cardIcon}>📍</Text>
            </View>
            <Text style={styles.cardTitle}>Lugares Favoritos</Text>
            <Text style={styles.cardDesc}>Casa, médico, centros y destinos frecuentes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard} 
            activeOpacity={0.8}
            onPress={() => router.push('/matching/rating')}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.cardIcon}>⭐</Text>
            </View>
            <Text style={styles.cardTitle}>Calificar Servicio</Text>
            <Text style={styles.cardDesc}>Evaluación de calidad de acompañamiento</Text>
          </TouchableOpacity>

        </View>

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.85} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión Segura</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  scrollContainer: { padding: 24, alignItems: 'center', paddingBottom: 40 },

  topBar: { width: '100%', maxWidth: 900, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  brandTitle: { fontSize: 20, fontWeight: '900', color: '#0F172A', letterSpacing: 2 },
  navLinks: { flexDirection: 'row', gap: 16 },
  navLinkButton: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#FFFFFF', borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1' },
  navLinkText: { fontSize: 13, fontWeight: '700', color: '#334155' },

  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 900 },
  mainTitle: { fontSize: 28, fontWeight: '900', color: '#0F172A', marginBottom: 6, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#64748B', fontWeight: '500', textAlign: 'center' },

  profileBanner: { width: '100%', maxWidth: 900, backgroundColor: '#0284C7', borderRadius: 16, padding: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, ...Platform.select({ ios: { shadowColor: '#0284C7', shadowOpacity: 0.25, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }, android: { elevation: 5 }, web: { boxShadow: '0 10px 15px -3px rgba(2, 132, 199, 0.2)' } }) },
  bannerContent: { flex: 1 },
  bannerTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  bannerSub: { fontSize: 13, color: '#E0F2FE', lineHeight: 18 },
  bannerArrowContainer: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center', marginLeft: 16 },
  arrow: { fontSize: 22, color: '#FFFFFF', fontWeight: '900', marginTop: -2 },

  gridContainer: { width: '100%', maxWidth: 900, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, marginBottom: 28 },
  gridCard: { width: Platform.OS === 'web' ? '31%' : '48%', minWidth: 260, flexGrow: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 16, padding: 20, alignItems: 'flex-start', ...Platform.select({ ios: { shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } }, android: { elevation: 2 }, web: { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' } }) },
  iconContainer: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  cardIcon: { fontSize: 24 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  cardDesc: { fontSize: 12, color: '#64748B', lineHeight: 16 },

  logoutButton: { width: '100%', maxWidth: 900, backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FCA5A5', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  logoutButtonText: { color: '#DC2626', fontSize: 14, fontWeight: '700' }
});