// Mock data for Tzeyni application
// This file contains all sample data for development without a backend

// ============== USERS (CLIENTS) ==============
export const mockClients = [
    {
        id: 'client-001',
        full_name: 'Sophie Martin',
        email: 'client@tzeyni.ma',
        password: 'password123', // In real app, this would be hashed
        phone: '+212 622 123 456',
        city: 'Casablanca',
        addresse: '123 Boulevard Mohammed V, Casablanca',
        gender: 'Femme',
        role: 'client',
        avatar: '/assets/image/default-avatar.png',
        isVerified: true,
        createdAt: '2024-01-15T10:00:00Z'
    },
    {
        id: 'client-002',
        full_name: 'Amine Bennani',
        email: 'amine@example.com',
        password: 'password123',
        phone: '+212 661 234 567',
        city: 'Rabat',
        addresse: '45 Avenue Hassan II, Rabat',
        gender: 'Homme',
        role: 'client',
        avatar: '/assets/image/default-avatar.png',
        isVerified: true,
        createdAt: '2024-02-20T14:30:00Z'
    }
];

// ============== PROFESSIONALS ==============
export const mockProfessionals = [
    {
        id: 'pro-001',
        full_name: 'Fatima El Amrani',
        email: 'pro@tzeyni.ma',
        password: 'password123',
        phone: '+212 666 789 012',
        city: 'Casablanca',
        addresse: 'Quartier Maarif, Casablanca',
        gender: 'Femme',
        role: 'professional',
        avatar: '/assets/image/professional.png',
        isVerified: true,
        specialties: ['Coiffure', 'Coloration', 'Extensions'],
        experience: '10 ans d\'expérience',
        rating: 4.9,
        reviews: 127,
        availability: 'Disponible Aujourd\'hui',
        location: 'Centre de Casablanca',
        distance: '2.3 km',
        awards: 3,
        bio: 'Coiffeuse professionnelle passionnée avec 10 ans d\'expérience dans les salons haut de gamme. Je me spécialise dans les coupes modernes, les colorations vibrantes et le coiffage élégant pour toutes les occasions.',
        priceRange: '150 - 500 MAD',
        minPrice: 75,
        servicesAtHome: true,
        travelRadius: 15,
        portfolio: [
            '/assets/image/coiffure.png',
            '/assets/image/coloration.png',
            '/assets/image/soin-cheveux.png',
            '/assets/image/coiffure.png'
        ],
        availableSlots: ['9:00', '11:00', '14:00', '16:00', '18:00'],
        createdAt: '2023-06-10T09:00:00Z'
    },
    {
        id: 'pro-002',
        full_name: 'Marie Dubois',
        email: 'marie@tzeyni.ma',
        password: 'password123',
        phone: '+212 667 890 123',
        city: 'Casablanca',
        addresse: 'Anfa, Casablanca',
        gender: 'Femme',
        role: 'professional',
        avatar: '/assets/image/professional2.png',
        isVerified: true,
        specialties: ['Maquillage', 'Soins de la peau', 'Mariage'],
        experience: '8 ans d\'expérience',
        rating: 4.8,
        reviews: 98,
        availability: 'Prochaine disponibilité : Demain',
        location: 'Ouest de Casablanca',
        distance: '1.8 km',
        awards: 2,
        bio: 'Maquilleuse artistique spécialisée dans les mariages et événements. J\'utilise des produits haut de gamme pour créer des looks qui subliment votre beauté naturelle.',
        priceRange: '200 - 800 MAD',
        minPrice: 100,
        servicesAtHome: true,
        travelRadius: 20,
        portfolio: [
            '/assets/image/maquillage.png',
            '/assets/image/soin-visage.png',
            '/assets/image/maquillage.png',
            '/assets/image/soin-visage.png'
        ],
        availableSlots: ['10:00', '12:00', '15:00', '17:00'],
        createdAt: '2023-08-15T11:00:00Z'
    },
    {
        id: 'pro-003',
        full_name: 'Carla Bennis',
        email: 'carla@tzeyni.ma',
        password: 'password123',
        phone: '+212 668 901 234',
        city: 'Marrakech',
        addresse: 'Guéliz, Marrakech',
        gender: 'Femme',
        role: 'professional',
        avatar: '/assets/image/professional1.png',
        isVerified: true,
        specialties: ['Massage', 'Spa', 'Aromathérapie'],
        experience: '5 ans d\'expérience',
        rating: 4.7,
        reviews: 156,
        availability: 'Disponible Aujourd\'hui',
        location: 'Marrakech Centre',
        distance: '3.1 km',
        awards: 4,
        bio: 'Spécialiste en bien-être et relaxation, formée aux techniques orientales. Je propose des massages personnalisés pour libérer les tensions et vous offrir un moment de détente absolue.',
        priceRange: '250 - 600 MAD',
        minPrice: 80,
        servicesAtHome: true,
        travelRadius: 10,
        portfolio: [
            '/assets/image/massage.png',
            '/assets/image/soin-corps.png',
            '/assets/image/massage.png',
            '/assets/image/soin-corps.png'
        ],
        availableSlots: ['9:00', '11:00', '14:00', '16:00', '18:00'],
        createdAt: '2024-01-05T08:00:00Z'
    }
];

