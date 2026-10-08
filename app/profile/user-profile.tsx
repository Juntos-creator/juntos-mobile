import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase'; // Ajusta la ruta según tu estructura

export default function UserProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [avgRating, setAvgRating] = useState('5.0');
  const [loading, setLoading] = useState(true);

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
    Linking.openURL('tel:8090000000'); // Número de la agencia / Call Center
  };

  const handleCallEmergency = () => {
    Linking.openURL('tel:911');
  };

  const handleCallFamilyEmergency = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Buscar contacto de emergencia en preferencias de cuidado
      const { data } = await supabase
        .from('care_preferences')
        .select('emergency_contact')
        .eq('user_id', user.id)
        .single();

      if (data && data.emergency_contact) {
        Alert.alert('Contacto Familiar', `Llamando a: ${data.emergency_contact}`);
        // Aquí puedes extraer el teléfono si está formateado o disparar la llamada
      } else {
        Alert.alert('Aviso', 'No tienes un contacto de emergencia familiar registrado en tus preferencias.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener el contacto de emergencia.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Cabecera de la Marca */}
        <View style={styles.header}>
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
        <TouchableOpacity style={styles.supportButton} onPress={handleCallCallCenter}>
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
            <TouchableOpacity style={styles.sosButton} onPress={handleCallEmergency}>
              <Text style={styles.sosButtonText}>📞 Llamar al 911</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.familySosButton} onPress={handleCallFamilyEmergency}>
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
            >
              <Text style={styles.navButtonText}>🔔 Bandeja de Notificaciones</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => router.push('/chat/internal-chat')}
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
          >
            <Text style={styles.configItemText}>📍 Direcciones y Lugares Favoritos (Casa, Médico, etc.)</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.configItem} 
            onPress={() => router.push('/client/care-preferences')}
          >
            <Text style={styles.configItemText}>📋 Preferencias y Rutinas de Cuidado</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.configItem} 
            onPress={() => router.push('/payments/payment-methods-config')}
          >
            <Text style={styles.configItemText}>💳 Métodos de Pago y Tarjetas</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContainer: { padding: 20, alignItems: 'center' },
  
  header: { alignItems: 'center', marginBottom: 20, width: '100%', maxWidth: 500 },
  logoText: { fontSize: 22, fontWeight: '900', color: '#0F172A', letterSpacing: 2, marginBottom: 4 },
  title: { fontSize: 18, fontWeight: '800', color: '#334155' },

  card: { width: '100%', maxWidth: 500, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 16, padding: 16, marginBottom: 16 },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  avatarPlaceholder: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#0284C7', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  userName: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 2 },
  userRole: { fontSize: 13, color: '#64748B', marginBottom: 6 },
  ratingBadge: { backgroundColor: '#FEF3C7', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, alignSelf: 'flex-start' },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#92400E' },

  supportButton: { width: '100%', maxWidth: 500, backgroundColor: '#0F172A', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 16 },
  supportButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },

  sectionHeader: { fontSize: 15, fontWeight: '700', color: '#1E293B', marginBottom: 10 },
  walletRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  walletLabel: { fontSize: 13, color: '#64748B' },
  walletAmount: { fontSize: 20, fontWeight: '900', color: '#0284C7', marginTop: 2 },
  walletButton: { backgroundColor: '#E0F2FE', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  walletButtonText: { color: '#0369A1', fontSize: 13, fontWeight: '700' },

  emergencyCard: { width: '100%', maxWidth: 500, backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FCA5A5', borderRadius: 16, padding: 16, marginBottom: 16 },
  emergencyTitle: { fontSize: 15, fontWeight: '800', color: '#991B1B', marginBottom: 4 },
  emergencySubtitle: { fontSize: 12, color: '#7F1D1D', marginBottom: 12 },
  emergencyButtonsRow: { flexDirection: 'row', gap: 10 },
  sosButton: { flex: 1, backgroundColor: '#DC2626', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  sosButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  familySosButton: { flex: 1, backgroundColor: '#991B1B', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  familySosButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },

  sectionContainer: { width: '100%', maxWidth: 500, marginBottom: 16 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B', marginBottom: 10 },
  rowButtons: { flexDirection: 'row', gap: 10 },
  navButton: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', paddingVertical: 12, paddingHorizontal: 10, borderRadius: 12, alignItems: 'center' },
  navButtonText: { color: '#334155', fontSize: 13, fontWeight: '700', textAlign: 'center' },

  configItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', padding: 14, borderRadius: 12, marginBottom: 8 },
  configItemText: { fontSize: 13, fontWeight: '600', color: '#334155' },
  arrow: { fontSize: 18, color: '#94A3B8', fontWeight: '700' }
});