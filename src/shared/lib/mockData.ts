export const mockPlaces = [
  {
    id: '1', name: "Cascade d'Aït Baha", region: 'Chtouka-Aït Baha', category: 'nature',
    rating: 4.8, price: 150, duration: 3, difficulty: 'medium' as const,
    lat: 30.059, lng: -9.147, matchScore: 92,
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800',
    description: "Une cascade spectaculaire nichée dans les montagnes de l'Anti-Atlas, entourée de palmiers et d'amandiers.",
    tags: ['randonnée', 'cascade', 'nature'],
    guideId: 'g1',
  },
  {
    id: '2', name: 'Souk Rural de Tiznit', region: 'Tiznit', category: 'culture',
    rating: 4.6, price: 80, duration: 2, difficulty: 'easy' as const,
    lat: 29.697, lng: -9.731, matchScore: 74,
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800',
    description: "Plongez au cœur d'un souk amazigh authentique. Bijoux en argent, épices et artisanat local.",
    tags: ['culture', 'artisanat', 'souk'],
    guideId: 'g2',
  },
  {
    id: '3', name: 'Vallée du Paradis', region: 'Taroudant', category: 'nature',
    rating: 4.9, price: 200, duration: 5, difficulty: 'hard' as const,
    lat: 30.470, lng: -8.877, matchScore: 88,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    description: "Randonnée à travers des gorges turquoise et des piscines naturelles. Un joyau caché de Taroudant.",
    tags: ['randonnée', 'piscine naturelle', 'aventure'],
    guideId: 'g1',
  },
  {
    id: '4', name: 'Cooperative d\'Argan', region: 'Essaouira', category: 'gastronomy',
    rating: 4.5, price: 120, duration: 2, difficulty: 'easy' as const,
    lat: 31.0, lng: -9.77, matchScore: 65,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    description: "Découvrez la production artisanale de l'huile d'argan par les femmes de la coopérative.",
    tags: ['gastronomie', 'argan', 'artisanat'],
    guideId: 'g2',
  },
  {
    id: '5', name: 'Randonnée Jbel Lkest', region: 'Tiznit', category: 'adventure',
    rating: 4.7, price: 250, duration: 6, difficulty: 'hard' as const,
    lat: 29.55, lng: -9.45, matchScore: 81,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    description: "Ascension du point culminant de l'Anti-Atlas avec des panoramas à couper le souffle.",
    tags: ['montagne', 'randonnée', 'aventure'],
    guideId: 'g1',
  },
];

export const mockGuides = [
  {
    id: 'g1', name: 'Ahmed Bensalem', specialty: 'Randonnée Anti-Atlas',
    languages: ['fr', 'ar', 'amazigh'], rating: 4.9, visitCount: 32,
    region: 'Taroudant', certified: true,
    avatar: 'https://i.pravatar.cc/150?img=11',
    bio: "Guide certifié avec 8 ans d'expérience dans l'Anti-Atlas. Passionné par le patrimoine amazigh.",
  },
  {
    id: 'g2', name: 'Fatima Ouhamou', specialty: 'Culture amazighe',
    languages: ['fr', 'amazigh'], rating: 4.7, visitCount: 19,
    region: 'Tiznit', certified: false,
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: "Spécialiste de la culture amazighe, artisanat et gastronomie locale. Parle couramment le tachelhit.",
  },
];

export const mockBookings = [
  {
    id: 'b1', placeId: '1', guideId: 'g1', touristId: 't1',
    date: '2026-04-05', timeSlot: '08:00', status: 'confirmed' as const,
    totalPrice: 150,
  },
  {
    id: 'b2', placeId: '3', guideId: 'g1', touristId: 't1',
    date: '2026-04-12', timeSlot: '10:00', status: 'pending' as const,
    totalPrice: 200,
  },
];

export const mockPosts = [
  {
    id: 'p1', authorName: 'Sophie Martin', authorAvatar: 'https://i.pravatar.cc/150?img=32',
    placeId: '3', placeName: 'Vallée du Paradis', content: "Une journée magique dans la Vallée du Paradis ! Les piscines naturelles sont incroyables. Ahmed est un guide fantastique qui connaît chaque recoin de la vallée. 🏔️",
    media: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'],
    likesCount: 24, commentsCount: 5, createdAt: '2026-03-20',
  },
  {
    id: 'p2', authorName: 'Karim Amrani', authorAvatar: 'https://i.pravatar.cc/150?img=53',
    placeId: '2', placeName: 'Souk Rural de Tiznit', content: "Le souk de Tiznit est un voyage dans le temps. L'argent berbère est magnifique et Fatima nous a fait découvrir les meilleurs artisans. Merci AMALAY ! 🙏",
    media: ['https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800'],
    likesCount: 18, commentsCount: 3, createdAt: '2026-03-18',
  },
];

export const mockEvents = [
  {
    id: 'e1',
    title: 'Festival de l Amande',
    region: 'Tafraoute',
    date: '2026-04-18',
    time: '10:00',
    location: 'Place centrale de Tafraoute',
    category: 'culture',
    price: 0,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
    description: 'Un evenement phare de la region avec folklore, artisanat et gastronomie locale.',
    organizer: 'Association Locale Tafraoute',
    capacity: 500,
    registered: 320,
    tags: ['folklore', 'artisanat', 'musique'],
  },
  {
    id: 'e2',
    title: 'Marathon Vert du Souss',
    region: 'Agadir',
    date: '2026-05-02',
    time: '08:30',
    location: 'Corniche d Agadir',
    category: 'sport',
    price: 120,
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200',
    description: 'Course eco-responsable a travers les plus beaux points de la baie d Agadir.',
    organizer: 'Commune d Agadir',
    capacity: 1000,
    registered: 760,
    tags: ['sport', 'running', 'eco'],
  },
  {
    id: 'e3',
    title: 'Semaine de l Argan',
    region: 'Chtouka Ait Baha',
    date: '2026-05-15',
    time: '11:00',
    location: 'Maison de la Culture Chtouka',
    category: 'terroir',
    price: 60,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200',
    description: 'Ateliers, degustations et rencontres autour de la filiere argan.',
    organizer: 'Cooperatives des Femmes du Souss',
    capacity: 350,
    registered: 210,
    tags: ['argan', 'terroir', 'cooperative'],
  },
];

export const categories = [
  { id: 'all', label: 'Tous', icon: '🌍' },
  { id: 'nature', label: 'Nature', icon: '🌿' },
  { id: 'culture', label: 'Culture', icon: '🏛️' },
  { id: 'gastronomy', label: 'Gastronomie', icon: '🍽️' },
  { id: 'adventure', label: 'Aventure', icon: '⛰️' },
  { id: 'crafts', label: 'Artisanat', icon: '🧶' },
];

export const languageLabels: Record<string, string> = {
  fr: 'Français',
  ar: 'العربية',
  en: 'English',
  amazigh: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
};
