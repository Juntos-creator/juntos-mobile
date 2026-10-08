import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { supabase } from '../../src/services/supabase'; // Ajusta la ruta según tu estructura

export default function InternalChatScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    initChat();
  }, []);

  const initChat = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setCurrentUser(user);

      // Cargar mensajes existentes
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (data) setMessages(data);

      // Suscribirse a mensajes en tiempo real (Supabase Realtime)
      const channel = supabase
        .channel('public:chat_messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (error) {
      console.error('Error al inicializar el chat:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return;

    try {
      const messagePayload = {
        sender_id: currentUser.id,
        message: newMessage.trim(),
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('chat_messages').insert([messagePayload]);
      if (error) throw error;

      setNewMessage('');
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo enviar el mensaje.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardContainer}
      >
        
        {/* Cabecera del Chat */}
        <View style={styles.header}>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Chat de Asistencia</Text>
          <Text style={styles.subtitle}>Comunicación directa con tu acompañante asignado.</Text>
        </View>

        {/* Listado de Mensajes */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id || item.created_at}
          contentContainerStyle={styles.chatList}
          renderItem={({ item }) => {
            const isMe = currentUser && item.sender_id === currentUser.id;
            return (
              <View style={[styles.messageBubble, isMe ? styles.myMessage : styles.otherMessage]}>
                <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.otherMessageText]}>
                  {item.message}
                </Text>
                <Text style={[styles.messageTime, isMe ? styles.myMessageTime : styles.otherMessageTime]}>
                  {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            );
          }}
        />

        {/* Barra de Entrada de Texto */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="#94A3B8"
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  keyboardContainer: { flex: 1 },
  header: { padding: 16, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', backgroundColor: '#F8FAFC' },
  logoText: { fontSize: 18, fontWeight: '900', color: '#0F172A', letterSpacing: 2, marginBottom: 2 },
  title: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  subtitle: { fontSize: 12, color: '#64748B' },

  chatList: { padding: 16, flexGrow: 1, justifyContent: 'flex-end' },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 12, marginBottom: 10 },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#0284C7' },
  otherMessage: { alignSelf: 'flex-start', backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1' },
  
  messageText: { fontSize: 14, lineHeight: 18 },
  myMessageText: { color: '#FFFFFF' },
  otherMessageText: { color: '#0F172A' },

  messageTime: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  myMessageTime: { color: '#BAE6FD' },
  otherMessageTime: { color: '#64748B' },

  inputContainer: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: '#E2E8F0', backgroundColor: '#FFFFFF', alignItems: 'center' },
  textInput: { flex: 1, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, color: '#0F172A', marginRight: 8 },
  sendButton: { backgroundColor: '#0F172A', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  sendButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' }
});