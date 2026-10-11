import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function InternalChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([
    { id: '1', text: '¡Hola! Bienvenido al soporte de JUNTOS. ¿En qué podemos ayudarte hoy?', sender: 'system', time: '10:00 AM' }
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    const sentText = inputText;
    setInputText('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('chat_messages').insert([
          { user_id: user.id, message: sentText, created_at: new Date().toISOString() }
        ]);
      }
    } catch (e) {
      console.log('Modo simulación de chat activo');
    }
  };

  const handleKeyPress = (e: any) => {
    if (Platform.OS === 'web' && e.nativeEvent.key === 'Enter' && !e.nativeEvent.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ Volver</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>💬 Chat de Agencia JUNTOS</Text>
          <Text style={styles.headerSubtitle}>Soporte y Coordinación en Vivo</Text>
        </View>
      </View>

      {/* Área Central de Mensajes */}
      <View style={styles.chatArea}>
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={true}
        >
          {messages.map((item) => (
            <View 
              key={item.id} 
              style={[
                styles.messageBubble, 
                item.sender === 'user' ? styles.userBubble : styles.systemBubble
              ]}
            >
              <Text style={[
                styles.messageText, 
                item.sender === 'user' ? styles.userMessageText : styles.systemMessageText
              ]}>
                {item.text}
              </Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Barra Inferior de Entrada */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#94A3B8"
          value={inputText}
          onChangeText={setInputText}
          onKeyPress={handleKeyPress}
          multiline={false}
        />
        <TouchableOpacity 
          style={[styles.sendButton, !inputText.trim() && { opacity: 0.5 }]} 
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
          activeOpacity={0.8}
        >
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  backButton: { marginRight: 16 },
  backText: { fontSize: 16, fontWeight: '800', color: '#0284C7' },
  headerTitleContainer: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#102A43' },
  headerSubtitle: { fontSize: 12, color: '#627D98' },
  
  chatArea: { flex: 1, backgroundColor: '#F1F5F9' },
  messagesContainer: { padding: 20, flexGrow: 1, justifyContent: 'flex-end' },
  messageBubble: { maxWidth: '80%', padding: 14, borderRadius: 16, marginBottom: 12 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#0284C7', borderBottomRightRadius: 2 },
  systemBubble: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderBottomLeftRadius: 2 },
  messageText: { fontSize: 14, lineHeight: 20 },
  userMessageText: { color: '#FFFFFF', fontWeight: '600' },
  systemMessageText: { color: '#102A43' },
  timeText: { fontSize: 10, color: '#94A3B8', marginTop: 4, alignSelf: 'flex-end' },

  inputContainer: { flexDirection: 'row', padding: 14, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 24, paddingHorizontal: 18, paddingVertical: 10, fontSize: 14, color: '#102A43', marginRight: 10 },
  sendButton: { backgroundColor: '#0284C7', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 24 },
  sendButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 }
});