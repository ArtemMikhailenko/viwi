const ENVIRONMENT = {
    development: {
        API_URL: 'http://backend/api',
        YANDEX_REDIRECT_URL: 'http://localhost/api/auth/yandex',
        GOOGLE_REDIRECT_URL: 'http://localhost/api/auth/google',
        VK_REDIRECT_URL: 'http://localhost/api/auth/vk',
        PAYMENT_REDIRECT_URL: 'http://localhost/app/tariffs',
    },
    production: {
        API_URL: 'http://backend/api',
        YANDEX_REDIRECT_URL: 'https://videowidget.pro/api/auth/yandex',
        GOOGLE_REDIRECT_URL: 'https://videowidget.pro/api/auth/google',
        VK_REDIRECT_URL: 'https://videowidget.pro/api/auth/vk',
        PAYMENT_REDIRECT_URL: 'https://videowidget.pro/app/tariffs',
    },
}

export default {
    environment: ENVIRONMENT,
    locale: 'ru-RU',
    themeSwitch: false,
    links: {
        privacyPolicy: '/privacy-policy',
        termsAndConditions: '/terms-and-conditions',
        publicOffer: '/public-offer',
        email: 'help@videowidget.pro',
    },
    limits: {
        fileSize: {
            text: '200Мб',
            value: 200 * 1024 * 1024, // 200MB
        },
    },
    yandex: {
        clientId: '123',
    },
    google: {
        clientId: '123',
    },
    vk: {
        appId: '123',
    },
}
