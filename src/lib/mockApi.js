// Mock API service for Tzeyni application
// Simulates backend API responses for development

import {
    mockClients,
    mockProfessionals,
    mockServices,
    mockCategories,
    mockBookings,
    mockReviews,
    validateCredentials,
    findUserByEmail,
    getProfessionalsBySearch,
    getBookingsByClientId,
    getBookingsByProfessionalId
} from './mockData';

// Simulated network delay (ms)
const MOCK_DELAY = 500;

// Helper to simulate async API call
const simulateDelay = (ms = MOCK_DELAY) =>
    new Promise(resolve => setTimeout(resolve, ms));

// Generate a mock token
const generateMockToken = (userId) =>
    `mock_token_${userId}_${Date.now()}`;

// Store for registered users (in-memory, resets on page refresh)
let registeredUsers = [];

// ============== AUTH API ==============

/**
 * Mock login function
 * @param {string} email 
 * @param {string} password 
 * @param {string} role - 'client' or 'professional'
 * @returns {Promise<object>}
 */
export const mockLogin = async (email, password, role = 'client') => {
    await simulateDelay();

    const user = validateCredentials(email, password, role);

    if (user) {
        return {
            status: true,
            message: 'Login successful',
            id: user.id,
            token: generateMockToken(user.id),
            role: user.role,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                phone: user.phone,
                city: user.city,
                avatar: user.avatar,
                role: user.role
            }
        };
    }

    // Check if user was recently registered
    const registeredUser = registeredUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password &&
            u.role === role
    );

    if (registeredUser) {
        return {
            status: true,
            message: 'Login successful',
            id: registeredUser.id,
            token: generateMockToken(registeredUser.id),
            role: registeredUser.role,
            user: registeredUser
        };
    }

    throw {
        response: {
            status: 401,
            data: {
                status: false,
                message: 'Email ou mot de passe incorrect'
            }
        }
    };
};

/**
 * Mock registration function
 * @param {object} userData 
 * @param {string} role - 'client' or 'professional'
 * @returns {Promise<object>}
 */
export const mockRegister = async (userData, role = 'client') => {
    await simulateDelay();

    // Check if email already exists
    const existingUser = findUserByEmail(userData.email);
    if (existingUser) {
        throw {
            response: {
                status: 400,
                data: {
                    status: false,
                    message: 'Un compte avec cet email existe déjà'
                }
            }
        };
    }

    // Check in registered users
    const existingRegistered = registeredUsers.find(
        u => u.email.toLowerCase() === userData.email.toLowerCase()
    );
    if (existingRegistered) {
        throw {
            response: {
                status: 400,
                data: {
                    status: false,
                    message: 'Un compte avec cet email existe déjà'
                }
            }
        };
    }

    // Create new user
    const newUser = {
        id: `${role}-${Date.now()}`,
        full_name: userData.full_name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        city: userData.city,
        addresse: userData.addresse,
        gender: userData.gender,
        role: role,
        avatar: '/assets/image/default-avatar.png',
        isVerified: false,
        createdAt: new Date().toISOString()
    };

    // Add professional-specific fields
    if (role === 'professional') {
        newUser.specialties = [];
        newUser.experience = '';
        newUser.rating = 0;
        newUser.reviews = 0;
        newUser.servicesAtHome = true;
    }

    registeredUsers.push(newUser);

    return {
        status: true,
        message: 'Inscription réussie. Veuillez vérifier votre email.',
        user: { id: newUser.id, email: newUser.email }
    };
};

/**
 * Mock OTP verification
 * @param {string} email 
 * @param {string} otp 
 * @returns {Promise<object>}
 */
export const mockVerifyOtp = async (email, otp) => {
    await simulateDelay();

    // Accept any 6-digit OTP for mock purposes
    if (otp && otp.length === 6 && /^\d+$/.test(otp)) {
        // Mark user as verified
        const userIndex = registeredUsers.findIndex(
            u => u.email.toLowerCase() === email.toLowerCase()
        );
        if (userIndex !== -1) {
            registeredUsers[userIndex].isVerified = true;
        }

        return {
            status: true,
            message: 'Email vérifié avec succès'
        };
    }

    throw {
        response: {
            status: 400,
            data: {
                status: false,
                message: 'Code OTP invalide'
            }
        }
    };
};

/**
 * Mock resend OTP
 * @param {string} email 
 * @returns {Promise<object>}
 */
export const mockResendOtp = async (email) => {
    await simulateDelay();

    return {
        status: true,
        message: 'Un nouveau code a été envoyé à votre email'
    };
};

// ============== SEARCH API ==============

/**
 * Mock search for professionals/services
 * @param {string} service 
 * @param {string} location 
 * @returns {Promise<object>}
 */
export const mockSearch = async (service, location) => {
    await simulateDelay();

    const professionals = getProfessionalsBySearch(service, location);

    if (professionals.length === 0) {
        return {
            status: true,
            message: 'Aucun résultat trouvé',
            data: []
        };
    }

    return {
        status: true,
        message: `${professionals.length} professionnel(s) trouvé(s)`,
        data: professionals.map(pro => ({
            id: pro.id,
            full_name: pro.full_name,
            avatar: pro.avatar,
            specialties: pro.specialties,
            rating: pro.rating,
            reviews: pro.reviews,
            city: pro.city,
            availability: pro.availability,
            servicesAtHome: pro.servicesAtHome
        }))
    };
};

