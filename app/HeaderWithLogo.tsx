import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  subtitle: string;
  onNotificationPress?: () => void;
}

export default function HeaderWithLogo({ title, subtitle, onNotificationPress }: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        {/* Logo integrado con contenedor de respaldo */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/logo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subText}>{subtitle}</Text>
        </View>
      </View>
      
      {onNotificationPress && (
        <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress} activeOpacity={0.8}>
          <Ionicons name="notifications-outline" size={22} color="#0284C7" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#102A43',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  leftSection: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 },
  logoContainer: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#E0F2FE', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  logo: { width: 32, height: 32, borderRadius: 8 },
  textContainer: { flex: 1 },
  titleText: { fontSize: 17, fontWeight: '800', color: '#102A43' },
  subText: { fontSize: 12, color: '#627D98', marginTop: 2, fontWeight: '600' },
  iconButton: { padding: 10, backgroundColor: '#F1F5F9', borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' }
});