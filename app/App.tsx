import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, TouchableOpacity, Text, ScrollView } from 'react-native';

// Importación de las pantallas comerciales y de consumidor
import ConsumerLandingScreen from './index';
import LoginScreen from './auth/login';
import RegisterScreen from './auth/register';
import CompanionKycScreen from './kyc/companion-kyc';
import CheckoutPaymentScreen from './checkout/payment';
import SituationalRoomScreen from './matching/situational-room';
import RatingReviewScreen from './rating/review';

// Importación de módulos operativos y de backoffice
import AdminDashboard from './operaciones/AdminDashboard';
import ClientScreen from './(client)/home';
import CompanionScreen from './(companion)/dashboard';
import FamilyPortalScreen from './(client)/FamilyPortalScreen';
import DispatchSupportScreen from './operaciones/DispatchSupportScreen';
import AuditAccountingScreen from './operaciones/AuditAccountingScreen';
import LegalComplianceScreen from './operaciones/LegalComplianceScreen';

type Role = 'admin' | 'rrhh' | 'contable' | 'legal' | 'cliente' | 'acompanante';
type ModuleType = 
  | 'landing' | 'login' | 'register' | 'kyc' | 'checkout' | 'matching' | 'rating' 
  | 'home' | 'client' | 'companion' | 'family' | 'dispatch' | 'audit' | 'legal';

