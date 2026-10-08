import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/auth/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Cabecera de Bienvenida */}
        <View style={styles.header}>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Panel Principal</Text>
          <Text style={styles.subtitle}>Agencia de Acompañamiento y Asistencia</Text>
        </View>

        {/* Acceso Directo al Perfil Unificado */}
        <TouchableOpacity 
          style={styles.profileBanner} 
          onPress={() => router.push('/profile/user-profile')}
        >
          <View>
            <Text style={styles.bannerTitle}>Mi Cuenta y Configuración</Text>
            <Text style={styles.bannerSub}>Ver saldo, calificaciones, emergencias y direcciones</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Módulos Operativos Clave */}
        <View style={styles.gridContainer}>
          
          <TouchableOpacity 
            style={styles.gridCard} 
            onPress={() => router.push('/chat/internal-chat')}
          >
            <Text style={styles.cardIcon}>💬</Text>
            <Text style={styles.cardTitle}>Chat de Agencia</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard} 
            onPress={() => router.push('/wallet/payment-wallet')}
          >
            <Text style={styles.cardIcon}>💳</Text>
            <Text style={styles.cardTitle}>Billetera y Pagos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard} 
            onPress={() => router.push('/client/care-preferences')}
          >
            <Text style={styles.cardIcon}>📋</Text>
            <Text style={styles.cardTitle}>Preferencias Cuidado</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard} 
            onPress={() => router.push('/notifications/push-notifications')}
          >
            <Text style={styles.cardIcon}>🔔</Text>
            <Text style={styles.cardTitle}>Notificaciones</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard} 
            onPress={() => router.push('/client/favorite-locations')}
          >
            <Text style={styles.cardIcon}>📍</Text>
            <Text style={styles.cardTitle}>Lugares Favoritos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard} 
            onPress={() => router.push('/matching/rating')}
          >
            <Text style={styles.cardIcon}>⭐</Text>
            <Text style={styles.cardTitle}>Calificar Servicio</Text>
          </TouchableOpacity>

        </View>

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContainer: { padding: 20, alignItems: 'center' },

  header: { alignItems: 'center', marginBottom: 20, width: '100%', maxWidth: 500 },
  logoText: { fontSize: 26, fontWeight: '900', color: '#0F172A', letterSpacing: 2, marginBottom: 4 },
  title: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 2 },
  subtitle: { fontSize: 13, color: '#64748B' },

  profileBanner: { width: '100%', maxWidth: 500, backgroundColor: '#0284C7', borderRadius: 16, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  bannerTitle: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 2 },
  bannerSub: { fontSize: 12, color: '#E0F2FE' },
  arrow: { fontSize: 24, color: '#FFFFFF', fontWeight: '900' },

  gridContainer: { width: '100%', maxWidth: 500, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginBottom: 20 },
  gridCard: { width: '48%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 16, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 2 },
  cardIcon: { fontSize: 28, marginBottom: 8 },
  cardTitle: { fontSize: 13, fontWeight: '700', color: '#334155', textAlign: 'center' },

  logoutButton: { width: '100%', maxWidth: 500, backgroundColor: '#EF4444', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  logoutButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' }
});