// ============== PROFESSIONAL SERVICES (links professionals to their offered services) ==============
export const mockProfessionalServices = [
    // Fatima El Amrani - Coiffure specialist
    { id: 'ps-001', professionalId: 'pro-001', name: 'Coupe Femme', duration: 60, price: 75 },
    { id: 'ps-002', professionalId: 'pro-001', name: 'Coloration Complète', duration: 120, price: 150 },
    { id: 'ps-003', professionalId: 'pro-001', name: 'Coiffage', duration: 45, price: 60 },
    { id: 'ps-004', professionalId: 'pro-001', name: 'Traitement Capillaire', duration: 90, price: 100 },

    // Marie Dubois - Makeup specialist
    { id: 'ps-005', professionalId: 'pro-002', name: 'Maquillage Jour', duration: 45, price: 100 },
    { id: 'ps-006', professionalId: 'pro-002', name: 'Maquillage Mariage', duration: 90, price: 250 },
    { id: 'ps-007', professionalId: 'pro-002', name: 'Soin du Visage', duration: 60, price: 120 },
    { id: 'ps-008', professionalId: 'pro-002', name: 'Consultation Beauté', duration: 30, price: 50 },

    // Carla Bennis - Wellness specialist
    { id: 'ps-009', professionalId: 'pro-003', name: 'Massage Relaxant', duration: 60, price: 80 },
    { id: 'ps-010', professionalId: 'pro-003', name: 'Massage Deep Tissue', duration: 90, price: 120 },
    { id: 'ps-011', professionalId: 'pro-003', name: 'Aromathérapie', duration: 75, price: 100 },
    { id: 'ps-012', professionalId: 'pro-003', name: 'Soin Corps Complet', duration: 120, price: 180 }
];

// ============== SERVICE CATEGORIES ==============
export const mockCategories = [
    { id: 'cat-001', name: 'Coiffure', icon: 'mdi:hair-dryer', count: 45 },
    { id: 'cat-002', name: 'Maquillage', icon: 'mdi:lipstick', count: 32 },
    { id: 'cat-003', name: 'Massage', icon: 'mdi:spa', count: 28 },
    { id: 'cat-004', name: 'Manucure', icon: 'mdi:nail-polish', count: 36 },
    { id: 'cat-005', name: 'Pédicure', icon: 'mdi:foot-print', count: 24 },
    { id: 'cat-006', name: 'Soins du visage', icon: 'mdi:face-woman', count: 41 },
    { id: 'cat-007', name: 'Épilation', icon: 'mdi:razor-double-edge', count: 29 },
    { id: 'cat-008', name: 'Hammam', icon: 'mdi:steam', count: 18 },
    { id: 'cat-009', name: 'Henna', icon: 'mdi:palette', count: 15 }
];

// ============== SERVICES ==============
export const mockServices = [
    {
        id: 'svc-001',
        name: 'Coupe Femme',
        category: 'cat-001',
        categoryName: 'Coiffure',
        description: 'Coupe et coiffage personnalisés selon votre style',
        price: 150,
        duration: 45, // minutes
        image: '/assets/image/coiffure.png',
        popular: true
    },
    {
        id: 'svc-002',
        name: 'Coloration Complète',
        category: 'cat-001',
        categoryName: 'Coiffure',
        description: 'Coloration professionnelle avec produits de qualité',
        price: 350,
        duration: 120,
        image: '/assets/image/coloration.png',
        popular: true
    },
    {
        id: 'svc-003',
        name: 'Maquillage Mariage',
        category: 'cat-002',
        categoryName: 'Maquillage',
        description: 'Maquillage professionnel pour votre jour spécial',
        price: 500,
        duration: 90,
        image: '/assets/image/maquillage.png',
        popular: true
    },
    {
        id: 'svc-004',
        name: 'Massage Relaxant',
        category: 'cat-003',
        categoryName: 'Massage',
        description: 'Massage complet pour une détente totale',
        price: 300,
        duration: 60,
        image: '/assets/image/massage.png',
        popular: false
    },
    {
        id: 'svc-005',
        name: 'Manucure Gel',
        category: 'cat-004',
        categoryName: 'Manucure',
        description: 'Pose de vernis gel longue tenue',
        price: 180,
        duration: 75,
        image: '/assets/image/manucure.png',
        popular: true
    },
    {
        id: 'svc-006',
        name: 'Soin du Visage',
        category: 'cat-006',
        categoryName: 'Soins du visage',
        description: 'Nettoyage profond et hydratation',
        price: 250,
        duration: 60,
        image: '/assets/image/soin-visage.png',
        popular: false
    },
    {
        id: 'svc-007',
        name: 'Hammam Traditionnel',
        category: 'cat-008',
        categoryName: 'Hammam',
        description: 'Rituel hammam marocain traditionnel à domicile',
        price: 400,
        duration: 90,
        image: '/assets/image/hammam.png',
        popular: true
    },
    {
        id: 'svc-008',
        name: 'Henna Mariage',
        category: 'cat-009',
        categoryName: 'Henna',
        description: 'Motifs traditionnels marocains pour mariages',
        price: 600,
        duration: 180,
        image: '/assets/image/henna.png',
        popular: false
    }
];

