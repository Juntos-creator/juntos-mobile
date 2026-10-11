import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  sender: 'companion' | 'client' | 'system';
  text: string;
  time: string;
}

export default function SituationalRoomScreen() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<'client' | 'family' | 'companion'>('companion');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'system',
      text: '🔔 Servicio asignado. Enlace GPS de monitoreo iniciado.',
      time: '17:54',
    },
    {
      id: 'm2',
      sender: 'client',
      text: 'Hola, el adulto mayor se encuentra en la entrada principal del centro médico.',
      time: '17:55',
    },
  ]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (Platform.OS === 'web') {
      const storedRole = localStorage.getItem('juntos_user_role') as 'client' | 'family' | 'companion';
      if (storedRole) setUserRole(storedRole);
    }
  }, []);

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      sender: userRole === 'companion' ? 'companion' : 'client',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    if (!customText) setInputText('');
  };

  const handleFinishJourney = () => {
    // Redirigir siempre al proceso de Calificación Bidireccional
    router.replace('/matching/rating' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* CABECERA Y BOTÓN DESTACADO DE FINALIZACIÓN */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color="#0284C7" />
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Sala Situacional GPS</Text>

          <TouchableOpacity 
            style={styles.topFinishBtn} 
            onPress={handleFinishJourney}
            activeOpacity={0.88}
          >
            <Ionicons name="checkmark-done-circle" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.topFinishBtnText}>Finalizar Servicio</Text>
          </TouchableOpacity>
        </View>

        {/* TARJETA DE DATOS DEL SOLICITANTE Y FAMILIAR */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>👤 Datos del Servicio y Contacto</Text>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Solicitante / Familiar:</Text>
              <Text style={styles.infoValue}>Lic. Roberto Gómez (Hijo)</Text>
              <Text style={styles.infoSub}>📞 +809 555-0192</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Adulto Mayor (Beneficiario):</Text>
              <Text style={styles.infoValue}>Doña Carmen Gómez</Text>
              <Text style={styles.infoSub}>📍 Centro Médico UCE [Distrito Nacional]</Text>
            </View>
          </View>
        </View>

        {/* MAPA Y ESTADO GPS */}
        <View style={styles.mapCard}>
          <View style={styles.mapBadge}>
            <Text style={styles.mapBadgeDot}>●</Text>
            <Text style={styles.mapBadgeText}>MONITOREO EN VIVO ACTIVO</Text>
          </View>

          <View style={styles.mapSimulator}>
            <Ionicons name="navigate-circle" size={44} color="#0284C7" style={{ marginBottom: 6 }} />
            <Text style={styles.mapSimText}>📍 Ubicación GPS: Av. Máximo Gómez esq. Pedro Henríquez Ureña</Text>
            <Text style={styles.mapSimSubText}>Velocidad: 20 km/h • Distancia al punto: 1.2 km</Text>
          </View>
        </View>

        {/* CHAT EN VIVO DE LA SALA SITUACIONAL */}
        <View style={styles.chatCard}>
          <Text style={styles.chatHeaderTitle}>💬 Chat en Vivo de la Sala Situacional</Text>
          
          {/* BOTONES DE REPORTE RÁPIDO */}
          {userRole === 'companion' && (
            <View style={styles.quickReportsRow}>
              <TouchableOpacity 
                style={styles.quickReportBtn}
                onPress={() => handleSendMessage('📍 ¡He llegado al punto de encuentro con el cliente!')}
              >
                <Text style={styles.quickReportBtnText}>📍 Ya llegué al punto</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.quickReportBtn, { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' }]}
                onPress={() => handleSendMessage('🚶‍♂️ Iniciando el acompañamiento con la persona asistida.')}
              >
                <Text style={[styles.quickReportBtnText, { color: '#16A34A' }]}>🚶‍♂️ En acompañamiento</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* LISTA DE MENSAJES */}
          <View style={styles.messagesList}>
            {messages.map((item) => {
              if (item.sender === 'system') {
                return (
                  <View key={item.id} style={styles.systemMessage}>
                    <Text style={styles.systemMessageText}>{item.text}</Text>
                  </View>
                );
              }
              const isMe = (userRole === 'companion' && item.sender === 'companion') || (userRole !== 'companion' && item.sender === 'client');
              return (
                <View key={item.id} style={[styles.messageBubble, isMe ? styles.myBubble : styles.theirBubble]}>
                  <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.theirMessageText]}>
                    {item.text}
                  </Text>
                  <Text style={[styles.messageTime, isMe ? styles.myTime : styles.theirTime]}>{item.time}</Text>
                </View>
              );
            })}
          </View>

          {/* INPUT DE ENVÍO */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Escribe un mensaje al cliente o familiar..."
              placeholderTextColor="#94A3B8"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.sendButton} onPress={() => handleSendMessage()}>
              <Ionicons name="send" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* BOTÓN PRINCIPAL DE FINALIZAR Y PASAR A CALIFICACIÓN */}
        <TouchableOpacity style={styles.finishButton} onPress={handleFinishJourney} activeOpacity={0.88}>
          <Text style={styles.finishButtonText}>
            🏁 Concluir Servicio y Evaluar Experiencia →
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FC' },
  scrollContent: { padding: 20, alignItems: 'center', flexGrow: 1, paddingBottom: 80 },
  
  header: { width: '100%', maxWidth: 840, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backButtonText: { fontSize: 14, fontWeight: '800', color: '#0284C7', marginLeft: 4 },
  title: { fontSize: 18, fontWeight: '900', color: '#102A43' },
  topFinishBtn: { backgroundColor: '#16A34A', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
  topFinishBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },

  infoCard: { width: '100%', maxWidth: 840, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 16 },
  infoTitle: { fontSize: 16, fontWeight: '900', color: '#102A43', marginBottom: 12 },
  infoGrid: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  infoBox: { flex: 1, minWidth: 240, backgroundColor: '#F8FAFC', padding: 14, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  infoLabel: { fontSize: 11, fontWeight: '700', color: '#627D98', marginBottom: 2 },
  infoValue: { fontSize: 14, fontWeight: '900', color: '#102A43' },
  infoSub: { fontSize: 12, color: '#0284C7', fontWeight: '700', marginTop: 4 },

  mapCard: { width: '100%', maxWidth: 840, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 16 },
  mapBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCFCE7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 12 },
  mapBadgeDot: { color: '#16A34A', fontSize: 10, marginRight: 6 },
  mapBadgeText: { color: '#15803D', fontSize: 10, fontWeight: '800' },
  mapSimulator: { backgroundColor: '#F0F9FF', borderRadius: 14, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#BAE6FD' },
  mapSimText: { fontSize: 13, fontWeight: '800', color: '#0369A1', marginBottom: 4, textAlign: 'center' },
  mapSimSubText: { fontSize: 11, color: '#64748B' },

  chatCard: { width: '100%', maxWidth: 840, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  chatHeaderTitle: { fontSize: 16, fontWeight: '900', color: '#102A43', marginBottom: 12 },
  quickReportsRow: { flexDirection: 'row', gap: 8, marginBottom: 14, flexWrap: 'wrap' },
  quickReportBtn: { backgroundColor: '#F0F9FF', borderWidth: 1, borderColor: '#BAE6FD', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  quickReportBtnText: { fontSize: 12, fontWeight: '800', color: '#0284C7' },

  messagesList: { minHeight: 180, maxHeight: 260, backgroundColor: '#F8FAFC', borderRadius: 14, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  systemMessage: { backgroundColor: '#FEF3C7', padding: 8, borderRadius: 10, alignItems: 'center', marginVertical: 4 },
  systemMessageText: { fontSize: 11, fontWeight: '800', color: '#D97706' },
  messageBubble: { maxWidth: '80%', padding: 10, borderRadius: 12, marginVertical: 4 },
  myBubble: { alignSelf: 'flex-end', backgroundColor: '#0284C7' },
  theirBubble: { alignSelf: 'flex-start', backgroundColor: '#E2E8F0' },
  messageText: { fontSize: 13 },
  myMessageText: { color: '#FFFFFF', fontWeight: '600' },
  theirMessageText: { color: '#102A43', fontWeight: '600' },
  messageTime: { fontSize: 9, marginTop: 4, textAlign: 'right' },
  myTime: { color: '#E0F2FE' },
  theirTime: { color: '#64748B' },

  inputRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 13, color: '#102A43' },
  sendButton: { backgroundColor: '#0284C7', padding: 12, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },

  finishButton: { width: '100%', maxWidth: 840, backgroundColor: '#16A34A', paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginTop: 10 },
  finishButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
});