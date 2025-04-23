// Structure de base pour l'application mobile FiMySolutions
// Ce fichier définit l'architecture et les composants principaux de l'application

// Configuration de l'application React Native
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';

// Définition des traductions
const translations = {
  fr: {
    home: 'Accueil',
    explore: 'Explorer',
    gifts: 'Mes cadeaux',
    profile: 'Profil',
    welcome: 'Bienvenue sur FiMySolutions',
    discover: 'Découvrez et offrez des expériences authentiques',
    featured: 'Expériences en vedette',
    categories: 'Catégories',
    viewAll: 'Voir tout',
    hotels: 'Séjours',
    restaurants: 'Gastronomie',
    wellness: 'Bien-être',
    activities: 'Activités',
    workshops: 'Ateliers',
    from: 'À partir de',
    login: 'Connexion',
    signup: 'Inscription',
    email: 'Email',
    password: 'Mot de passe',
    forgotPassword: 'Mot de passe oublié ?',
    noAccount: 'Pas encore de compte ?',
    createAccount: 'Créer un compte',
    alreadyAccount: 'Déjà un compte ?',
    fullName: 'Nom complet',
    confirmPassword: 'Confirmer le mot de passe',
    register: 'S'inscrire',
    myGifts: 'Mes cartes-cadeaux',
    received: 'Reçus',
    sent: 'Envoyés',
    noGiftsYet: 'Vous n'avez pas encore de cartes-cadeaux',
    browseExperiences: 'Parcourir les expériences',
    settings: 'Paramètres',
    language: 'Langue',
    notifications: 'Notifications',
    paymentMethods: 'Moyens de paiement',
    help: 'Aide et support',
    logout: 'Déconnexion',
    experienceDetails: 'Détails de l'expérience',
    description: 'Description',
    includes: 'Ce qui est inclus',
    location: 'Emplacement',
    reviews: 'Avis',
    giftThis: 'Offrir cette expérience',
    bookNow: 'Réserver maintenant',
    personalize: 'Personnaliser votre cadeau',
    recipientName: 'Nom du destinataire',
    personalMessage: 'Message personnel',
    addPhoto: 'Ajouter une photo',
    addVideo: 'Ajouter une vidéo',
    preview: 'Aperçu',
    send: 'Envoyer',
    paymentDetails: 'Détails du paiement',
    cardNumber: 'Numéro de carte',
    expiryDate: 'Date d'expiration',
    cvv: 'CVV',
    pay: 'Payer',
    confirmPayment: 'Confirmer le paiement',
    thankYou: 'Merci pour votre achat !',
    giftSent: 'Votre cadeau a été envoyé avec succès.',
    trackGift: 'Suivre ce cadeau',
    backToHome: 'Retour à l'accueil'
  },
  en: {
    home: 'Home',
    explore: 'Explore',
    gifts: 'My Gifts',
    profile: 'Profile',
    welcome: 'Welcome to FiMySolutions',
    discover: 'Discover and offer authentic experiences',
    featured: 'Featured Experiences',
    categories: 'Categories',
    viewAll: 'View all',
    hotels: 'Stays',
    restaurants: 'Gastronomy',
    wellness: 'Wellness',
    activities: 'Activities',
    workshops: 'Workshops',
    from: 'From',
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    noAccount: 'Don\'t have an account?',
    createAccount: 'Create account',
    alreadyAccount: 'Already have an account?',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    register: 'Register',
    myGifts: 'My Gift Cards',
    received: 'Received',
    sent: 'Sent',
    noGiftsYet: 'You don\'t have any gift cards yet',
    browseExperiences: 'Browse Experiences',
    settings: 'Settings',
    language: 'Language',
    notifications: 'Notifications',
    paymentMethods: 'Payment Methods',
    help: 'Help & Support',
    logout: 'Logout',
    experienceDetails: 'Experience Details',
    description: 'Description',
    includes: 'What\'s Included',
    location: 'Location',
    reviews: 'Reviews',
    giftThis: 'Gift This Experience',
    bookNow: 'Book Now',
    personalize: 'Personalize Your Gift',
    recipientName: 'Recipient Name',
    personalMessage: 'Personal Message',
    addPhoto: 'Add Photo',
    addVideo: 'Add Video',
    preview: 'Preview',
    send: 'Send',
    paymentDetails: 'Payment Details',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    cvv: 'CVV',
    pay: 'Pay',
    confirmPayment: 'Confirm Payment',
    thankYou: 'Thank you for your purchase!',
    giftSent: 'Your gift has been sent successfully.',
    trackGift: 'Track this gift',
    backToHome: 'Back to Home'
  },
  es: {
    home: 'Inicio',
    explore: 'Explorar',
    gifts: 'Mis Regalos',
    profile: 'Perfil',
    welcome: 'Bienvenido a FiMySolutions',
    discover: 'Descubre y ofrece experiencias auténticas',
    featured: 'Experiencias Destacadas',
    categories: 'Categorías',
    viewAll: 'Ver todo',
    hotels: 'Estancias',
    restaurants: 'Gastronomía',
    wellness: 'Bienestar',
    activities: 'Actividades',
    workshops: 'Talleres',
    from: 'Desde',
    login: 'Iniciar Sesión',
    signup: 'Registrarse',
    email: 'Correo electrónico',
    password: 'Contraseña',
    forgotPassword: '¿Olvidaste tu contraseña?',
    noAccount: '¿No tienes cuenta?',
    createAccount: 'Crear cuenta',
    alreadyAccount: '¿Ya tienes una cuenta?',
    fullName: 'Nombre completo',
    confirmPassword: 'Confirmar contraseña',
    register: 'Registrarse',
    myGifts: 'Mis Tarjetas Regalo',
    received: 'Recibidos',
    sent: 'Enviados',
    noGiftsYet: 'Aún no tienes tarjetas regalo',
    browseExperiences: 'Explorar experiencias',
    settings: 'Configuración',
    language: 'Idioma',
    notifications: 'Notificaciones',
    paymentMethods: 'Métodos de pago',
    help: 'Ayuda y soporte',
    logout: 'Cerrar sesión',
    experienceDetails: 'Detalles de la experiencia',
    description: 'Descripción',
    includes: 'Qué incluye',
    location: 'Ubicación',
    reviews: 'Opiniones',
    giftThis: 'Regalar esta experiencia',
    bookNow: 'Reservar ahora',
    personalize: 'Personaliza tu regalo',
    recipientName: 'Nombre del destinatario',
    personalMessage: 'Mensaje personal',
    addPhoto: 'Añadir foto',
    addVideo: 'Añadir vídeo',
    preview: 'Vista previa',
    send: 'Enviar',
    paymentDetails: 'Detalles de pago',
    cardNumber: 'Número de tarjeta',
    expiryDate: 'Fecha de caducidad',
    cvv: 'CVV',
    pay: 'Pagar',
    confirmPayment: 'Confirmar pago',
    thankYou: '¡Gracias por tu compra!',
    giftSent: 'Tu regalo ha sido enviado con éxito.',
    trackGift: 'Seguir este regalo',
    backToHome: 'Volver al inicio'
  }
};

