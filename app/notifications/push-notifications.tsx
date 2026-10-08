import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { supabase } from '../../src/services/supabase'; // Ajusta la ruta según tu estructura

export default function PushNotificationsScreen() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      if (!user) return;

      const newNotification = {
        user_id: user.id,
        title: 'Actualización JUNTOS',
        message: 'Tu acompañante ha confirmado el inicio de ruta hacia el centro médico.',
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('user_notifications').insert([newNotification]);
      if (error) throw error;

      Alert.alert('Notificación enviada', 'Has recibido una alerta de prueba.');
      fetchNotifications();
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo enviar la notificación.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Cabecera */}
        <View style={styles.header}>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Centro de Notificaciones</Text>
          <Text style={styles.subtitle}>Historial de alertas y avisos en tiempo real sobre tus servicios.</Text>
        </View>

        {/* Botón de Prueba */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSendTestNotification}>
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

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { padding: 24, alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 500 },
  logoText: { fontSize: 24, fontWeight: '900', color: '#0F172A', letterSpacing: 2, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', color: '#1E293B', marginBottom: 4, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', paddingHorizontal: 10 },
  
  actionsContainer: { width: '100%', maxWidth: 500, marginBottom: 24 },
  primaryButton: { backgroundColor: '#0284C7', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },

  sectionContainer: { width: '100%', maxWidth: 500 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 12 },
  emptyText: { textAlign: 'center', color: '#64748B', fontStyle: 'italic', marginTop: 12 },

  notificationCard: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, padding: 16, marginBottom: 12 },
  notifTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  notifMessage: { fontSize: 13, color: '#334155', marginBottom: 8, lineHeight: 18 },
  notifDate: { fontSize: 11, color: '#64748B' }
});