// ============== PROFILE API ==============

/**
 * Get user profile
 * @param {string} userId 
 * @returns {Promise<object>}
 */
export const mockGetProfile = async (userId) => {
    await simulateDelay();

    const client = mockClients.find(c => c.id === userId);
    if (client) {
        const { password, ...profile } = client;
        return { status: true, data: profile };
    }

    const pro = mockProfessionals.find(p => p.id === userId);
    if (pro) {
        const { password, ...profile } = pro;
        return { status: true, data: profile };
    }

    // Check registered users
    const registered = registeredUsers.find(u => u.id === userId);
    if (registered) {
        const { password, ...profile } = registered;
        return { status: true, data: profile };
    }

    throw {
        response: {
            status: 404,
            data: { status: false, message: 'Profil non trouvé' }
        }
    };
};

/**
 * Update user profile
 * @param {string} userId 
 * @param {object} data 
 * @returns {Promise<object>}
 */
export const mockUpdateProfile = async (userId, data) => {
    await simulateDelay();

    return {
        status: true,
        message: 'Profil mis à jour avec succès',
        data: { ...data, id: userId }
    };
};

// ============== SERVICES API ==============

/**
 * Get all services
 * @returns {Promise<object>}
 */
export const mockGetServices = async () => {
    await simulateDelay();

    return {
        status: true,
        data: mockServices
    };
};

/**
 * Get service categories
 * @returns {Promise<object>}
 */
export const mockGetCategories = async () => {
    await simulateDelay();

    return {
        status: true,
        data: mockCategories
    };
};

/**
 * Get services by category
 * @param {string} categoryId 
 * @returns {Promise<object>}
 */
export const mockGetServicesByCategory = async (categoryId) => {
    await simulateDelay();

    const services = mockServices.filter(s => s.category === categoryId);

    return {
        status: true,
        data: services
    };
};

// ============== BOOKINGS API ==============

/**
 * Get bookings for a client
 * @param {string} clientId 
 * @returns {Promise<object>}
 */
export const mockGetClientBookings = async (clientId) => {
    await simulateDelay();

    const bookings = getBookingsByClientId(clientId);

    return {
        status: true,
        data: bookings
    };
};

/**
 * Get bookings for a professional
 * @param {string} professionalId 
 * @returns {Promise<object>}
 */
export const mockGetProfessionalBookings = async (professionalId) => {
    await simulateDelay();

    const bookings = getBookingsByProfessionalId(professionalId);

    return {
        status: true,
        data: bookings
    };
};

/**
 * Create a new booking
 * @param {object} bookingData 
 * @returns {Promise<object>}
 */
export const mockCreateBooking = async (bookingData) => {
    await simulateDelay();

    const newBooking = {
        id: `booking-${Date.now()}`,
        ...bookingData,
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    return {
        status: true,
        message: 'Réservation créée avec succès',
        data: newBooking
    };
};

/**
 * Update booking status
 * @param {string} bookingId 
 * @param {string} status 
 * @returns {Promise<object>}
 */
export const mockUpdateBookingStatus = async (bookingId, status) => {
    await simulateDelay();

    return {
        status: true,
        message: `Statut de la réservation mis à jour: ${status}`,
        data: { id: bookingId, status }
    };
};

// ============== PROFESSIONALS API ==============

/**
 * Get all professionals
 * @returns {Promise<object>}
 */
export const mockGetProfessionals = async () => {
    await simulateDelay();

    return {
        status: true,
        data: mockProfessionals.map(pro => {
            const { password, ...publicPro } = pro;
            return publicPro;
        })
    };
};

/**
 * Get professional by ID
 * @param {string} professionalId 
 * @returns {Promise<object>}
 */
export const mockGetProfessionalById = async (professionalId) => {
    await simulateDelay();

    const pro = mockProfessionals.find(p => p.id === professionalId);

    if (pro) {
        const { password, ...publicPro } = pro;
        const reviews = mockReviews.filter(r => r.professionalId === professionalId);

        return {
            status: true,
            data: {
                ...publicPro,
                reviews: reviews
            }
        };
    }

    throw {
        response: {
            status: 404,
            data: { status: false, message: 'Professionnel non trouvé' }
        }
    };
};

// Export all mock API functions
export default {
    // Auth
    login: mockLogin,
    register: mockRegister,
    verifyOtp: mockVerifyOtp,
    resendOtp: mockResendOtp,

    // Search
    search: mockSearch,

    // Profile
    getProfile: mockGetProfile,
    updateProfile: mockUpdateProfile,

    // Services
    getServices: mockGetServices,
    getCategories: mockGetCategories,
    getServicesByCategory: mockGetServicesByCategory,

    // Bookings
    getClientBookings: mockGetClientBookings,
    getProfessionalBookings: mockGetProfessionalBookings,
    createBooking: mockCreateBooking,
    updateBookingStatus: mockUpdateBookingStatus,

    // Professionals
    getProfessionals: mockGetProfessionals,
    getProfessionalById: mockGetProfessionalById
};