// Configuration de i18n
i18n.translations = translations;
i18n.fallbacks = true;
i18n.defaultLocale = 'fr';

// Création des navigateurs
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Composants des écrans principaux
const HomeScreen = ({ navigation }) => {
  const [featuredExperiences, setFeaturedExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données depuis l'API
    setTimeout(() => {
      setFeaturedExperiences([
        {
          id: '1',
          title: 'Dîner gastronomique pour deux',
          category: 'Gastronomie',
          location: 'Montréal',
          price: 150,
          image: require('./assets/experience-1.jpg'),
          popular: true
        },
        {
          id: '2',
          title: 'Journée spa et massage',
          category: 'Bien-être',
          location: 'Québec',
          price: 120,
          image: require('./assets/experience-2.jpg'),
          new: true
        },
        {
          id: '3',
          title: 'Week-end en chalet de luxe',
          category: 'Séjour',
          location: 'Mont-Tremblant',
          price: 350,
          image: require('./assets/experience-3.jpg')
        }
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const renderExperienceCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.experienceCard}
      onPress={() => navigation.navigate('ExperienceDetails', { experience: item })}
    >
      <View style={styles.cardImageContainer}>
        <Image source={item.image} style={styles.cardImage} />
        {item.popular && <View style={styles.cardBadge}><Text style={styles.cardBadgeText}>Populaire</Text></View>}
        {item.new && <View style={styles.cardBadge}><Text style={styles.cardBadgeText}>Nouveau</Text></View>}
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardLocation}>{item.location}</Text>
          <Text style={styles.cardCategory}>{item.category}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{i18n.t('from')} {item.price} $</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.categoryIconContainer}>
        <Ionicons name={item.icon} size={24} color="#4e73df" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const categories = [
    { id: '1', name: i18n.t('hotels'), icon: 'bed-outline' },
    { id: '2', name: i18n.t('restaurants'), icon: 'restaurant-outline' },
    { id: '3', name: i18n.t('wellness'), icon: 'fitness-outline' },
    { id: '4', name: i18n.t('activities'), icon: 'bicycle-outline' },
    { id: '5', name: i18n.t('workshops'), icon: 'color-palette-outline' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>{i18n.t('welcome')}</Text>
          <Text style={styles.heroSubtitle}>{i18n.t('discover')}</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#6c757d" />
            <Text style={styles.searchPlaceholder}>Rechercher une expérience...</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{i18n.t('categories')}</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllLink}>{i18n.t('viewAll')}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{i18n.t('featured')}</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllLink}>{i18n.t('viewAll')}</Text>
            </TouchableOpacity>
          </View>
          
          {isLoading ? (
            <ActivityIndicator size="large" color="#4e73df" style={styles.loader} />
          ) : (
            <FlatList
              data={featuredExperiences}
              renderItem={renderExperienceCard}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.experiencesList}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Explore Screen</Text>
    </View>
  );
};

const GiftsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>My Gifts Screen</Text>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
    </View>
  );
};

