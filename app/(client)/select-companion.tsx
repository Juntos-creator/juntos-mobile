import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Companion {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  trips: number;
  image: string;
  ratePerHour: number;
}

const COMPANIONS: Companion[] = [
  {
    id: '1',
    name: 'Ana Martínez',
    specialty: 'Especialista en Lectura y Conversación',
    rating: 4.9,
    trips: 48,
    ratePerHour: 1500,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
  },
  {
    id: '2',
    name: 'Carlos Gómez',
    specialty: 'Acompañante de Paseos y Recados',
    rating: 5.0,
    trips: 32,
    ratePerHour: 1400,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
  },
  {
    id: '3',
    name: 'Laura Peralta',
    specialty: 'Apoyo en Actividades Recreativas',
    rating: 4.8,
    trips: 19,
    ratePerHour: 1300,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200',
  },
];

const HEALTH_CENTERS = [
  'Centro Médico UCE [Distrito Nacional]',
  'Hospital General Plaza de la Salud [Distrito Nacional]',
  'Cedimat [Distrito Nacional]',
  'Centro de Medicina Avanzada Doctor Abel González',
  'Hospital Metropolitano de Santiago (HOMS) / Sucursal SD',
  'Cruz Jiminián [Santo Domingo Oeste]',
  'Medicalnet [Distrito Nacional]',
];

