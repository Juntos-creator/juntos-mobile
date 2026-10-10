import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function UserProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [avgRating, setAvgRating] = useState('5.0');
  const [loading, setLoading] = useState(true);

  const showAlert = (title: string, message: string, onOk?: () => void) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
      if (onOk) onOk();
    } else {
      Alert.alert(title, message, [{ text: 'OK', onPress: onOk }]);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Obtener perfil del usuario
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (profileData) setProfile(profileData);

      // 2. Obtener saldo de la billetera
      const { data: walletData } = await supabase
        .from('user_wallets')
        .select('balance')
        .eq('user_id', user.id)
        .single();
      if (walletData) setWalletBalance(walletData.balance);

      // 3. Obtener calificaciones (si aplica)
      const { data: ratingsData } = await supabase
        .from('service_ratings')
        .select('rating');
      
      if (ratingsData && ratingsData.length > 0) {
        const total = ratingsData.reduce((acc, curr) => acc + curr.rating, 0);
        const avg = (total / ratingsData.length).toFixed(1);
        setAvgRating(avg);
      }
    } catch (error) {
      console.error('Error al cargar datos del perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  // Acciones de Emergencia y Soporte
  const handleCallCallCenter = () => {
    Linking.openURL('tel:8090000000');
  };

  const handleCallEmergency = () => {
    Linking.openURL('tel:911');
  };

  const handleCallFamilyEmergency = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('care_preferences')
        .select('emergency_contact')
        .eq('user_id', user.id)
        .single();

      if (data && data.emergency_contact) {
        showAlert('Contacto Familiar', `Llamando a: ${data.emergency_contact}`);
      } else {
        showAlert('Aviso', 'No tienes un contacto de emergencia familiar registrado en tus preferencias.');
      }
    } catch (error) {
      showAlert('Error', 'No se pudo obtener el contacto de emergencia.');
    }
  };

  // Función para Eliminar Cuenta
  const handleDeleteAccount = () => {
    if (Platform.OS === 'web') {
      const confirmDelete = window.confirm('⚠️ Eliminar Cuenta: ¿Estás completamente seguro de que deseas eliminar tu cuenta de JUNTOS? Esta acción borrará tus datos personales de forma permanente.');
      if (confirmDelete) {
        processAccountDeletion();
      }
    } else {
      Alert.alert(
        '⚠️ Eliminar Cuenta',
        '¿Estás completamente seguro de que deseas eliminar tu cuenta de JUNTOS? Esta acción borrará tus datos personales, preferencias y accesos de forma permanente.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Sí, Eliminar Definitivamente', 
            style: 'destructive', 
            onPress: processAccountDeletion
          }
        ]
      );
    }
  };

  const processAccountDeletion = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('profiles').delete().eq('id', user.id);
      await supabase.auth.signOut();
      
      showAlert('Cuenta Eliminada', 'Tu cuenta ha sido dada de baja exitosamente.', () => {
        router.replace('/auth/login');
      });
    } catch (error: any) {
      showAlert('Error', 'No se pudo procesar la eliminación de la cuenta.');
    }
  };

  const handleGoBackHome = () => {
    router.push('/(client)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Cabecera */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBackHome} style={styles.logoMark}>
            <Text style={styles.logoHeart}>♡</Text>
          </TouchableOpacity>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Mi Cuenta y Perfil</Text>
        </View>

        {/* 1. Tarjeta de Identificación y Calificaciones */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{profile?.full_name?.charAt(0) || 'U'}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={styles.userName}>{profile?.full_name || 'Usuario JUNTOS'}</Text>
              <Text style={styles.userRole}>Rol: {profile?.user_type || 'Cliente / Familia'}</Text>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {avgRating} / 5.0 (Calificación general)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 2. Botón de Ayuda con Call Center */}
        <TouchableOpacity style={styles.supportButton} activeOpacity={0.85} onPress={handleCallCallCenter}>
          <Text style={styles.supportButtonText}>🎧 Ayuda / Conectar con Call Center</Text>
        </TouchableOpacity>

        {/* 3. Acceso Financiero (Billetera) */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Billetera y Pagos</Text>
          <View style={styles.walletRow}>
            <View>
              <Text style={styles.walletLabel}>Saldo Disponible</Text>
              <Text style={styles.walletAmount}>
                RD$ {walletBalance.toLocaleString('es-DO', { minimumFractionDigits: 2 })}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.walletButton} 
              onPress={() => router.push('/wallet/payment-wallet')}
              activeOpacity={0.8}
            >
              <Text style={styles.walletButtonText}>Gestionar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. Panel de Seguridad y Emergencias (SOS / 911) */}
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>🚨 Panel de Emergencia y Seguridad</Text>
          <Text style={styles.emergencySubtitle}>Uso exclusivo para situaciones urgentes durante el servicio.</Text>
          
          <View style={styles.emergencyButtonsRow}>
            <TouchableOpacity style={styles.sosButton} onPress={handleCallEmergency} activeOpacity={0.85}>
              <Text style={styles.sosButtonText}>📞 Llamar al 911</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.familySosButton} onPress={handleCallFamilyEmergency} activeOpacity={0.85}>
              <Text style={styles.familySosButtonText}>👨‍👩‍👧 Familiar de Emergencia</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Bandeja de Entrada (Notificaciones) y Chat */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Comunicación y Avisos</Text>
          <View style={styles.rowButtons}>
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => router.push('/notifications/push-notifications')}
              activeOpacity={0.85}
            >
              <Text style={styles.navButtonText}>🔔 Bandeja de Notificaciones</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => router.push('/chat/internal-chat')}
              activeOpacity={0.85}
            >
              <Text style={styles.navButtonText}>💬 Chat Interno de Agencia</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 6. Configuraciones y Direcciones Guardadas */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Configuraciones y Direcciones</Text>
          
          <TouchableOpacity 
            style={styles.configItem} 
            onPress={() => router.push('/client/favorite-locations')}
            activeOpacity={0.85}
          >
            <Text style={styles.configItemText}>📍 Direcciones y Lugares Favoritos</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.configItem} 
            onPress={() => router.push('/client/care-preferences')}
            activeOpacity={0.85}
          >
            <Text style={styles.configItemText}>📋 Preferencias y Rutinas de Cuidado</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.configItem} 
            onPress={() => router.push('/payments/payment-methods-config')}
            activeOpacity={0.85}
          >
            <Text style={styles.configItemText}>💳 Métodos de Pago y Tarjetas</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 7. Zona de Peligro: Eliminar Cuenta */}
        <View style={[styles.sectionContainer, { marginTop: 10 }]}>
          <TouchableOpacity style={styles.deleteAccountButton} activeOpacity={0.85} onPress={handleDeleteAccount}>
            <Text style={styles.deleteAccountButtonText}>🗑️ Eliminar Cuenta Definitivamente</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleGoBackHome} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver al Panel Principal</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContainer: { padding: 24, alignItems: 'center', flexGrow: 1, paddingBottom: 60 },
  
  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 700 },
  logoMark: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  logoHeart: { fontSize: 24, color: '#0284C7', fontWeight: '700' },
  logoText: { fontSize: 24, fontWeight: '900', color: '#102A43', letterSpacing: 2, marginBottom: 4 },
  title: { fontSize: 16, fontWeight: '800', color: '#334155' },

  card: { width: '100%', maxWidth: 700, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 16, padding: 20, marginBottom: 16, shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  avatarPlaceholder: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#0284C7', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  userName: { fontSize: 16, fontWeight: '800', color: '#102A43', marginBottom: 2 },
  userRole: { fontSize: 13, color: '#627D98', marginBottom: 6, fontWeight: '600' },
  ratingBadge: { backgroundColor: '#FEF3C7', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, alignSelf: 'flex-start' },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#92400E' },

  supportButton: { width: '100%', maxWidth: 700, backgroundColor: '#102A43', paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginBottom: 16, shadowColor: '#102A43', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  supportButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },

  sectionHeader: { fontSize: 15, fontWeight: '800', color: '#102A43', marginBottom: 10 },
  walletRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  walletLabel: { fontSize: 13, color: '#627D98', fontWeight: '600' },
  walletAmount: { fontSize: 22, fontWeight: '900', color: '#0284C7', marginTop: 2 },
  walletButton: { backgroundColor: '#E0F2FE', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  walletButtonText: { color: '#0369A1', fontSize: 13, fontWeight: '800' },

  emergencyCard: { width: '100%', maxWidth: 700, backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FCA5A5', borderRadius: 16, padding: 20, marginBottom: 16 },
  emergencyTitle: { fontSize: 16, fontWeight: '800', color: '#991B1B', marginBottom: 4 },
  emergencySubtitle: { fontSize: 13, color: '#7F1D1D', marginBottom: 14, fontWeight: '600' },
  emergencyButtonsRow: { flexDirection: 'row', gap: 12 },
  sosButton: { flex: 1, backgroundColor: '#DC2626', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  sosButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  familySosButton: { flex: 1, backgroundColor: '#991B1B', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  familySosButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },

  sectionContainer: { width: '100%', maxWidth: 700, marginBottom: 16 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#102A43', marginBottom: 10 },
  rowButtons: { flexDirection: 'row', gap: 12 },
  navButton: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', paddingVertical: 14, paddingHorizontal: 12, borderRadius: 14, alignItems: 'center', shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },
  navButtonText: { color: '#334E68', fontSize: 13, fontWeight: '800', textAlign: 'center' },

  configItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', padding: 16, borderRadius: 14, marginBottom: 10, shadowColor: '#102A43', shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },
  configItemText: { fontSize: 14, fontWeight: '700', color: '#334E68' },
  arrow: { fontSize: 20, color: '#94A3B8', fontWeight: '800' },

  deleteAccountButton: { width: '100%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#FECACA', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  deleteAccountButtonText: { color: '#DC2626', fontSize: 14, fontWeight: '800' },

  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 12, width: '100%', maxWidth: 700 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' }
});