// Navigateur principal avec tabs
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Gifts') {
            iconName = focused ? 'gift' : 'gift-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4e73df',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: i18n.t('home'),
          headerShown: false
        }} 
      />
      <Tab.Screen 
        name="Explore" 
        component={ExploreScreen} 
        options={{ 
          title: i18n.t('explore'),
          headerShown: false
        }} 
      />
      <Tab.Screen 
        name="Gifts" 
        component={GiftsScreen} 
        options={{ 
          title: i18n.t('gifts'),
          headerShown: false
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          title: i18n.t('profile'),
          headerShown: false
        }} 
      />
    </Tab.Navigator>
  );
};

// Écran de détails d'une expérience
const ExperienceDetailsScreen = ({ route, navigation }) => {
  const { experience } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={experience.image} style={styles.detailImage} />
      <View style={styles.detailContent}>
        <View style={styles.detailHeader}>
          <Text style={styles.detailCategory}>{experience.category}</Text>
          <Text style={styles.detailLocation}>{experience.location}</Text>
        </View>
        <Text style={styles.detailTitle}>{experience.title}</Text>
        <Text style={styles.detailPrice}>{i18n.t('from')} {experience.price} $</Text>
        
        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>{i18n.t('description')}</Text>
          <Text style={styles.detailText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, 
            nisi vel consectetur interdum, nisl nisi consectetur purus, eget egestas 
            nisl nisi sed orci. Nulla facilisi. Nullam euismod, nisi vel consectetur 
            interdum, nisl nisi consectetur purus, eget egestas nisl nisi sed orci.
          </Text>
        </View>
        
        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>{i18n.t('includes')}</Text>
          <View style={styles.includesList}>
            <View style={styles.includeItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4e73df" />
              <Text style={styles.includeText}>Menu dégustation 5 services</Text>
            </View>
            <View style={styles.includeItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4e73df" />
              <Text style={styles.includeText}>Accord mets et vins</Text>
            </View>
            <View style={styles.includeItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4e73df" />
              <Text style={styles.includeText}>Service et taxes inclus</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.detailButtons}>
          <TouchableOpacity 
            style={[styles.detailButton, styles.primaryButton]}
            onPress={() => navigation.navigate('GiftPersonalization', { experience })}
          >
            <Text style={styles.primaryButtonText}>{i18n.t('giftThis')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.detailButton, styles.secondaryButton]}>
            <Text style={styles.secondaryButtonText}>{i18n.t('bookNow')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Écran de personnalisation du cadeau
const GiftPersonalizationScreen = ({ route, navigation }) => {
  const { experience } = route.params;
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>{i18n.t('personalize')}</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>{i18n.t('recipientName')}</Text>
          <TextInput 
            style={styles.formInput}
            value={recipientName}
            onChangeText={setRecipientName}
            placeholder="Nom du destinataire"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>{i18n.t('personalMessage')}</Text>
          <TextInput 
            style={[styles.formInput, styles.textArea]}
            value={message}
            onChangeText={setMessage}
            placeholder="Écrivez un message personnel..."
            multiline
            numberOfLines={4}
          />
        </View>
        
        <View style={styles.formGroup}>
          <TouchableOpacity style={styles.mediaButton}>
            <Ionicons name="image-outline" size={24} color="#4e73df" />
            <Text style={styles.mediaButtonText}>{i18n.t('addPhoto')}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.formGroup}>
          <TouchableOpacity style={styles.mediaButton}>
            <Ionicons name="videocam-outline" size={24} color="#4e73df" />
            <Text style={styles.mediaButtonText}>{i18n.t('addVideo')}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.formButtons}>
          <TouchableOpacity 
            style={[styles.formButton, styles.secondaryButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>{i18n.t('preview')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.formButton, styles.primaryButton]}
            onPress={() => navigation.navigate('PaymentScreen', { 
              experience,
              giftDetails: { recipientName, message }
            })}
          >
            <Text style={styles.primaryButtonText}>{i18n.t('send')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Écran de paiement
const PaymentScreen = ({ route, navigation }) => {
  const { experience, giftDetails } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    // Simuler un traitement de paiement
    Alert.alert(
      i18n.t('confirmPayment'),
      `Voulez-vous confirmer le paiement de ${experience.price} $ ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Confirmer',
          onPress: () => navigation.navigate('PaymentSuccess', { experience, giftDetails })
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>{i18n.t('paymentDetails')}</Text>
        
        <View style={styles.paymentSummary}>
          <Text style={styles.summaryTitle}>{experience.title}</Text>
          <Text style={styles.summaryPrice}>{experience.price} $</Text>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>{i18n.t('cardNumber')}</Text>
          <TextInput 
            style={styles.formInput}
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="1234 5678 9012 3456"
            keyboardType="number-pad"
          />
        </View>
        
        <View style={styles.formRow}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.formLabel}>{i18n.t('expiryDate')}</Text>
            <TextInput 
              style={styles.formInput}
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholder="MM/YY"
              keyboardType="number-pad"
            />
          </View>
          <View style={[styles.formGroup, { flex: 1 }]}>
            <Text style={styles.formLabel}>{i18n.t('cvv')}</Text>
            <TextInput 
              style={styles.formInput}
              value={cvv}
              onChangeText={setCvv}
              placeholder="123"
              keyboardType="number-pad"
              secureTextEntry
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.formButton, styles.primaryButton, { marginTop: 20 }]}
          onPress={handlePayment}
        >
          <Text style={styles.primaryButtonText}>{i18n.t('pay')} {experience.price} $</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Écran de succès de paiement
const PaymentSuccessScreen = ({ route, navigation }) => {
  const { experience, giftDetails } = route.params;

  return (
    <View style={[styles.container, styles.centerContent]}>
      <Ionicons name="checkmark-circle" size={80} color="#1cc88a" />
      <Text style={styles.successTitle}>{i18n.t('thankYou')}</Text>
      <Text style={styles.successMessage}>{i18n.t('giftSent')}</Text>
      
      <View style={styles.successButtons}>
        <TouchableOpacity 
          style={[styles.formButton, styles.secondaryButton]}
          onPress={() => navigation.navigate('Gifts')}
        >
          <Text style={styles.secondaryButtonText}>{i18n.t('trackGift')}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.formButton, styles.primaryButton]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.primaryButtonText}>{i18n.t('backToHome')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Écran de connexion
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={[styles.container, styles.authContainer]}>
      <View style={styles.logoContainer}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.authTitle}>{i18n.t('login')}</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>{i18n.t('email')}</Text>
          <TextInput 
            style={styles.formInput}
            value={email}
            onChangeText={setEmail}
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>{i18n.t('password')}</Text>
          <TextInput 
            style={styles.formInput}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />
        </View>
        
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>{i18n.t('forgotPassword')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.formButton, styles.primaryButton, { marginTop: 20 }]}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.primaryButtonText}>{i18n.t('login')}</Text>
        </TouchableOpacity>
        
        <View style={styles.authFooter}>
          <Text style={styles.authFooterText}>{i18n.t('noAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.authFooterLink}>{i18n.t('createAccount')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Écran d'inscription
const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={[styles.container, styles.authContainer]}>
      <View style={styles.logoContainer}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.authTitle}>{i18n.t('signup')}</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>{i18n.t('fullName')}</Text>
          <TextInput 
            style={styles.formInput}
            value={fullName}
            onChangeText={setFullName}
            placeholder="John Doe"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>{i18n.t('email')}</Text>
          <TextInput 
            style={styles.formInput}
            value={email}
            onChangeText={setEmail}
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>{i18n.t('password')}</Text>
          <TextInput 
            style={styles.formInput}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>{i18n.t('confirmPassword')}</Text>
          <TextInput 
            style={styles.formInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="••••••••"
            secureTextEntry
          />
        </View>
        
        <TouchableOpacity 
          style={[styles.formButton, styles.primaryButton, { marginTop: 20 }]}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.primaryButtonText}>{i18n.t('register')}</Text>
        </TouchableOpacity>
        
        <View style={styles.authFooter}>
          <Text style={styles.authFooterText}>{i18n.t('alreadyAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.authFooterLink}>{i18n.t('login')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Composant principal de l'application
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        console.log('Failed to load token', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#4e73df" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {userToken === null ? (
            // Écrans d'authentification
            <>
              <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="Signup" 
                component={SignupScreen} 
                options={{ headerShown: false }}
              />
            </>
          ) : (
            // Écrans principaux de l'application
            <>
              <Stack.Screen 
                name="Main" 
                component={TabNavigator} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="ExperienceDetails" 
                component={ExperienceDetailsScreen} 
                options={{ 
                  title: i18n.t('experienceDetails'),
                  headerBackTitleVisible: false
                }}
              />
              <Stack.Screen 
                name="GiftPersonalization" 
                component={GiftPersonalizationScreen} 
                options={{ 
                  title: i18n.t('personalize'),
                  headerBackTitleVisible: false
                }}
              />
              <Stack.Screen 
                name="PaymentScreen" 
                component={PaymentScreen} 
                options={{ 
                  title: i18n.t('paymentDetails'),
                  headerBackTitleVisible: false
                }}
              />
              <Stack.Screen 
                name="PaymentSuccess" 
                component={PaymentSuccessScreen} 
                options={{ 
                  headerShown: false
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

// Styles de l'application
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#343a40',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: '#6c757d',
    flex: 1,
  },
  sectionContainer: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
  },
  viewAllLink: {
    color: '#4e73df',
    fontSize: 14,
  },
  categoriesList: {
    paddingVertical: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f1f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#343a40',
    textAlign: 'center',
  },
  experiencesList: {
    paddingVertical: 10,
  },
  experienceCard: {
    width: 280,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 15,
    overflow: 'hidden',
  },
  cardImageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4e73df',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  cardBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardBody: {
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cardLocation: {
    fontSize: 12,
    color: '#6c757d',
  },
  cardCategory: {
    fontSize: 12,
    color: '#4e73df',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#343a40',
  },
  loader: {
    marginVertical: 20,
  },
  
  // Styles pour les détails d'expérience
  detailImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  detailContent: {
    padding: 20,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailCategory: {
    fontSize: 14,
    color: '#4e73df',
    fontWeight: '500',
  },
  detailLocation: {
    fontSize: 14,
    color: '#6c757d',
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 10,
  },
  detailPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 22,
  },
  includesList: {
    marginTop: 5,
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  includeText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#6c757d',
  },
  detailButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#4e73df',
    marginRight: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4e73df',
  },
  secondaryButtonText: {
    color: '#4e73df',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  // Styles pour les formulaires
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    fontSize: 14,
    color: '#343a40',
    marginBottom: 5,
    fontWeight: '500',
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#e3e6f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#343a40',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e3e6f0',
    borderRadius: 8,
    padding: 12,
    borderStyle: 'dashed',
  },
  mediaButtonText: {
    marginLeft: 10,
    color: '#4e73df',
    fontSize: 14,
    fontWeight: '500',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  formButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Styles pour le paiement
  paymentSummary: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 14,
    color: '#343a40',
    fontWeight: '500',
    flex: 1,
  },
  summaryPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
  },
  
  // Styles pour l'écran de succès
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#343a40',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 30,
    textAlign: 'center',
  },
  successButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  
  // Styles pour l'authentification
  authContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#4e73df',
    fontSize: 14,
    textAlign: 'right',
  },
  authFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  authFooterText: {
    color: '#6c757d',
    marginRight: 5,
  },
  authFooterLink: {
    color: '#4e73df',
    fontWeight: '500',
  },
});