export default function SelectCompanionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [requestedBy, setRequestedBy] = useState<'client' | 'family'>('client');
  const [selectedCompanionId, setSelectedCompanionId] = useState<string>('1');
  const [sector, setSector] = useState<string>('Distrito Nacional');
  
  const [destinationType, setDestinationType] = useState<'home' | 'health_center'>('home');
  const [address, setAddress] = useState<string>('');
  const [selectedHealthCenter, setSelectedHealthCenter] = useState<string>(HEALTH_CENTERS[0]);
  const [gpsLocating, setGpsLocating] = useState<boolean>(false);

  const [hours, setHours] = useState<number>(2);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (params.requested_by === 'family' || params.requested_by === 'client') {
      setRequestedBy(params.requested_by as 'client' | 'family');
    } else if (Platform.OS === 'web') {
      const storedRole = localStorage.getItem('juntos_user_role');
      if (storedRole === 'family') {
        setRequestedBy('family');
      } else {
        setRequestedBy('client');
      }
    }
  }, [params.requested_by]);

  const isFamily = requestedBy === 'family';
  const selectedCompanion = COMPANIONS.find((c) => c.id === selectedCompanionId) || COMPANIONS[0];
  const subtotal = selectedCompanion.ratePerHour * hours;
  const serviceFee = 250;
  const total = subtotal + serviceFee;

  const handleFetchGps = () => {
    setGpsLocating(true);
    setTimeout(() => {
      setGpsLocating(false);
      setAddress('Av. Máximo Gómez esq. Pedro Henríquez Ureña, Santo Domingo');
      if (Platform.OS === 'web') {
        window.alert('¡Ubicación GPS obtenida con éxito!');
      } else {
        Alert.alert('GPS', 'Ubicación actual fijada correctamente.');
      }
    }, 1000);
  };

  const handleConfirmAndPay = () => {
    const destinationDetail = destinationType === 'home' ? address : selectedHealthCenter;

    if (!destinationDetail.trim() && destinationType === 'home') {
      const msg = 'Por favor ingresa o detecta la dirección de casa por GPS.';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Atención', msg);
      return;
    }

    const alertTitle = '¡Hoja de Pago y Solicitud Confirmada!';
    const alertMessage = `Total a Pagar: RD$ ${total.toLocaleString()}\nAcompañante: ${selectedCompanion.name}\nDestino: ${destinationDetail}\n\nIngresando a la Sala Situacional...`;

    if (Platform.OS === 'web') {
      window.alert(alertTitle + '\n\n' + alertMessage);
      router.push('/matching/situational-room');
    } else {
      Alert.alert(alertTitle, alertMessage, [
        {
          text: 'Continuar a Sala Situacional',
          onPress: () => router.push('/matching/situational-room'),
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={true}
      >
        
        {/* CABECERA */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={18} color="#0284C7" />
            <Text style={styles.backBtnText}>Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/')} style={styles.brandRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoHeart}>♡</Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>JUNTOS</Text>
              <Text style={styles.brandSubtitle}>Reserva y Hoja de Pago</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* IDENTIFICACIÓN DE ROL AUTENTICADO */}
        <View style={styles.roleHeaderCard}>
          <Text style={styles.roleHeaderTitle}>¿Quién realiza la solicitud?</Text>
          <Text style={styles.roleHeaderSub}>Perfil autenticado mediante sesión activa.</Text>

          <View style={[styles.roleBadgeBox, isFamily && styles.roleBadgeBoxFamily]}>
            <Text style={styles.roleBadgeIcon}>{isFamily ? '👥' : '👵'}</Text>
            <View>
              <Text style={styles.roleBadgeLabel}>SOLICITANTE IDENTIFICADO</Text>
              <Text style={styles.roleBadgeValue}>
                {isFamily ? 'Familiar / Tutor Registrado' : 'Cliente Directo (Adulto Mayor)'}
              </Text>
            </View>
          </View>
        </View>

        {/* 1. ELIGE UN ACOMPAÑANTE VERIFICADO */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>1. Elige un Acompañante Verificado</Text>

          <View style={styles.companionsList}>
            {COMPANIONS.map((item) => {
              const isSelected = item.id === selectedCompanionId;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.companionCard, isSelected && styles.companionCardSelected]}
                  onPress={() => setSelectedCompanionId(item.id)}
                  activeOpacity={0.85}
                >
                  <Image source={{ uri: item.image }} style={styles.companionAvatar} />
                  <View style={styles.companionInfo}>
                    <Text style={styles.companionName}>{item.name}</Text>
                    <Text style={styles.companionSpec}>{item.specialty}</Text>
                    <Text style={styles.companionMeta}>
                      ⭐ {item.rating} ({item.trips} acompañamientos) • RD$ {item.ratePerHour}/hr
                    </Text>
                  </View>
                  <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                    {isSelected && <View style={styles.radioInnerCircle} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 2. UBICACIÓN Y TIPO DE DESTINO */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>2. Ubicación y Tipo de Destino</Text>

          <Text style={styles.inputLabel}>Selecciona el destino del servicio:</Text>
          <View style={styles.destinationTypeRow}>
            <TouchableOpacity
              style={[styles.destTypeBtn, destinationType === 'home' && styles.destTypeBtnActive]}
              onPress={() => setDestinationType('home')}
            >
              <Ionicons name="home-outline" size={18} color={destinationType === 'home' ? '#0284C7' : '#64748B'} style={{ marginRight: 6 }} />
              <Text style={[styles.destTypeBtnText, destinationType === 'home' && styles.destTypeBtnTextActive]}>Casa / Residencia</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.destTypeBtn, destinationType === 'health_center' && styles.destTypeBtnActive]}
              onPress={() => setDestinationType('health_center')}
            >
              <Ionicons name="medical-outline" size={18} color={destinationType === 'health_center' ? '#0284C7' : '#64748B'} style={{ marginRight: 6 }} />
              <Text style={[styles.destTypeBtnText, destinationType === 'health_center' && styles.destTypeBtnTextActive]}>Centro de Salud</Text>
            </TouchableOpacity>
          </View>

          {destinationType === 'home' ? (
            <View style={{ marginTop: 12 }}>
              <Text style={styles.inputLabel}>Dirección de Residencia</Text>
              <View style={styles.addressInputRow}>
                <TextInput
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  placeholder="Ej. Calle 3ra, Res. Los Prados..."
                  placeholderTextColor="#94A3B8"
                  value={address}
                  onChangeText={setAddress}
                />
                <TouchableOpacity style={styles.gpsBtn} onPress={handleFetchGps} activeOpacity={0.8}>
                  <Ionicons name="locate" size={18} color="#FFFFFF" style={{ marginRight: 4 }} />
                  <Text style={styles.gpsBtnText}>{gpsLocating ? 'Buscando...' : 'GPS'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{ marginTop: 12 }}>
              <Text style={styles.inputLabel}>Repertorio de Centros de Salud (Santo Domingo)</Text>
              <View style={styles.centersList}>
                {HEALTH_CENTERS.map((center) => {
                  const isCenterSelected = selectedHealthCenter === center;
                  return (
                    <TouchableOpacity
                      key={center}
                      style={[styles.centerChip, isCenterSelected && styles.centerChipActive]}
                      onPress={() => setSelectedHealthCenter(center)}
                    >
                      <Ionicons name="medkit-outline" size={14} color={isCenterSelected ? '#0284C7' : '#64748B'} style={{ marginRight: 6 }} />
                      <Text style={[styles.centerChipText, isCenterSelected && styles.centerChipTextActive]}>{center}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          <Text style={[styles.inputLabel, { marginTop: 18 }]}>¿A qué zona o sector pertenece?</Text>
          <View style={styles.sectorsRow}>
            {['Distrito Nacional', 'Santo Domingo Este', 'Santo Domingo Norte', 'Santo Domingo Oeste'].map((sec) => (
              <TouchableOpacity
                key={sec}
                style={[styles.sectorChip, sector === sec && styles.sectorChipActive]}
                onPress={() => setSector(sec)}
              >
                <Text style={[styles.sectorChipText, sector === sec && styles.sectorChipTextActive]}>{sec}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.inputLabel, { marginTop: 18 }]}>Duración aproximada (Horas)</Text>
          <View style={styles.hoursRow}>
            {[1, 2, 3, 4, 5].map((h) => (
              <TouchableOpacity
                key={h}
                style={[styles.hourBtn, hours === h && styles.hourBtnActive]}
                onPress={() => setHours(h)}
              >
                <Text style={[styles.hourBtnText, hours === h && styles.hourBtnTextActive]}>{h}h</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 3. DETALLES ADICIONALES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>3. Detalles Adicionales</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Especificaciones del acompañamiento, indicaciones del punto de encuentro..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={3}
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {/* 4. HOJA DE PAGO Y FACTURACIÓN PREVIA */}
        <View style={styles.invoiceCard}>
          <Text style={styles.invoiceTitle}>📋 Hoja de Pago Estimada</Text>
          
          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceLabel}>Acompañante ({hours} hora{hours > 1 ? 's' : ''}):</Text>
            <Text style={styles.invoiceValue}>RD$ {subtotal.toLocaleString()}</Text>
          </View>

          <View style={styles.invoiceRow}>
            <Text style={styles.invoiceLabel}>Tarifa Operativa y Gestión JUNTOS:</Text>
            <Text style={styles.invoiceValue}>RD$ {serviceFee.toLocaleString()}</Text>
          </View>

          <View style={[styles.invoiceRow, styles.invoiceTotalRow]}>
            <Text style={styles.invoiceTotalText}>Total Estimado:</Text>
            <Text style={styles.invoiceTotalAmount}>RD$ {total.toLocaleString()}</Text>
          </View>
        </View>

        {/* BOTÓN DE SOLICITUD Y PAGO FINAL VISIBLE */}
        <View style={styles.bottomActionContainer}>
          <TouchableOpacity style={styles.confirmAndPayBtn} onPress={handleConfirmAndPay} activeOpacity={0.88}>
            <Ionicons name="card-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.confirmAndPayBtnText}>Solicitar y Ver Hoja de Pago →</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FC' },
  scrollView: { flex: 1, width: '100%' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 140, alignItems: 'center', flexGrow: 1 },

  header: { width: '100%', maxWidth: 720, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backBtnText: { fontSize: 14, fontWeight: '800', color: '#0284C7', marginLeft: 6 },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  logoMark: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  logoHeart: { fontSize: 22, color: '#0284C7', fontWeight: '700' },
  brandTitle: { fontSize: 18, fontWeight: '900', color: '#102A43', letterSpacing: 1.5 },
  brandSubtitle: { fontSize: 10, color: '#0284C7', fontWeight: '700' },

  roleHeaderCard: { width: '100%', maxWidth: 720, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 16 },
  roleHeaderTitle: { fontSize: 16, fontWeight: '900', color: '#102A43' },
  roleHeaderSub: { fontSize: 12, color: '#627D98', marginBottom: 14 },
  roleBadgeBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F9FF', borderWidth: 1, borderColor: '#BAE6FD', padding: 12, borderRadius: 14, gap: 12 },
  roleBadgeBoxFamily: { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' },
  roleBadgeIcon: { fontSize: 24 },
  roleBadgeLabel: { fontSize: 10, fontWeight: '900', color: '#0284C7', letterSpacing: 0.5 },
  roleBadgeValue: { fontSize: 14, fontWeight: '900', color: '#102A43' },

  sectionCard: { width: '100%', maxWidth: 720, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#102A43', marginBottom: 14 },

  companionsList: { gap: 10 },
  companionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 16, padding: 12 },
  companionCardSelected: { backgroundColor: '#F0F9FF', borderColor: '#0284C7' },
  companionAvatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  companionInfo: { flex: 1 },
  companionName: { fontSize: 15, fontWeight: '900', color: '#102A43' },
  companionSpec: { fontSize: 12, color: '#627D98' },
  companionMeta: { fontSize: 11, fontWeight: '800', color: '#D97706', marginTop: 2 },
  radioCircle: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' },
  radioCircleSelected: { borderColor: '#0284C7' },
  radioInnerCircle: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#0284C7' },

  inputLabel: { fontSize: 13, fontWeight: '800', color: '#334E68', marginBottom: 8 },
  
  destinationTypeRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  destTypeBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingVertical: 12 },
  destTypeBtnActive: { backgroundColor: '#F0F9FF', borderColor: '#0284C7' },
  destTypeBtnText: { fontSize: 13, fontWeight: '700', color: '#475569' },
  destTypeBtnTextActive: { color: '#0284C7', fontWeight: '900' },

  addressInputRow: { flexDirection: 'row', gap: 8 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 13, color: '#102A43' },
  gpsBtn: { backgroundColor: '#0284C7', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, borderRadius: 12, justifyContent: 'center' },
  gpsBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },

  centersList: { gap: 6 },
  centerChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  centerChipActive: { backgroundColor: '#F0F9FF', borderColor: '#0284C7' },
  centerChipText: { fontSize: 12, fontWeight: '700', color: '#475569' },
  centerChipTextActive: { color: '#0284C7', fontWeight: '900' },

  sectorsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sectorChip: { backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  sectorChipActive: { backgroundColor: '#0284C7', borderColor: '#0284C7' },
  sectorChipText: { fontSize: 12, fontWeight: '700', color: '#475569' },
  sectorChipTextActive: { color: '#FFFFFF', fontWeight: '800' },

  hoursRow: { flexDirection: 'row', gap: 10 },
  hourBtn: { flex: 1, backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingVertical: 10, alignItems: 'center' },
  hourBtnActive: { backgroundColor: '#0284C7', borderColor: '#0284C7' },
  hourBtnText: { fontSize: 13, fontWeight: '800', color: '#475569' },
  hourBtnTextActive: { color: '#FFFFFF' },

  textArea: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 14, padding: 14, fontSize: 13, color: '#102A43', height: 80, textAlignVertical: 'top' },

  invoiceCard: { width: '100%', maxWidth: 720, backgroundColor: '#F0FDF4', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#86EFAC', marginBottom: 20 },
  invoiceTitle: { fontSize: 16, fontWeight: '900', color: '#166534', marginBottom: 12 },
  invoiceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  invoiceLabel: { fontSize: 13, color: '#15803D', fontWeight: '700' },
  invoiceValue: { fontSize: 13, color: '#15803D', fontWeight: '800' },
  invoiceTotalRow: { borderTopWidth: 1, borderTopColor: '#BBF7D0', paddingTop: 10, marginTop: 4 },
  invoiceTotalText: { fontSize: 15, fontWeight: '900', color: '#14532D' },
  invoiceTotalAmount: { fontSize: 16, fontWeight: '900', color: '#16A34A' },

  bottomActionContainer: { width: '100%', maxWidth: 720, marginBottom: 20 },
  confirmAndPayBtn: { backgroundColor: '#16A34A', paddingVertical: 18, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: '#16A34A', shadowOpacity: 0.3, shadowRadius: 10, elevation: 4 },
  confirmAndPayBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
});