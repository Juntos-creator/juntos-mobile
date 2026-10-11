import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../src/services/supabase';

export default function HomeScreen() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<'client' | 'family' | 'companion'>('client');

  useEffect(() => {
    if (Platform.OS === 'web') {
      const storedRole = localStorage.getItem('juntos_user_role') as 'client' | 'family' | 'companion';
      if (storedRole) {
        setUserRole(storedRole);
      }
    }
  }, []);

  const isCompanion = userRole === 'companion';
  const isFamily = userRole === 'family';
  const isClient = userRole === 'client';

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      if (Platform.OS === 'web') {
        localStorage.removeItem('juntos_user_role');
      }
      router.replace('/auth/login');
    } catch (e) {
      router.replace('/auth/login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* CABECERA CON LOGO CLIQUEABLE Y CERRAR SESIÓN */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.brandGroup} 
            onPress={() => router.push('/')}
            activeOpacity={0.8}
          >
            <View style={styles.logoMark}>
              <Text style={styles.logoHeart}>♡</Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>JUNTOS</Text>
              <Text style={styles.brandSubtitle}>
                {isCompanion 
                  ? 'Panel del Acompañante Verificado' 
                  : isFamily 
                  ? 'Portal de Supervisión Familiar' 
                  : 'Portal del Cliente Directo'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* ACCIONES SUPERIORES SEGÚN EL ROL EXACTO */}
          <View style={styles.headerActions}>
            {isClient && (
              <TouchableOpacity 
                style={styles.navButton} 
                onPress={() => router.push({ pathname: '/(client)/FamilyPortalScreen', params: { viewMode: 'client' } })}
                activeOpacity={0.8}
              >
                <Ionicons name="person-outline" size={16} color="#0284C7" style={{ marginRight: 4 }} />
                <Text style={styles.navButtonText}>Mi Portal Cliente</Text>
              </TouchableOpacity>
            )}

            {isFamily && (
              <TouchableOpacity 
                style={styles.navButton} 
                onPress={() => router.push({ pathname: '/(client)/FamilyPortalScreen', params: { viewMode: 'family' } })}
                activeOpacity={0.8}
              >
                <Ionicons name="people-outline" size={16} color="#0284C7" style={{ marginRight: 4 }} />
                <Text style={styles.navButtonText}>Portal Familiar</Text>
              </TouchableOpacity>
            )}

            {isCompanion && (
              <TouchableOpacity 
                style={[styles.navButton, { borderColor: '#16A34A', backgroundColor: '#F0FDF4' }]} 
                onPress={() => router.replace('/(companion)/dashboard' as any)}
                activeOpacity={0.8}
              >
                <Ionicons name="shield-checkmark-outline" size={16} color="#16A34A" style={{ marginRight: 4 }} />
                <Text style={[styles.navButtonText, { color: '#16A34A' }]}>Mi Dashboard Verificado</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => router.push('/chat/internal-chat' as any)}
              activeOpacity={0.8}
            >
              <Ionicons name="chatbubbles-outline" size={18} color="#0284C7" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => router.push('/notifications/push-notifications' as any)}
              activeOpacity={0.8}
            >
              <Ionicons name="notifications-outline" size={18} color="#0284C7" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
              <Ionicons name="log-out-outline" size={16} color="#DC2626" style={{ marginRight: 4 }} />
              <Text style={styles.logoutBtnText}>Salir</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* HERO BANNER PRINCIPAL */}
        <View style={styles.heroCard}>
          <View style={styles.heroTextContent}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>
                {isCompanion 
                  ? 'PERFIL ACOMPAÑANTE VERIFICADO' 
                  : isFamily 
                  ? 'SUPERVISIÓN FAMILIAR' 
                  : 'ACOMPAÑAMIENTO PARA TI'}
              </Text>
            </View>

            <Text style={styles.heroTitle}>
              {isCompanion 
                ? 'Panel Operativo para Acompañantes' 
                : isFamily 
                ? '¿Qué compañía necesitas hoy para tu familiar?' 
                : '¿Qué compañía necesitas hoy para ti?'}
            </Text>

            <Text style={styles.heroDesc}>
              {isCompanion 
                ? 'Gestiona tus servicios asignados, reportes de asistencia y mantén comunicación directa con la mesa de operaciones.'
                : 'Conecta en minutos con personas de confianza, evaluadas y verificadas para brindar trato humano, conversación y apoyo cotidiano.'}
            </Text>

            <View style={styles.heroButtonsRow}>
              {isClient && (
                <TouchableOpacity 
                  style={styles.primaryBtn} 
                  onPress={() => router.push({ pathname: '/(client)/select-companion', params: { requested_by: 'client' } })}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryBtnText}>Solicitar Acompañamiento →</Text>
                </TouchableOpacity>
              )}

              {isFamily && (
                <TouchableOpacity 
                  style={styles.primaryBtn} 
                  onPress={() => router.push({ pathname: '/(client)/select-companion', params: { requested_by: 'family' } })}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryBtnText}>Solicitar para mi Familiar →</Text>
                </TouchableOpacity>
              )}

              {isCompanion && (
                <TouchableOpacity 
                  style={[styles.primaryBtn, { backgroundColor: '#16A34A' }]} 
                  onPress={() => router.replace('/(companion)/dashboard' as any)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryBtnText}>Ir a Mi Panel de Acompañante →</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* CONTENEDOR DE LA IMAGEN DE MANOS DE APOYO */}
          <View style={styles.heroImageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800' }} 
              style={styles.heroImage} 
              resizeMode="cover"
            />
          </View>
        </View>

        {/* SECCIÓN DE APOYO COTIDIANO */}
        {!isCompanion && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Apoyo para la Vida Cotidiana</Text>
            <Text style={styles.sectionSubtitle}>Servicios de asistencia recreativa, movilidad y compañía en casa.</Text>

            <View style={styles.servicesGrid}>
              <View style={styles.serviceBox}>
                <Text style={styles.serviceIcon}>🏠</Text>
                <Text style={styles.serviceBoxTitle}>Compañía en Casa</Text>
                <Text style={styles.serviceBoxDesc}>Conversación, juegos de mesa, lectura y estimulación activa.</Text>
              </View>

              <View style={styles.serviceBox}>
                <Text style={styles.serviceIcon}>🚶‍♂️</Text>
                <Text style={styles.serviceBoxTitle}>Paseos y Movilidad</Text>
                <Text style={styles.serviceBoxDesc}>Caminatas tranquilas, visitas al parque y acompañamiento seguro.</Text>
              </View>

              <View style={styles.serviceBox}>
                <Text style={styles.serviceIcon}>🛒</Text>
                <Text style={styles.serviceBoxTitle}>Diligencias y Compras</Text>
                <Text style={styles.serviceBoxDesc}>Acompañamiento a supermercados, tiendas y recados personales.</Text>
              </View>

              <View style={styles.serviceBox}>
                <Text style={styles.serviceIcon}>🎉</Text>
                <Text style={styles.serviceBoxTitle}>Acompañamiento en Eventos</Text>
                <Text style={styles.serviceBoxDesc}>Presencia amigable en reuniones familiares, iglesias y actividades socializadoras.</Text>
              </View>
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FC' },
  scrollContent: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 60, alignItems: 'center', flexGrow: 1 },

  header: { width: '100%', maxWidth: 1100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, flexWrap: 'wrap', gap: 15 },
  brandGroup: { flexDirection: 'row', alignItems: 'center' },
  logoMark: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  logoHeart: { fontSize: 26, color: '#0284C7', fontWeight: '700' },
  brandTitle: { fontSize: 20, fontWeight: '900', color: '#102A43', letterSpacing: 1.5 },
  brandSubtitle: { fontSize: 11, color: '#0284C7', fontWeight: '700' },

  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  navButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BAE6FD', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
  navButtonText: { fontSize: 12, fontWeight: '800', color: '#0284C7' },
  iconButton: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BAE6FD', alignItems: 'center', justifyContent: 'center' },
  
  logoutBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF2F2', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: '#FCA5A5' },
  logoutBtnText: { color: '#DC2626', fontSize: 12, fontWeight: '800' },

  heroCard: { width: '100%', maxWidth: 1100, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 36, flexDirection: 'row', borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#102A43', shadowOpacity: 0.04, shadowRadius: 16, elevation: 2, marginBottom: 30, alignItems: 'center', flexWrap: 'wrap', gap: 24 },
  heroTextContent: { flex: 1, minWidth: 280 },
  badgeContainer: { backgroundColor: '#E0F2FE', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, alignSelf: 'flex-start', marginBottom: 12 },
  badgeText: { color: '#0284C7', fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },
  heroTitle: { fontSize: 26, fontWeight: '900', color: '#102A43', marginBottom: 10, lineHeight: 34 },
  heroDesc: { fontSize: 14, color: '#627D98', lineHeight: 22, marginBottom: 20 },
  heroButtonsRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  primaryBtn: { backgroundColor: '#0284C7', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 14, alignItems: 'center' },
  primaryBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },

  heroImageContainer: { 
    width: 340, 
    height: 230, 
    borderRadius: 20, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: '#E2E8F0', 
    backgroundColor: '#E2E8F0',
    display: 'flex',
  },
  heroImage: { 
    width: '100%', 
    height: '100%',
    display: 'flex',
  },

  sectionContainer: { width: '100%', maxWidth: 1100, marginTop: 10 },
  sectionTitle: { fontSize: 22, fontWeight: '900', color: '#102A43', marginBottom: 4 },
  sectionSubtitle: { fontSize: 14, color: '#627D98', marginBottom: 20 },
  servicesGrid: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
  serviceBox: { flex: 1, minWidth: 220, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  serviceIcon: { fontSize: 28, marginBottom: 10 },
  serviceBoxTitle: { fontSize: 15, fontWeight: '900', color: '#102A43', marginBottom: 6 },
  serviceBoxDesc: { fontSize: 12, color: '#627D98', lineHeight: 18 },
});