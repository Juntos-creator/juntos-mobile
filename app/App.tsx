import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, TouchableOpacity, Text, ScrollView } from 'react-native';

// Rutas exactas basadas en la estructura actual de la carpeta app/
import AdminDashboard from './AdminDashboard';
import ClientScreen from './(client)/home';
import CompanionScreen from './(companion)/dashboard';
import FamilyPortalScreen from './FamilyPortalScreen';
import DispatchSupportScreen from './DispatchSupportScreen';
import AuditAccountingScreen from './AuditAccountingScreen';
import LegalComplianceScreen from './LegalComplianceScreen';

export default function App() {
  const [currentModule, setCurrentModule] = useState<'home' | 'client' | 'companion' | 'family' | 'dispatch' | 'audit' | 'legal'>('home');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* Barra superior de navegación rápida entre perfiles */}
      <View style={styles.navBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.navBtn, currentModule === 'home' && styles.navBtnActive]} 
            onPress={() => setCurrentModule('home')}
          >
            <Text style={[styles.navText, currentModule === 'home' && styles.navTextActive]}>Inicio (Admin)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navBtn, currentModule === 'client' && styles.navBtnActive]} 
            onPress={() => setCurrentModule('client')}
          >
            <Text style={[styles.navText, currentModule === 'client' && styles.navTextActive]}>Cliente</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navBtn, currentModule === 'companion' && styles.navBtnActive]} 
            onPress={() => setCurrentModule('companion')}
          >
            <Text style={[styles.navText, currentModule === 'companion' && styles.navTextActive]}>Acompañante</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navBtn, currentModule === 'family' && styles.navBtnActive]} 
            onPress={() => setCurrentModule('family')}
          >
            <Text style={[styles.navText, currentModule === 'family' && styles.navTextActive]}>Portal Familiar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navBtn, currentModule === 'dispatch' && styles.navBtnActive]} 
            onPress={() => setCurrentModule('dispatch')}
          >
            <Text style={[styles.navText, currentModule === 'dispatch' && styles.navTextActive]}>Dispatch / Ayuda</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navBtn, currentModule === 'audit' && styles.navBtnActive]} 
            onPress={() => setCurrentModule('audit')}
          >
            <Text style={[styles.navText, currentModule === 'audit' && styles.navTextActive]}>Auditoría y Contabilidad</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navBtn, currentModule === 'legal' && styles.navBtnActive]} 
            onPress={() => setCurrentModule('legal')}
          >
            <Text style={[styles.navText, currentModule === 'legal' && styles.navTextActive]}>Legal y Cumplimiento</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Renderizado dinámico del módulo seleccionado */}
      <View style={styles.content}>
        {currentModule === 'home' && <AdminDashboard />}
        {currentModule === 'client' && <ClientScreen />}
        {currentModule === 'companion' && <CompanionScreen />}
        {currentModule === 'family' && <FamilyPortalScreen />}
        {currentModule === 'dispatch' && <DispatchSupportScreen />}
        {currentModule === 'audit' && <AuditAccountingScreen />}
        {currentModule === 'legal' && <LegalComplianceScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  navBar: { backgroundColor: '#FFF', paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  navBtn: { paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, borderRadius: 20, backgroundColor: '#F1F3F4' },
  navBtnActive: { backgroundColor: '#0066CC' },
  navText: { fontSize: 13, fontWeight: '600', color: '#444' },
  navTextActive: { color: '#FFF' },
  content: { flex: 1 }
});