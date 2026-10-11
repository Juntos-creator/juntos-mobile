import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function FamilyPortalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [viewMode, setViewMode] = useState<'client' | 'family'>('client');

  useEffect(() => {
    if (params.viewMode === 'family' || params.viewMode === 'client') {
      setViewMode(params.viewMode as 'client' | 'family');
    } else if (Platform.OS === 'web') {
      const storedRole = localStorage.getItem('juntos_user_role');
      if (storedRole === 'family') {
        setViewMode('family');
      }
    }
  }, [params.viewMode]);

  const isClient = viewMode === 'client';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ENCABEZADO CON NAVEGACIÓN */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/(client)/home')} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={18} color="#0284C7" />
            <Text style={styles.backBtnText}>Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/')} style={styles.brandRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoHeart}>♡</Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>JUNTOS</Text>
              <Text style={styles.brandSubtitle}>
                {isClient ? 'Portal del Cliente Directo' : 'Portal de Supervisión Familiar'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* HERO BANNER PRINCIPAL */}
        <View style={styles.heroCard}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeDot}>●</Text>
            <Text style={styles.badgeText}>
              {isClient ? 'PANEL DEL CLIENTE ACTIVO' : 'PANEL FAMILIAR ACTIVO'}
            </Text>
          </View>
          <Text style={styles.heroBadgeRight}>🛡 Enlace Seguro JUNTOS</Text>

          <Text style={styles.heroTitle}>Tus Servicios de Acompañamiento</Text>
          <Text style={styles.heroSubtitle}>
            {isClient
              ? 'Supervisa en tiempo real el historial de solicitudes, distinguiendo si fueron realizadas por ti directamente o por tu familiar.'
              : 'Supervisa y acompaña la asistencia de tus seres queridos con reportes claros y transparentes en tiempo real.'}
          </Text>
        </View>

        {/* BARRAS DE ACCIONES (SE ELIMINÓ EL BOTÓN "SALA SITUACIONAL GPS" GLOBAL) */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.primaryActionBtn} 
            onPress={() => router.push({ pathname: '/(client)/select-companion', params: { requested_by: viewMode } })}
            activeOpacity={0.88}
          >
            <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.primaryActionBtnText}>
              {isClient ? 'Solicitar mi Acompañamiento' : 'Solicitar para mi Familiar'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* HISTORIAL DE SERVICIOS Y CALIFICACIONES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Historial de Servicios y Calificaciones</Text>
          <Text style={styles.sectionSubtitle}>
            Registro detallado indicando la persona que realizó la solicitud.
          </Text>
        </View>

        {/* TARJETAS DE SERVICIOS */}
        <View style={styles.cardsContainer}>
          {/* SERVICIO 1 */}
          <View style={styles.serviceCard}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>⌛ Servicio en Curso / Pendiente</Text>
              </View>
              <View style={styles.roleTag}>
                <Ionicons name="people" size={12} color="#0284C7" style={{ marginRight: 4 }} />
                <Text style={styles.roleTagText}>Solicitante: Familiar</Text>
              </View>
            </View>

            <Text style={styles.companionName}>👤 Acompañante: Ana Martínez</Text>
            <Text style={styles.cardLocation}>📍 Destino: Centro Médico UCE, Santo Domingo [Distrito Nacional]</Text>
            <Text style={styles.cardNotes}>Notas: "Solicitud confirmada bajo Plan Personalizado (3 Horas - RD$ 4,500)."</Text>
            
            <View style={styles.cardFooterRow}>
              <Text style={styles.cardTime}>🕒 Registrado: 10/10/2026 a las 18:40</Text>
              
              {/* ACCESO A LA SALA SITUACIONAL EXCLUSIVO DEL SERVICIO EN CURSO */}
              <TouchableOpacity 
                style={styles.situationalBtn}
                onPress={() => router.push('/matching/situational-room')}
                activeOpacity={0.8}
              >
                <Ionicons name="navigate" size={14} color="#0284C7" style={{ marginRight: 4 }} />
                <Text style={styles.situationalBtnText}>Ver Sala Situacional</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* SERVICIO 2 */}
          <View style={styles.serviceCard}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>⌛ Servicio en Curso / Pendiente</Text>
              </View>
              <View style={styles.roleTag}>
                <Ionicons name="person" size={12} color="#0284C7" style={{ marginRight: 4 }} />
                <Text style={styles.roleTagText}>Solicitante: Cliente Directo</Text>
              </View>
            </View>

            <Text style={styles.companionName}>👤 Acompañante: Ana Martínez</Text>
            <Text style={styles.cardLocation}>📍 Destino: Centro Médico UCE, Santo Domingo [Distrito Nacional]</Text>
            <Text style={styles.cardNotes}>Notas: "Solicitud confirmada bajo Plan por Horas (1 Hora - RD$ 1,500)."</Text>
            
            <View style={styles.cardFooterRow}>
              <Text style={styles.cardTime}>🕒 Registrado: 10/10/2026 a las 17:54</Text>
              
              <TouchableOpacity 
                style={styles.situationalBtn}
                onPress={() => router.push('/matching/situational-room')}
                activeOpacity={0.8}
              >
                <Ionicons name="navigate" size={14} color="#0284C7" style={{ marginRight: 4 }} />
                <Text style={styles.situationalBtnText}>Ver Sala Situacional</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FC' },
  scrollContent: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 60, alignItems: 'center', flexGrow: 1 },

  header: { width: '100%', maxWidth: 1000, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backBtnText: { fontSize: 14, fontWeight: '800', color: '#0284C7', marginLeft: 6 },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  logoMark: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  logoHeart: { fontSize: 24, color: '#0284C7', fontWeight: '700' },
  brandTitle: { fontSize: 18, fontWeight: '900', color: '#102A43', letterSpacing: 1.5 },
  brandSubtitle: { fontSize: 10, color: '#0284C7', fontWeight: '700' },

  heroCard: { width: '100%', maxWidth: 1000, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20, position: 'relative' },
  badgeContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCFCE7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 12 },
  badgeDot: { color: '#16A34A', fontSize: 10, marginRight: 6 },
  badgeText: { color: '#15803D', fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  heroBadgeRight: { position: 'absolute', top: 24, right: 24, fontSize: 12, fontWeight: '800', color: '#0284C7' },
  heroTitle: { fontSize: 22, fontWeight: '900', color: '#102A43', marginBottom: 6 },
  heroSubtitle: { fontSize: 13, color: '#627D98', lineHeight: 20 },

  actionRow: { width: '100%', maxWidth: 1000, flexDirection: 'row', gap: 12, marginBottom: 30 },
  primaryActionBtn: { flex: 1, backgroundColor: '#0284C7', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 14 },
  primaryActionBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },

  sectionHeader: { width: '100%', maxWidth: 1000, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#102A43', marginBottom: 2 },
  sectionSubtitle: { fontSize: 12, color: '#627D98' },

  cardsContainer: { width: '100%', maxWidth: 1000, gap: 16 },
  serviceCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  statusBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusBadgeText: { color: '#D97706', fontSize: 11, fontWeight: '800' },
  roleTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0F2FE', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  roleTagText: { color: '#0284C7', fontSize: 11, fontWeight: '800' },

  companionName: { fontSize: 16, fontWeight: '900', color: '#102A43', marginBottom: 4 },
  cardLocation: { fontSize: 13, color: '#334E68', fontWeight: '700', marginBottom: 4 },
  cardNotes: { fontSize: 12, color: '#627D98', fontStyle: 'italic', marginBottom: 14 },

  cardFooterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  cardTime: { fontSize: 11, color: '#64748B', fontWeight: '600' },
  situationalBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F9FF', borderWidth: 1, borderColor: '#BAE6FD', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  situationalBtnText: { fontSize: 11, fontWeight: '800', color: '#0284C7' },
});