import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ConsumerLandingScreen() {
  const router = useRouter();

  const handleRequestService = () => {
    router.push('/auth/register' as any);
  };

  const handleRegister = () => {
    router.push('/auth/register' as any);
  };

  const handleLogin = () => {
    router.push('/auth/login' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoMark}>
              <Text style={styles.logoHeart}>♡</Text>
            </View>

            <View>
              <Text style={styles.brandTitle}>JUNTOS</Text>
              <Text style={styles.brandSubtitle}>
                Acompañamiento y cuidado no clínico
              </Text>
            </View>
          </View>

          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={styles.registerButtonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* HERO */}
        <View style={styles.heroContainer}>
          {/* TEXTO */}
          <View style={styles.heroTextContainer}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>
                JUNTOS · PARA ADULTOS MAYORES
              </Text>
            </View>

            <Text style={styles.heroTitle}>
              Compañía, cuidado y bienestar para el adulto mayor
            </Text>

            <Text style={styles.heroDescription}>
              Conectamos a familias con acompañantes de confianza, previamente
              evaluados y verificados, para brindar compañía, apoyo cotidiano y un
              trato humano que aporta tranquilidad a toda la familia.
            </Text>

            {/* BENEFICIOS */}
            <View style={styles.benefitsContainer}>
              <View style={styles.benefitItem}>
                <View style={[styles.benefitIcon, styles.iconBlue]}>
                  <Text style={styles.benefitIconText}>✓</Text>
                </View>

                <View style={styles.benefitTextContainer}>
                  <Text style={styles.benefitTitle}>
                    Acompañantes verificados
                  </Text>
                  <Text style={styles.benefitDescription}>
                    Personas evaluadas antes de formar parte de JUNTOS.
                  </Text>
                </View>
              </View>

              <View style={styles.benefitItem}>
                <View style={[styles.benefitIcon, styles.iconPink]}>
                  <Text style={styles.benefitIconText}>♡</Text>
                </View>

                <View style={styles.benefitTextContainer}>
                  <Text style={styles.benefitTitle}>
                    Atención personalizada
                  </Text>
                  <Text style={styles.benefitDescription}>
                    Servicios adaptados a las necesidades de cada familia.
                  </Text>
                </View>
              </View>

              <View style={styles.benefitItem}>
                <View style={[styles.benefitIcon, styles.iconGreen]}>
                  <Text style={styles.benefitIconText}>◷</Text>
                </View>

                <View style={styles.benefitTextContainer}>
                  <Text style={styles.benefitTitle}>Horarios flexibles</Text>
                  <Text style={styles.benefitDescription}>
                    Servicios por horas, días o de manera recurrente.
                  </Text>
                </View>
              </View>
            </View>

            {/* CTA */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleRequestService}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>
                Solicitar acompañamiento
              </Text>
              <Text style={styles.primaryButtonArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* IMAGEN */}
          <View style={styles.imageCard}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop',
              }}
              style={styles.careImage}
              resizeMode="cover"
            />

            <View style={styles.imageOverlay}>
              <View style={styles.overlayIcon}>
                <Text style={styles.overlayIconText}>♡</Text>
              </View>

              <View style={styles.overlayContent}>
                <Text style={styles.overlayTextTitle}>
                  Acompañamiento para adultos mayores
                </Text>
                <Text style={styles.overlayTextSubtitle}>
                  Compañía, apoyo cotidiano y bienestar.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* QUIÉNES SOMOS */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeadingRow}>
            <View style={styles.sectionAccent} />
            <View>
              <Text style={styles.sectionTitle}>¿Quiénes somos?</Text>
              <Text style={styles.sectionSubtitle}>
                Una nueva forma de acompañar
              </Text>
            </View>
          </View>

          <View style={styles.aboutCard}>
            <Text style={styles.sectionParagraph}>
              JUNTOS es una agencia de acompañamiento y cuidado no clínico para
              adultos mayores. Facilitamos a las familias el acceso a personas
              de confianza para brindar compañía, apoyo cotidiano y
              acompañamiento personalizado.
            </Text>

            <Text style={styles.sectionParagraph}>
              Nuestro propósito es ayudar a que los adultos mayores disfruten de
              sus actividades cotidianas con compañía, respeto y dignidad,
              mientras sus familiares cuentan con mayor tranquilidad.
            </Text>
          </View>
        </View>

        {/* QUÉ HACEMOS */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeadingRow}>
            <View style={styles.sectionAccent} />
            <View>
              <Text style={styles.sectionTitle}>¿Qué hacemos?</Text>
              <Text style={styles.sectionSubtitle}>
                Acompañamiento pensado para la vida cotidiana
              </Text>
            </View>
          </View>

          <View style={styles.cardsContainer}>
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, styles.featureBlue]}>
                <Text style={styles.featureIconText}>♡</Text>
              </View>
              <Text style={styles.featureCardTitle}>
                Compañía y acompañamiento
              </Text>
              <Text style={styles.featureCardText}>
                Conversación, lectura, paseos, actividades recreativas y
                compañía durante las actividades cotidianas.
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, styles.featureGreen]}>
                <Text style={styles.featureIconText}>◷</Text>
              </View>
              <Text style={styles.featureCardTitle}>Servicios flexibles</Text>
              <Text style={styles.featureCardText}>
                Puedes solicitar servicios por horas, días o de manera
                recurrente según las necesidades de tu familia.
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, styles.featurePurple]}>
                <Text style={styles.featureIconText}>✓</Text>
              </View>
              <Text style={styles.featureCardTitle}>Personas verificadas</Text>
              <Text style={styles.featureCardText}>
                Aplicamos procesos de selección, evaluación y verificación
                antes de incorporar acompañantes a nuestra red.
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, styles.featureOrange]}>
                <Text style={styles.featureIconText}>⌂</Text>
              </View>
              <Text style={styles.featureCardTitle}>
                Tranquilidad para la familia
              </Text>
              <Text style={styles.featureCardText}>
                La familia puede conocer el estado del servicio y recibir
                información sobre el acompañamiento.
              </Text>
            </View>
          </View>
        </View>

        {/* CÓMO FUNCIONA */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeadingRow}>
            <View style={styles.sectionAccent} />
            <View>
              <Text style={styles.sectionTitle}>¿Cómo funciona?</Text>
              <Text style={styles.sectionSubtitle}>
                Solicitar acompañamiento es sencillo
              </Text>
            </View>
          </View>

          <View style={styles.stepsContainer}>
            <Step
              number="01"
              title="Crea tu cuenta"
              description="Registra tus datos y los del adulto mayor."
            />
            <Step
              number="02"
              title="Solicita el servicio"
              description="Selecciona el tipo de acompañamiento, fecha y horario."
            />
            <Step
              number="03"
              title="JUNTOS asigna"
              description="Nuestro equipo gestiona la asignación del acompañante."
            />
            <Step
              number="04"
              title="Recibe el acompañamiento"
              description="El servicio comienza con registro de llegada y finalización."
            />
          </View>
        </View>

        {/* SEGURIDAD / NO CLÍNICO */}
        <View style={styles.safetyContainer}>
          <View style={styles.safetyIcon}>
            <Text style={styles.safetyIconText}>✓</Text>
          </View>

          <View style={styles.safetyTextContainer}>
            <Text style={styles.safetyTitle}>Acompañamiento no clínico</Text>
            <Text style={styles.safetyText}>
              JUNTOS ofrece compañía y apoyo cotidiano. No realiza consultas
              médicas, diagnósticos, procedimientos clínicos, administración de
              medicamentos ni servicios de enfermería.
            </Text>
          </View>
        </View>

        {/* CTA FINAL */}
        <View style={styles.ctaContainer}>
          <Text style={styles.ctaTitle}>
            Tu familiar merece compañía y bienestar
          </Text>
          <Text style={styles.ctaSubtitle}>
            Permítenos ayudarte a encontrar el acompañamiento adecuado.
          </Text>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={handleRequestService}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaButtonText}>Solicitar acompañamiento</Text>
            <Text style={styles.ctaButtonArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>JUNTOS</Text>
          <Text style={styles.footerText}>
            Acompañamiento y cuidado no clínico para adultos mayores.
          </Text>
          <Text style={styles.footerCopyright}>
            © {new Date().getFullYear()} JUNTOS. Todos los derechos reservados.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface StepProps {
  number: string;
  title: string;
  description: string;
}

function Step({ number, title, description }: StepProps) {
  return (
    <View style={styles.stepItem}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>

      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    maxWidth: 1180,
    minHeight: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoMark: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoHeart: {
    fontSize: 31,
    color: '#0284C7',
    fontWeight: '700',
  },
  brandTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#102A43',
    letterSpacing: 2,
  },
  brandSubtitle: {
    fontSize: 11,
    color: '#0284C7',
    fontWeight: '600',
    marginTop: 2,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    marginRight: 8,
    borderRadius: 10,
  },
  loginButtonText: {
    color: '#334E68',
    fontSize: 14,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#0284C7',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 10,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  heroContainer: {
    width: '100%',
    maxWidth: 1180,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 28,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  heroTextContainer: {
    flex: 1,
    minWidth: 300,
    marginRight: 20,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  heroBadgeText: {
    color: '#0284C7',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#102A43',
    lineHeight: 40,
    marginBottom: 16,
  },
  heroDescription: {
    fontSize: 16,
    color: '#486581',
    lineHeight: 24,
    marginBottom: 24,
  },
  benefitsContainer: {
    marginBottom: 28,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  benefitIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  iconBlue: { backgroundColor: '#E0F2FE' },
  iconPink: { backgroundColor: '#FCE7F3' },
  iconGreen: { backgroundColor: '#DCFCE7' },
  benefitIconText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0284C7',
  },
  benefitTextContainer: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#102A43',
  },
  benefitDescription: {
    fontSize: 13,
    color: '#627D98',
    marginTop: 2,
  },
  primaryButton: {
    backgroundColor: '#0284C7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  primaryButtonArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  imageCard: {
    width: '100%',
    maxWidth: 480,
    minWidth: 280,
    height: 420,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 20,
  },
  careImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlayIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  overlayIconText: {
    color: '#0284C7',
    fontSize: 20,
  },
  overlayContent: {
    flex: 1,
  },
  overlayTextTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#102A43',
  },
  overlayTextSubtitle: {
    fontSize: 12,
    color: '#627D98',
    marginTop: 2,
  },
  sectionContainer: {
    width: '100%',
    maxWidth: 1180,
    marginBottom: 35,
  },
  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionAccent: {
    width: 4,
    height: 36,
    backgroundColor: '#0284C7',
    borderRadius: 2,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#102A43',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#627D98',
    marginTop: 2,
  },
  aboutCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
  },
  sectionParagraph: {
    fontSize: 15,
    color: '#486581',
    lineHeight: 24,
    marginBottom: 12,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    minWidth: 260,
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 18,
    marginBottom: 16,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  featureBlue: { backgroundColor: '#E0F2FE' },
  featureGreen: { backgroundColor: '#DCFCE7' },
  featurePurple: { backgroundColor: '#F3E8FF' },
  featureOrange: { backgroundColor: '#FFEDD5' },
  featureIconText: {
    fontSize: 20,
    color: '#0284C7',
  },
  featureCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#102A43',
    marginBottom: 8,
  },
  featureCardText: {
    fontSize: 13,
    color: '#627D98',
    lineHeight: 20,
  },
  stepsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0284C7',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#102A43',
  },
  stepDescription: {
    fontSize: 13,
    color: '#627D98',
    marginTop: 4,
  },
  safetyContainer: {
    width: '100%',
    maxWidth: 1180,
    backgroundColor: '#FEF3C7',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
  },
  safetyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  safetyIconText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  safetyTextContainer: {
    flex: 1,
  },
  safetyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  safetyText: {
    fontSize: 13,
    color: '#B45309',
    lineHeight: 18,
  },
  ctaContainer: {
    width: '100%',
    maxWidth: 1180,
    backgroundColor: '#102A43',
    borderRadius: 24,
    padding: 36,
    alignItems: 'center',
    marginBottom: 40,
  },
  ctaTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaSubtitle: {
    fontSize: 15,
    color: '#9FB3C8',
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#0284C7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  ctaButtonArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    width: '100%',
    maxWidth: 1180,
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E4E9F0',
  },
  footerBrand: {
    fontSize: 18,
    fontWeight: '900',
    color: '#102A43',
    letterSpacing: 2,
    marginBottom: 6,
  },
  footerText: {
    fontSize: 13,
    color: '#627D98',
    textAlign: 'center',
    marginBottom: 12,
  },
  footerCopyright: {
    fontSize: 12,
    color: '#9FB3C8',
  },
});