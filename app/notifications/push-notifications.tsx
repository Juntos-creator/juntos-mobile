import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function PushNotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('user_notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (data) {
          setNotifications(data);
        }
      }
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendTestNotification = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        showAlert('Error', 'Debes iniciar sesión para recibir notificaciones de prueba.');
        return;
      }

      const newNotification = {
        user_id: user.id,
        title: 'Actualización JUNTOS',
        message: 'Tu acompañante ha confirmado el inicio de ruta hacia el centro médico.',
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('user_notifications').insert([newNotification]);
      if (error) throw error;

      showAlert('Notificación enviada', 'Has recibido una alerta de prueba.');
      fetchNotifications();
    } catch (error: any) {
      showAlert('Error', 'No se pudo enviar la notificación.');
    }
  };

  const handleGoBackHome = () => {
    router.push('/(client)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Cabecera */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBackHome} style={styles.logoMark}>
            <Text style={styles.logoHeart}>♡</Text>
          </TouchableOpacity>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Centro de Notificaciones</Text>
          <Text style={styles.subtitle}>Historial de alertas y avisos en tiempo real sobre tus servicios.</Text>
        </View>

        {/* Botón de Prueba */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSendTestNotification} activeOpacity={0.85}>
            <Text style={styles.primaryButtonText}>🔔 Simular Notificación Push</Text>
          </TouchableOpacity>
        </View>

        {/* Listado de Notificaciones */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Avisos Recientes</Text>
          
          {loading ? (
            <Text style={styles.emptyText}>Cargando notificaciones...</Text>
          ) : notifications.length === 0 ? (
            <Text style={styles.emptyText}>No tienes notificaciones registradas.</Text>
          ) : (
            notifications.map((item) => (
              <View key={item.id} style={styles.notificationCard}>
                <Text style={styles.notifTitle}>{item.title}</Text>
                <Text style={styles.notifMessage}>{item.message}</Text>
                <Text style={styles.notifDate}>{new Date(item.created_at).toLocaleString()}</Text>
              </View>
            ))
          )}
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
  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 500 },
  logoMark: { width: 56, height: 56, borderRadius: 18, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  logoHeart: { fontSize: 34, color: '#0284C7', fontWeight: '700' },
  logoText: { fontSize: 24, fontWeight: '900', color: '#102A43', letterSpacing: 2, marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '800', color: '#102A43', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#627D98', textAlign: 'center', lineHeight: 20 },
  
  actionsContainer: { width: '100%', maxWidth: 500, marginBottom: 24 },
  primaryButton: { backgroundColor: '#0284C7', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },

  sectionContainer: { width: '100%', maxWidth: 500 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#102A43', marginBottom: 12 },
  emptyText: { textAlign: 'center', color: '#627D98', fontStyle: 'italic', marginTop: 12, fontSize: 14 },

  notificationCard: { 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1, 
    borderColor: '#CBD5E1', 
    borderRadius: 16, 
    padding: 18, 
    marginBottom: 12,
    shadowColor: '#102A43',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1
  },
  notifTitle: { fontSize: 14, fontWeight: '800', color: '#102A43', marginBottom: 4 },
  notifMessage: { fontSize: 13, color: '#334E68', marginBottom: 8, lineHeight: 18 },
  notifDate: { fontSize: 11, color: '#627D98', fontWeight: '600' },

  backButton: { paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  backButtonText: { fontSize: 14, color: '#334E68', fontWeight: '700' }
});