// ============== BOOKINGS ==============
export const mockBookings = [
    {
        id: 'booking-001',
        clientId: 'client-001',
        professionalId: 'pro-001',
        serviceId: 'svc-001',
        serviceName: 'Coupe Femme',
        professionalName: 'Fatima El Amrani',
        date: '2026-01-10',
        time: '10:30',
        status: 'confirmed', // pending, confirmed, completed, cancelled
        price: 150,
        location: 'À domicile',
        address: '123 Boulevard Mohammed V, Casablanca',
        image: '/assets/image/coiffure.png',
        createdAt: '2026-01-05T14:00:00Z'
    },
    {
        id: 'booking-002',
        clientId: 'client-001',
        professionalId: 'pro-002',
        serviceId: 'svc-003',
        serviceName: 'Maquillage Mariage',
        professionalName: 'Marie Dubois',
        date: '2026-01-15',
        time: '09:00',
        status: 'pending',
        price: 500,
        location: 'À domicile',
        address: '123 Boulevard Mohammed V, Casablanca',
        image: '/assets/image/maquillage.png',
        createdAt: '2026-01-06T10:00:00Z'
    },
    {
        id: 'booking-003',
        clientId: 'client-001',
        professionalId: 'pro-001',
        serviceId: 'svc-002',
        serviceName: 'Coloration Complète',
        professionalName: 'Fatima El Amrani',
        date: '2025-12-20',
        time: '14:00',
        status: 'completed',
        price: 350,
        location: 'À domicile',
        address: '123 Boulevard Mohammed V, Casablanca',
        image: '/assets/image/coloration.png',
        createdAt: '2025-12-15T11:00:00Z'
    }
];

// ============== REVIEWS ==============
export const mockReviews = [
    {
        id: 'review-001',
        bookingId: 'booking-003',
        clientId: 'client-001',
        professionalId: 'pro-001',
        clientName: 'Sophie Martin',
        rating: 5,
        comment: 'Fatima est incroyable ! Ma coloration est parfaite et elle a été très professionnelle.',
        createdAt: '2025-12-21T10:00:00Z'
    },
    {
        id: 'review-002',
        bookingId: 'booking-004',
        clientId: 'client-002',
        professionalId: 'pro-001',
        clientName: 'Amine Bennani',
        rating: 5,
        comment: 'Service excellent, très ponctuelle et résultat au-delà de mes attentes.',
        createdAt: '2025-12-18T16:00:00Z'
    },
    {
        id: 'review-003',
        bookingId: 'booking-005',
        clientId: 'client-001',
        professionalId: 'pro-002',
        clientName: 'Sophie Martin',
        rating: 4,
        comment: 'Très bon maquillage pour un événement. Je recommande !',
        createdAt: '2025-11-30T20:00:00Z'
    }
];

// ============== MOROCCAN CITIES ==============
export const moroccanCities = [
    'Casablanca',
    'Rabat',
    'Marrakech',
    'Fès',
    'Tanger',
    'Agadir',
    'Meknès',
    'Oujda',
    'Kénitra',
    'Tétouan',
    'Salé',
    'Mohammedia',
    'El Jadida',
    'Béni Mellal',
    'Nador'
];

// ============== HELPER FUNCTIONS ==============
export const findUserByEmail = (email) => {
    const client = mockClients.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (client) return { ...client, type: 'client' };

    const pro = mockProfessionals.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (pro) return { ...pro, type: 'professional' };

    return null;
};

export const validateCredentials = (email, password, role) => {
    const users = role === 'professional' ? mockProfessionals : mockClients;
    return users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
};

export const getProfessionalsBySearch = (service, location) => {
    let results = [...mockProfessionals];

    if (service) {
        const searchTerm = service.toLowerCase();
        results = results.filter(pro =>
            pro.specialties.some(s => s.toLowerCase().includes(searchTerm)) ||
            pro.full_name.toLowerCase().includes(searchTerm)
        );
    }

    if (location) {
        const locationTerm = location.toLowerCase();
        results = results.filter(pro =>
            pro.city.toLowerCase().includes(locationTerm) ||
            pro.location.toLowerCase().includes(locationTerm)
        );
    }

    return results;
};

export const getBookingsByClientId = (clientId) => {
    return mockBookings.filter(b => b.clientId === clientId);
};

export const getBookingsByProfessionalId = (professionalId) => {
    return mockBookings.filter(b => b.professionalId === professionalId);
};
