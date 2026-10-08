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
        {/* Logo integrado */}
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subText}>{subtitle}</Text>
        </View>
      </View>
      
      {onNotificationPress && (
        <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
          <Ionicons name="notifications-outline" size={22} color="#0066CC" />
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
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    elevation: 1,
  },
  leftSection: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  logo: { width: 42, height: 42, marginRight: 12, borderRadius: 8 },
  textContainer: { flex: 1 },
  titleText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  subText: { fontSize: 12, color: '#666' },
  iconButton: { padding: 8, backgroundColor: '#E2E8F0', borderRadius: 8 }
});