export default function App() {
  // Rol actual simulado para pruebas (Cámbialo para probar los permisos)
  const [userRole, setUserRole] = useState<Role>('admin');
  const [currentModule, setCurrentModule] = useState<ModuleType>('landing');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* Selector de Roles (Simulador de Sesión para control RBAC) */}
      <View style={styles.roleBar}>
        <Text style={styles.roleBarTitle}>Simular Rol de Usuario:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.roleScroll}>
          {(['admin', 'rrhh', 'contable', 'legal', 'cliente', 'acompanante'] as Role[]).map((role) => (
            <TouchableOpacity 
              key={role} 
              style={[styles.roleBtn, userRole === role && styles.roleBtnActive]}
              onPress={() => {
                setUserRole(role);
                // Si el rol cambia y no tiene permiso al módulo actual, lo mandamos a su pantalla por defecto
                if (role === 'contable') setCurrentModule('audit');
                else if (role === 'legal') setCurrentModule('legal');
                else if (role === 'rrhh') setCurrentModule('dispatch');
                else if (role === 'cliente') setCurrentModule('client');
                else if (role === 'acompanante') setCurrentModule('kyc'); // Acompañante por defecto suele ir a KYC o dashboard
                else setCurrentModule('landing');
              }}
            >
              <Text style={[styles.roleText, userRole === role && styles.roleTextActive]}>
                {role.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Barra superior de navegación filtrada por permisos */}
      <View style={styles.navBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          
          {/* Módulos Comerciales (Ocultos para rrhh, contable y legal puro) */}
          {(userRole === 'admin' || userRole === 'cliente' || userRole === 'acompanante') && (
            <>
              <Text style={styles.sectionLabel}>Comercial:</Text>
              <TouchableOpacity style={[styles.navBtn, currentModule === 'landing' && styles.navBtnActive]} onPress={() => setCurrentModule('landing')}>
                <Text style={[styles.navText, currentModule === 'landing' && styles.navTextActive]}>Landing</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navBtn, currentModule === 'login' && styles.navBtnActive]} onPress={() => setCurrentModule('login')}>
                <Text style={[styles.navText, currentModule === 'login' && styles.navTextActive]}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navBtn, currentModule === 'register' && styles.navBtnActive]} onPress={() => setCurrentModule('register')}>
                <Text style={[styles.navText, currentModule === 'register' && styles.navTextActive]}>Registro</Text>
              </TouchableOpacity>
              
              {/* KYC oculto para el rol CLIENTE */}
              {userRole !== 'cliente' && (
                <TouchableOpacity style={[styles.navBtn, currentModule === 'kyc' && styles.navBtnActive]} onPress={() => setCurrentModule('kyc')}>
                  <Text style={[styles.navText, currentModule === 'kyc' && styles.navTextActive]}>KYC</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={[styles.navBtn, currentModule === 'checkout' && styles.navBtnActive]} onPress={() => setCurrentModule('checkout')}>
                <Text style={[styles.navText, currentModule === 'checkout' && styles.navTextActive]}>Pagos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navBtn, currentModule === 'matching' && styles.navBtnActive]} onPress={() => setCurrentModule('matching')}>
                <Text style={[styles.navText, currentModule === 'matching' && styles.navTextActive]}>Sala Situacional</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navBtn, currentModule === 'rating' && styles.navBtnActive]} onPress={() => setCurrentModule('rating')}>
                <Text style={[styles.navText, currentModule === 'rating' && styles.navTextActive]}>Valoración</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Módulos Operativos (Restringidos según el rol) */}
          {(userRole === 'admin' || userRole === 'rrhh' || userRole === 'contable' || userRole === 'legal') && (
            <>
              <Text style={[styles.sectionLabel, { marginLeft: userRole === 'admin' ? 12 : 0 }]}>Backoffice:</Text>
              
              {/* Solo Administrador ve el Dashboard General y Portal Familiar/Clientes */}
              {(userRole === 'admin') && (
                <>
                  <TouchableOpacity style={[styles.navBtn, currentModule === 'home' && styles.navBtnActive]} onPress={() => setCurrentModule('home')}>
                    <Text style={[styles.navText, currentModule === 'home' && styles.navTextActive]}>Admin Dashboard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.navBtn, currentModule === 'client' && styles.navBtnActive]} onPress={() => setCurrentModule('client')}>
                    <Text style={[styles.navText, currentModule === 'client' && styles.navTextActive]}>Cliente</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.navBtn, currentModule === 'companion' && styles.navBtnActive]} onPress={() => setCurrentModule('companion')}>
                    <Text style={[styles.navText, currentModule === 'companion' && styles.navTextActive]}>Acompañante</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.navBtn, currentModule === 'family' && styles.navBtnActive]} onPress={() => setCurrentModule('family')}>
                    <Text style={[styles.navText, currentModule === 'family' && styles.navTextActive]}>Portal Familiar</Text>
                  </TouchableOpacity>
                </>
              )}

              {/* RRHH / Operaciones ve Dispatch */}
              {(userRole === 'admin' || userRole === 'rrhh') && (
                <TouchableOpacity style={[styles.navBtn, currentModule === 'dispatch' && styles.navBtnActive]} onPress={() => setCurrentModule('dispatch')}>
                  <Text style={[styles.navText, currentModule === 'dispatch' && styles.navTextActive]}>Dispatch / RRHH</Text>
                </TouchableOpacity>
              )}

              {/* Contable ve Auditoría y Contabilidad */}
              {(userRole === 'admin' || userRole === 'contable') && (
                <TouchableOpacity style={[styles.navBtn, currentModule === 'audit' && styles.navBtnActive]} onPress={() => setCurrentModule('audit')}>
                  <Text style={[styles.navText, currentModule === 'audit' && styles.navTextActive]}>Contabilidad</Text>
                </TouchableOpacity>
              )}

              {/* Legal ve Legal y Cumplimiento */}
              {(userRole === 'admin' || userRole === 'legal') && (
                <TouchableOpacity style={[styles.navBtn, currentModule === 'legal' && styles.navBtnActive]} onPress={() => setCurrentModule('legal')}>
                  <Text style={[styles.navText, currentModule === 'legal' && styles.navTextActive]}>Legal & Compliance</Text>
                </TouchableOpacity>
              )}
            </>
          )}

        </ScrollView>
      </View>

      {/* Renderizado dinámico protegido */}
      <View style={styles.content}>
        {currentModule === 'landing' && <ConsumerLandingScreen />}
        {currentModule === 'login' && <LoginScreen />}
        {currentModule === 'register' && <RegisterScreen />}
        {currentModule === 'kyc' && userRole !== 'cliente' && <CompanionKycScreen />}
        {currentModule === 'checkout' && <CheckoutPaymentScreen />}
        {currentModule === 'matching' && <SituationalRoomScreen />}
        {currentModule === 'rating' && <RatingReviewScreen />}
        
        {/* Vistas operativas protegidas */}
        {currentModule === 'home' && (userRole === 'admin') && <AdminDashboard />}
        {currentModule === 'client' && (userRole === 'admin' || userRole === 'cliente') && <ClientScreen />}
        {currentModule === 'companion' && (userRole === 'admin') && <CompanionScreen />}
        {currentModule === 'family' && (userRole === 'admin') && <FamilyPortalScreen />}
        
        {currentModule === 'dispatch' && (userRole === 'admin' || userRole === 'rrhh') && <DispatchSupportScreen />}
        {currentModule === 'audit' && (userRole === 'admin' || userRole === 'contable') && <AuditAccountingScreen />}
        {currentModule === 'legal' && (userRole === 'admin' || userRole === 'legal') && <LegalComplianceScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  roleBar: { backgroundColor: '#0F172A', paddingVertical: 8, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center' },
  roleBarTitle: { color: '#94A3B8', fontSize: 11, fontWeight: '700', marginRight: 8 },
  roleScroll: { alignItems: 'center', gap: 6 },
  roleBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, backgroundColor: '#1E293B' },
  roleBtnActive: { backgroundColor: '#0284C7' },
  roleText: { color: '#94A3B8', fontSize: 11, fontWeight: '700' },
  roleTextActive: { color: '#FFFFFF' },

  navBar: { backgroundColor: '#FFF', paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0', alignItems: 'center' },
  sectionLabel: { fontSize: 10, fontWeight: '700', color: '#64748B', alignSelf: 'center', marginRight: 4, textTransform: 'uppercase' },
  navBtn: { paddingHorizontal: 12, paddingVertical: 6, marginRight: 6, borderRadius: 16, backgroundColor: '#F1F3F4' },
  navBtnActive: { backgroundColor: '#0066CC' },
  navText: { fontSize: 12, fontWeight: '600', color: '#444' },
  navTextActive: { color: '#FFF' },
  content: { flex: 1 }
});