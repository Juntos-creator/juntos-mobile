import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';

export default function InternalChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    fetchUserAndMessages();

    // Suscripción en tiempo real a nuevos mensajes
    const channel = supabase
      .channel('public:chat_messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchUserAndMessages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setCurrentUser(user);

      // Obtener perfil para el nombre del emisor
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      // Cargar historial de mensajes
      const { data: chatData, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (chatData) {
        setMessages(chatData);
      }
    } catch (error) {
      console.error('Error al cargar chat:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !currentUser) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', currentUser.id)
        .single();

      const senderName = profile?.full_name || 'Usuario JUNTOS';

      const { error } = await supabase.from('chat_messages').insert([
        {
          user_id: currentUser.id,
          sender_name: senderName,
          message: inputText.trim(),
          is_admin: false
        }
      ]);

      if (!error) {
        setInputText('');
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        {/* Cabecera del Chat */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹ Volver</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>💬 Chat de Agencia JUNTOS</Text>
            <Text style={styles.headerSub}>Soporte y Coordinación en Vivo</Text>
          </View>
        </View>

        {/* Lista de Mensajes */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => {
            const isMe = item.user_id === currentUser?.id;
            return (
              <View style={[styles.messageBubble, isMe ? styles.myMessage : styles.otherMessage]}>
                <Text style={[styles.senderName, isMe ? { color: '#E0F2FE' } : { color: '#0284C7' }]}>
                  {item.sender_name}
                </Text>
                <Text style={[styles.messageText, isMe ? { color: '#FFFFFF' } : { color: '#1E293B' }]}>
                  {item.message}
                </Text>
                <Text style={[styles.timestamp, isMe ? { color: '#BAE6FD' } : { color: '#94A3B8' }]}>
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
            placeholder="Escribe tu mensaje a la agencia..."
            placeholderTextColor="#94A3B8"
            value={inputText}
            onChangeText={setInputText}
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
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  backButton: { marginRight: 12, paddingVertical: 4, paddingHorizontal: 8 },
  backButtonText: { fontSize: 16, fontWeight: '700', color: '#0284C7' },
  headerTitleContainer: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  headerSub: { fontSize: 12, color: '#64748B' },

  chatList: { padding: 16, paddingBottom: 20 },
  messageBubble: { maxWidth: '75%', padding: 12, borderRadius: 14, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1 },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#0284C7', borderBottomRightRadius: 2 },
  otherMessage: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderBottomLeftRadius: 2 },
  senderName: { fontSize: 11, fontWeight: '800', marginBottom: 2 },
  messageText: { fontSize: 14, lineHeight: 18 },
  timestamp: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },

  inputContainer: { flexDirection: 'row', padding: 12, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0', alignItems: 'center' },
  textInput: { flex: 1, backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, color: '#0F172A', maxHeight: 100 },
  sendButton: { backgroundColor: '#0284C7', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, marginLeft: 10, justifyContent: 'center', alignItems: 'center' },
  sendButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' }
});