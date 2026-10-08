import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function RegisterScreen() {
  const [userType, setUserType] = useState<'client' | 'companion'>('client');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    alert(`Registrando nueva cuenta de ${userType === 'client' ? 'Cliente' : 'Acompañante'} para: ${fullName}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Cabecera */}
        <View style={styles.header}>
          <Text style={styles.logoText}>JUNTOS</Text>
          <Text style={styles.title}>Crear una Cuenta</Text>
          <Text style={styles.subtitle}>Únete a nuestra plataforma de cuidado y confianza</Text>
        </View>

        {/* Selector de Tipo de Usuario */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, userType === 'client' && styles.activeTab]} 
            onPress={() => setUserType('client')}
          >
            <Text style={[styles.tabText, userType === 'client' && styles.activeTabText]}>Soy Cliente / Familiar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, userType === 'companion' && styles.activeTab]} 
            onPress={() => setUserType('companion')}
          >
            <Text style={[styles.tabText, userType === 'companion' && styles.activeTabText]}>Soy Acompañante</Text>
          </TouchableOpacity>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. María Pérez" 
            placeholderTextColor="#94A3B8"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput 
            style={styles.input} 
            placeholder="ejemplo@correo.com" 
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Teléfono / Celular</Text>
          <TextInput 
            style={styles.input} 
            placeholder="809-000-0000" 
            placeholderTextColor="#94A3B8"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput 
            style={styles.input} 
            placeholder="••••••••" 
            placeholderTextColor="#94A3B8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>
              {userType === 'companion' ? 'Continuar a Validación KYC' : 'Crear Cuenta y Continuar'}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { padding: 24, justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 24, width: '100%', maxWidth: 400 },
  logoText: { fontSize: 24, fontWeight: '900', color: '#0F172A', letterSpacing: 2, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '800', color: '#1E293B', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#64748B', textAlign: 'center' },
  
  tabContainer: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 12, padding: 4, width: '100%', maxWidth: 400, marginBottom: 24 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10 },
  activeTab: { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  tabText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  activeTabText: { color: '#0F172A', fontWeight: '700' },

  formContainer: { width: '100%', maxWidth: 400 },
  label: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#0F172A', marginBottom: 16 },
  registerButton: { backgroundColor: '#0F172A', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  registerButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' }
});