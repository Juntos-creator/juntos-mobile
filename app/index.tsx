import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ConsumerLandingScreen() {
  const router = useRouter();

  const handleRequestService = () => {
    router.push('/register');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* =====================================================
            HEADER
        ====================================================== */}
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

        {/* =====================================================
            HERO
        ====================================================== */}
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
              Conectamos a familias con acompañantes de confianza,
              previamente evaluados y verificados, para brindar compañía,
              apoyo cotidiano y un trato humano que aporta tranquilidad
              a toda la familia.
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
                  <Text style={styles.benefitTitle}>
                    Horarios flexibles
                  </Text>

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

          {/* =====================================================
              IMAGEN
          ====================================================== */}
          <View style={styles.imageCard}>

            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop' }}
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

        {/* =====================================================
            QUIÉNES SOMOS
        ====================================================== */}
        <View style={styles.sectionContainer}>

          <View style={styles.sectionHeadingRow}>
            <View style={styles.sectionAccent} />

            <View>
              <Text style={styles.sectionTitle}>
                ¿Quiénes somos?
              </Text>

              <Text style={styles.sectionSubtitle}>
                Una nueva forma de acompañar
              </Text>
            </View>
          </View>

          <View style={styles.aboutCard}>

            <Text style={styles.sectionParagraph}>
              JUNTOS es una agencia de acompañamiento y cuidado no clínico
              para adultos mayores. Facilitamos a las familias el acceso
              a personas de confianza para brindar compañía, apoyo
              cotidiano y acompañamiento personalizado.
            </Text>

            <Text style={styles.sectionParagraph}>
              Nuestro propósito es ayudar a que los adultos mayores
              disfruten de sus actividades cotidianas con compañía,
              respeto y dignidad, mientras sus familiares cuentan con
              mayor tranquilidad.
            </Text>

          </View>
        </View>

        {/* =====================================================
            QUÉ HACEMOS
        ====================================================== */}
        <View style={styles.sectionContainer}>

          <View style={styles.sectionHeadingRow}>
            <View style={styles.sectionAccent} />

            <View>
              <Text style={styles.sectionTitle}>
                ¿Qué hacemos?
              </Text>

              <Text style={styles.sectionSubtitle}>
                Acompañamiento pensado para la vida cotidiana
              </Text>
            </View>
          </View>

          <View style={styles.cardsContainer}>

            {/* CARD 1 */}
            <View style={styles.featureCard}>

              <View style={[styles.featureIcon, styles.featureBlue]}>
                <Text style={styles.featureIconText}>♡</Text>
              </View>

              <Text style={styles.featureCardTitle}>
                Compañía y acompañamiento
              </Text>

              <Text style={styles.featureCardText}>
                Conversación, lectura, paseos, actividades recreativas
                y compañía durante las actividades cotidianas.
              </Text>

            </View>

            {/* CARD 2 */}
            <View style={styles.featureCard}>

              <View style={[styles.featureIcon, styles.featureGreen]}>
                <Text style={styles.featureIconText}>◷</Text>
              </View>

              <Text style={styles.featureCardTitle}>
                Servicios flexibles
              </Text>

              <Text style={styles.featureCardText}>
                Puedes solicitar servicios por horas, días o de manera
                recurrente según las necesidades de tu familia.
              </Text>

            </View>

            {/* CARD 3 */}
            <View style={styles.featureCard}>

              <View style={[styles.featureIcon, styles.featurePurple]}>
                <Text style={styles.featureIconText}>✓</Text>
              </View>

              <Text style={styles.featureCardTitle}>
                Personas verificadas
              </Text>

              <Text style={styles.featureCardText}>
                Aplicamos procesos de selección, evaluación y verificación
                antes de incorporar acompañantes a nuestra red.
              </Text>

            </View>

            {/* CARD 4 */}
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

        {/* =====================================================
            CÓMO FUNCIONA
        ====================================================== */}
        <View style={styles.sectionContainer}>

          <View style={styles.sectionHeadingRow}>
            <View style={styles.sectionAccent} />

            <View>
              <Text style={styles.sectionTitle}>
                ¿Cómo funciona?
              </Text>

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

        {/* =====================================================
            SEGURIDAD / NO CLÍNICO
        ====================================================== */}
        <View style={styles.safetyContainer}>

          <View style={styles.safetyIcon}>
            <Text style={styles.safetyIconText}>✓</Text>
          </View>

          <View style={styles.safetyTextContainer}>

            <Text style={styles.safetyTitle}>
              Acompañamiento no clínico
            </Text>

            <Text style={styles.safetyText}>
              JUNTOS ofrece compañía y apoyo cotidiano. No realiza
              consultas médicas, diagnósticos, procedimientos clínicos,
              administración de medicamentos ni servicios de enfermería.
            </Text>

          </View>

        </View>

        {/* =====================================================
            CTA FINAL
        ====================================================== */}
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
            <Text style={styles.ctaButtonText}>
              Solicitar acompañamiento
            </Text>

            <Text style={styles.ctaButtonArrow}>
              →
            </Text>
          </TouchableOpacity>

        </View>

        {/* =====================================================
            FOOTER
        ====================================================== */}
        <View style={styles.footer}>

          <Text style={styles.footerBrand}>
            JUNTOS
          </Text>

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


/* ============================================================
   COMPONENTE STEP CON TIPADO ESTRICTO
============================================================ */

interface StepProps {
  number: string;
  title: string;
  description: string;
}

function Step({ number, title, description }: StepProps) {
  return (
    <View style={styles.stepItem}>

      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>
          {number}
        </Text>
      </View>

      <View style={styles.stepContent}>

        <Text style={styles.stepTitle}>
          {title}
        </Text>

        <Text style={styles.stepDescription}>
          {description}
        </Text>

      </View>

    </View>
  );
}


/* ============================================================
   ESTILOS
============================================================ */

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

  /* ================= HEADER ================= */

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

  /* ================= HERO ================= */

  heroContainer: {
    width: '100%',
    maxWidth: 1180,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 55,

    ...Platform.select({
      ios: {
        shadowColor: '#102A43',
        shadowOpacity: 0.08,
        shadowRadius: 20,
        shadowOffset: {
          width: 0,
          height: 8,
        },
      },

      android: {
        elevation: 4,
      },

      web: {
        boxShadow: '0px 8px 30px rgba(16,42,67,0.08)',
      },
    }),
  },

  heroTextContainer: {
    flex: 1,
    paddingRight: 35,
    minWidth: 300,
  },

  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginBottom: 14,
  },

  heroBadgeText: {
    color: '#0369A1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },

  heroTitle: {
    fontSize: 39,
    lineHeight: 47,
    fontWeight: '900',
    color: '#102A43',
    marginBottom: 16,
  },

  heroDescription: {
    fontSize: 16,
    lineHeight: 25,
    color: '#486581',
    marginBottom: 25,
    maxWidth: 600,
  },

  /* ================= BENEFICIOS ================= */

  benefitsContainer: {
    marginBottom: 25,
  },

  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },

  benefitIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  iconBlue: {
    backgroundColor: '#E0F2FE',
  },

  iconPink: {
    backgroundColor: '#FCE7F3',
  },

  iconGreen: {
    backgroundColor: '#DCFCE7',
  },

  benefitIconText: {
    fontSize: 20,
    color: '#0284C7',
    fontWeight: '800',
  },

  benefitTextContainer: {
    flex: 1,
  },

  benefitTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#102A43',
  },

  benefitDescription: {
    fontSize: 12,
    color: '#627D98',
    marginTop: 2,
  },

  /* ================= BOTÓN ================= */

  primaryButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0284C7',
    paddingHorizontal: 21,
    paddingVertical: 14,
    borderRadius: 12,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  primaryButtonArrow: {
    color: '#FFFFFF',
    fontSize: 19,
    marginLeft: 12,
  },

  /* ================= IMAGEN ================= */

  imageCard: {
    width: 470,
    height: 430,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },

  careImage: {
    width: '100%',
    height: '100%',
  },

  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 42, 67, 0.88)',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  overlayIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  overlayIconText: {
    color: '#FFFFFF',
    fontSize: 27,
  },

  overlayContent: {
    flex: 1,
  },

  overlayTextTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  overlayTextSubtitle: {
    color: '#BAE6FD',
    fontSize: 12,
    marginTop: 3,
  },

  /* ================= SECCIONES ================= */

  sectionContainer: {
    width: '100%',
    maxWidth: 1180,
    marginBottom: 55,
  },

  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  sectionAccent: {
    width: 5,
    height: 48,
    backgroundColor: '#0284C7',
    borderRadius: 3,
    marginRight: 12,
  },

  sectionTitle: {
    fontSize: 27,
    fontWeight: '900',
    color: '#102A43',
  },

  sectionSubtitle: {
    fontSize: 13,
    color: '#829AB1',
    marginTop: 2,
  },

  /* ================= QUIÉNES SOMOS ================= */

  aboutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 25,

    ...Platform.select({
      ios: {
        shadowColor: '#102A43',
        shadowOpacity: 0.04,
        shadowRadius: 10,
        shadowOffset: {
          width: 0,
          height: 4,
        },
      },

      android: {
        elevation: 2,
      },

      web: {
        boxShadow: '0px 5px 20px rgba(16,42,67,0.05)',
      },
    }),
  },

  sectionParagraph: {
    fontSize: 15,
    lineHeight: 25,
    color: '#486581',
    marginBottom: 13,
  },

  /* ================= CARDS ================= */

  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  featureCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E6EEF5',
  },

  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  featureBlue: {
    backgroundColor: '#E0F2FE',
  },

  featureGreen: {
    backgroundColor: '#DCFCE7',
  },

  featurePurple: {
    backgroundColor: '#EDE9FE',
  },

  featureOrange: {
    backgroundColor: '#FFEDD5',
  },

  featureIconText: {
    fontSize: 23,
    color: '#0284C7',
    fontWeight: '800',
  },

  featureCardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#102A43',
    marginBottom: 8,
  },

  featureCardText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#627D98',
  },

  /* ================= PASOS ================= */

  stepsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
  },

  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  stepNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  stepNumberText: {
    color: '#0284C7',
    fontWeight: '900',
    fontSize: 14,
  },

  stepContent: {
    flex: 1,
  },

  stepTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#102A43',
    marginBottom: 3,
  },

  stepDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: '#627D98',
  },

  /* ================= SEGURIDAD ================= */

  safetyContainer: {
    width: '100%',
    maxWidth: 1180,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 18,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 55,
  },

  safetyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  safetyIconText: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '900',
  },

  safetyTextContainer: {
    flex: 1,
  },

  safetyTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0C4A6E',
    marginBottom: 4,
  },

  safetyText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#36566F',
  },

  /* ================= CTA ================= */

  ctaContainer: {
    width: '100%',
    maxWidth: 1180,
    backgroundColor: '#102A43',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    marginBottom: 45,
  },

  ctaTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },

  ctaSubtitle: {
    color: '#BCCCDC',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 22,
  },

  ctaButton: {
    backgroundColor: '#0284C7',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  ctaButtonArrow: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 12,
  },

  /* ================= FOOTER ================= */

  footer: {
    width: '100%',
    maxWidth: 1180,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 30,
  },

  footerBrand: {
    fontSize: 22,
    fontWeight: '900',
    color: '#102A43',
    letterSpacing: 2,
    marginBottom: 5,
  },

  footerText: {
    fontSize: 12,
    color: '#829AB1',
    textAlign: 'center',
    marginBottom: 8,
  },

  footerCopyright: {
    fontSize: 11,
    color: '#9FB3C8',
    textAlign: 'center',
  },

});