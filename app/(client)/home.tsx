import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function ClientHomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/auth/login');
    } catch (error: any) {
      if (Platform.OS === 'web') {
        window.alert('Error al cerrar sesión');
      } else {
        Alert.alert('Error', 'No se pudo cerrar sesión.');
      }
    }
  };

  const handleRequestService = () => {
    router.push('/(client)/select-companion');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER PRINCIPAL CON ACCESO A PORTAL FAMILIAR */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/')} style={styles.logoContainer}>
            <View style={styles.logoMark}>
              <Text style={styles.logoHeart}>♡</Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>JUNTOS</Text>
              <Text style={styles.brandSubtitle}>Compañía y Asistencia Cotidiana</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={[styles.navChip, styles.familyChip]} 
              onPress={() => router.push('/(client)/FamilyPortalScreen')}
            >
              <Text style={styles.familyChipText}>👥 Portal Familiar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.navChip} 
              onPress={() => router.push('/chat/internal-chat')}
            >
              <Text style={styles.navChipText}>💬 Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.navChip} 
              onPress={() => router.push('/notifications/push-notifications')}
            >
              <Text style={styles.navChipText}>🔔 Avisos</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* HERO BANNER COMERCIAL */}
        <View style={styles.heroCard}>
          <View style={styles.heroTextContent}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>ACOMPAÑAMIENTO NO CLÍNICO</Text>
            </View>
            <Text style={styles.heroTitle}>¿Qué compañía necesita hoy tu familiar?</Text>
            <Text style={styles.heroSubtitle}>
              Conecta en minutos con personas de confianza, evaluadas y verificadas para brindar trato humano, conversación y apoyo cotidiano.
            </Text>

            <TouchableOpacity 
              style={styles.primaryCtaButton} 
              onPress={handleRequestService}
              activeOpacity={0.88}
            >
              <Text style={styles.primaryCtaText}>Solicitar Acompañante Ahora</Text>
              <Text style={styles.primaryCtaArrow}>→</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* CATEGORÍAS DE SERVICIOS POPULARES */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Apoyo para la Vida Cotidiana</Text>
          <Text style={styles.sectionSubtitle}>Servicios de asistencia recreativa, movilidad y compañía en casa</Text>

          <View style={styles.servicesGrid}>
            <TouchableOpacity style={styles.serviceCard} onPress={handleRequestService}>
              <View style={[styles.serviceIconBg, { backgroundColor: '#E0F2FE' }]}>
                <Text style={styles.serviceIcon}>👵</Text>
              </View>
              <Text style={styles.serviceTitle}>Compañía en Casa</Text>
              <Text style={styles.serviceDesc}>Conversación, juegos de mesa, lectura y estimulación activa.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceCard} onPress={handleRequestService}>
              <View style={[styles.serviceIconBg, { backgroundColor: '#DCFCE7' }]}>
                <Text style={styles.serviceIcon}>🚶‍♂️</Text>
              </View>
              <Text style={styles.serviceTitle}>Paseos y Movilidad</Text>
              <Text style={styles.serviceDesc}>Caminatas tranquilas, visitas al parque y acompañamiento seguro.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceCard} onPress={handleRequestService}>
              <View style={[styles.serviceIconBg, { backgroundColor: '#FEF3C7' }]}>
                <Text style={styles.serviceIcon}>🏬</Text>
              </View>
              <Text style={styles.serviceTitle}>Diligencias y Compras</Text>
              <Text style={styles.serviceDesc}>Acompañamiento a supermercados, tiendas y recados personales.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceCard} onPress={handleRequestService}>
              <View style={[styles.serviceIconBg, { backgroundColor: '#F3E8FF' }]}>
                <Text style={styles.serviceIcon}>📍</Text>
              </View>
              <Text style={styles.serviceTitle}>Acompañamiento en Eventos</Text>
              <Text style={styles.serviceDesc}>Presencia amigable en reuniones familiares, iglesias y actividades socializadoras.</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ACOMPAÑANTES DESTACADOS Y VERIFICADOS */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Red de Acompañantes Verificados</Text>
            <TouchableOpacity onPress={handleRequestService}>
              <Text style={styles.seeAllText}>Ver todos →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            <View style={styles.companionCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400' }}
                style={styles.companionPhoto}
              />
              <View style={styles.companionBadge}>
                <Text style={styles.companionBadgeText}>⭐ 4.9 (48 acompañamientos)</Text>
              </View>
              <Text style={styles.companionName}>Ana Martínez</Text>
              <Text style={styles.companionRole}>Especialista en Lectura y Conversación</Text>
              <TouchableOpacity style={styles.companionBtn} onPress={handleRequestService}>
                <Text style={styles.companionBtnText}>Reservar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.companionCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400' }}
                style={styles.companionPhoto}
              />
              <View style={styles.companionBadge}>
                <Text style={styles.companionBadgeText}>⭐ 5.0 (32 acompañamientos)</Text>
              </View>
              <Text style={styles.companionName}>Carlos Gómez</Text>
              <Text style={styles.companionRole}>Acompañante de Paseos y Recados</Text>
              <TouchableOpacity style={styles.companionBtn} onPress={handleRequestService}>
                <Text style={styles.companionBtnText}>Reservar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.companionCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1594824813572-c2f8f8ef1923?q=80&w=400' }}
                style={styles.companionPhoto}
              />
              <View style={styles.companionBadge}>
                <Text style={styles.companionBadgeText}>⭐ 4.8 (19 acompañamientos)</Text>
              </View>
              <Text style={styles.companionName}>Laura Peralta</Text>
              <Text style={styles.companionRole}>Apoyo en Actividades Recreativas</Text>
              <TouchableOpacity style={styles.companionBtn} onPress={handleRequestService}>
                <Text style={styles.companionBtnText}>Reservar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* GESTIÓN DE CUENTA Y ACCESOS SECUNDARIOS */}
        <View style={styles.accountSection}>
          <Text style={styles.accountSectionTitle}>Gestión de Servicio</Text>
          <View style={styles.accountRow}>
            <TouchableOpacity style={styles.accountTile} onPress={() => router.push('/(client)/FamilyPortalScreen')}>
              <Text style={styles.accountTileIcon}>📊</Text>
              <Text style={styles.accountTileText}>Portal de Supervisión Familiar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.accountTile} onPress={() => router.push('/(client)/care-preferences')}>
              <Text style={styles.accountTileIcon}>⚙️</Text>
              <Text style={styles.accountTileText}>Preferencias del Servicio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.accountTile} onPress={() => router.push('/wallet/payment-wallet')}>
              <Text style={styles.accountTileIcon}>💳</Text>
              <Text style={styles.accountTileText}>Billetera y Métodos de Pago</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.accountTile} onPress={() => router.push('/(client)/favorite-locations')}>
              <Text style={styles.accountTileIcon}>📍</Text>
              <Text style={styles.accountTileText}>Destinos Frecuentes</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BOTÓN CERRAR SESIÓN */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.85}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión Segura</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 50, alignItems: 'center' },
  
  header: {
    width: '100%',
    maxWidth: 1180,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoMark: { width: 46, height: 46, borderRadius: 14, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  logoHeart: { fontSize: 28, color: '#0284C7', fontWeight: '700' },
  brandTitle: { fontSize: 22, fontWeight: '900', color: '#102A43', letterSpacing: 2 },
  brandSubtitle: { fontSize: 11, color: '#0284C7', fontWeight: '600' },
  
  headerActions: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  navChip: { backgroundColor: '#FFFFFF', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  navChipText: { fontSize: 13, fontWeight: '700', color: '#334E68' },
  familyChip: { backgroundColor: '#E0F2FE', borderColor: '#0284C7' },
  familyChipText: { fontSize: 13, fontWeight: '800', color: '#0284C7' },

  heroCard: {
    width: '100%',
    maxWidth: 1180,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 35,
    shadowColor: '#102A43',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  heroTextContent: { flex: 1, minWidth: 280, marginRight: 20 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#E0F2FE', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, marginBottom: 12 },
  badgeText: { color: '#0284C7', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { fontSize: 28, fontWeight: '900', color: '#102A43', lineHeight: 36, marginBottom: 12 },
  heroSubtitle: { fontSize: 15, color: '#486581', lineHeight: 22, marginBottom: 20 },
  primaryCtaButton: { backgroundColor: '#0284C7', flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 14, alignSelf: 'flex-start' },
  primaryCtaText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', marginRight: 8 },
  primaryCtaArrow: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  heroImage: { width: '100%', maxWidth: 360, height: 220, borderRadius: 18, marginTop: 15 },

  sectionContainer: { width: '100%', maxWidth: 1180, marginBottom: 35 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 22, fontWeight: '900', color: '#102A43' },
  sectionSubtitle: { fontSize: 14, color: '#627D98', marginTop: 2, marginBottom: 18 },
  seeAllText: { fontSize: 14, fontWeight: '700', color: '#0284C7' },

  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  serviceCard: { flex: 1, minWidth: 240, backgroundColor: '#FFFFFF', padding: 20, borderRadius: 18, borderWidth: 1, borderColor: '#F1F5F9' },
  serviceIconBg: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  serviceIcon: { fontSize: 24 },
  serviceTitle: { fontSize: 16, fontWeight: '800', color: '#102A43', marginBottom: 6 },
  serviceDesc: { fontSize: 13, color: '#627D98', lineHeight: 18 },

  horizontalScroll: { paddingRight: 20, gap: 16 },
  companionCard: { width: 220, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  companionPhoto: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  companionBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, marginBottom: 8 },
  companionBadgeText: { fontSize: 11, fontWeight: '800', color: '#D97706' },
  companionName: { fontSize: 15, fontWeight: '800', color: '#102A43', marginBottom: 2 },
  companionRole: { fontSize: 12, color: '#627D98', marginBottom: 14, textAlign: 'center' },
  companionBtn: { backgroundColor: '#0284C7', paddingVertical: 8, width: '100%', borderRadius: 10, alignItems: 'center' },
  companionBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },

  accountSection: { width: '100%', maxWidth: 1180, marginBottom: 30 },
  accountSectionTitle: { fontSize: 18, fontWeight: '800', color: '#102A43', marginBottom: 14 },
  accountRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  accountTile: { flex: 1, minWidth: 200, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  accountTileIcon: { fontSize: 20, marginRight: 10 },
  accountTileText: { fontSize: 13, fontWeight: '700', color: '#334E68' },

  logoutButton: { width: '100%', maxWidth: 1180, backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FCA5A5', paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 10 },
  logoutButtonText: { color: '#DC2626', fontSize: 14, fontWeight: '800' },
});