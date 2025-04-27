import axios from 'axios'

const trimSlashes = str => str.replace(/^\/+|\/+$/g, '')

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const trimmedUrl = trimSlashes(originalRequest.url)

        if (trimmedUrl.startsWith('auth')) {
            return Promise.reject(error)
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                try {
                    const token = await new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    });
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return await api(originalRequest);
                } catch (err) {
                    return Promise.reject(err);
                }
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data, errorCode } = await api.post('/auth/refresh/');
                if (errorCode && ['FORBIDDEN', 'UNAUTHORIZED', 'INVALID_TOKEN'].includes(errorCode)) {
                    const e = new Error(errorCode)
                    processQueue(e, null);
                    return Promise.reject(e);
                }
                localStorage.setItem('token', data.token);
                api.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
                originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
                processQueue(null, data.token);
                return await api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;


const MOCKED_AUTHORIZED = false;
const MOCKED_LOGIN_SUCCESS = true;
const MOCKED_REGISTER_SUCCESS = true;


export async function fetchUser() {
    if (MOCKED_AUTHORIZED) {
        return {
            "user": {
                "email": "test@example.com",
                "emailConfirmed": true,
                "state": null,
                "tariff": {
                    "name": "Базовый",
                    "type": "BASIC",
                    "remainingTime": 15,
                    "isActive": true,
                    "terms": {
                        "sites": 1,
                        "widgets": 5,
                        "miniVideo": true,
                        "stories": false,
                        "hideLogo": false,
                    },
                },
            },
        };
    }
    return {
        "errorCode": "NO_AUTH_TOKEN",
        "error": "Отсутствует авторизация",
    };
}

export async function fetchLogin({ email, password, remember }) {
    if (MOCKED_LOGIN_SUCCESS) {
        return {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwODVmZWIzLWVhZTYtNGMzNi1hNmJhLTk1ZGZmM2Q5YzVkOCIsImV4cCI6MTc0NTc0MTk3NCwiY3JlYXRlZF9hdCI6MTc0NTc0MTM3NCwidHlwZSI6IkFDQ0VTUyJ9.7kcDkvm2TkBJZjbpMwcZ6Q2kVFRKoMb9JGQSnguGH7I",
        };
    }
    return {
        "errorCode": "INCORRECT_PASSWORD",
        "error": "Неверный пароль",
    };
}

export async function fetchRegister({ email, password }) {
    if (MOCKED_REGISTER_SUCCESS) {
        return {
            "user": {
                "email": "test@example.com",
                "emailConfirmed": false,
            },
            "resendTimeout": 30,
        };
    }
    return {
        "errorCode": "USER_ALREADY_REGISTERED",
        "error": "Пользователь уже зарегистрирован",
    };
}

export async function resetPassword({ email }) {
    return {
        "user": {
            "email": "test@example.com",
            "emailConfirmed": true,
            "state": "PASSWORD_RESET",
            "tariff": {
                "name": "Базовый",
                "type": "BASIC",
                "remainingTime": 15,
                "isActive": true,
                "terms": {
                    "sites": 1,
                    "widgets": 5,
                    "miniVideo": true,
                    "stories": false,
                    "hideLogo": false,
                },
            },
        },
        "resendTimeout": 30
    }
}

export async function fetchCheckConfirmationKey(code) {
    return {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwODVmZWIzLWVhZTYtNGMzNi1hNmJhLTk1ZGZmM2Q5YzVkOCIsImV4cCI6MTc0NTc0MTk3NCwiY3JlYXRlZF9hdCI6MTc0NTc0MTM3NCwidHlwZSI6IkFDQ0VTUyJ9.7kcDkvm2TkBJZjbpMwcZ6Q2kVFRKoMb9JGQSnguGH7I",
    };
}

export async function fetchTariffs() {
    return {
        "tariffs": [
            {
                "id": "35809c62-ba15-49f2-bece-5077839ede60",
                "type": "BASIC",
                "name": "Базовый",
                "price": 990,
                "annualPrice": 9500,
                "period": 30,
                "features": [
                    "1 сайт / 5 виджетов\r",
                    "Мини-видео\r",
                    "Видео в контенте"
                ]
            },
            {
                "id": "f023ff3b-49b7-4890-a11a-048da40b84c7",
                "type": "BASIC",
                "name": "Оптимальный",
                "price": 1990,
                "annualPrice": 19100,
                "period": 30,
                "features": [
                    "5 сайтов / 20 виджетов\r",
                    "Мини-видео\r",
                    "Сторис\r",
                    "Видео в контенте\r",
                    "Сбор контактов\r",
                    "Без лого сервиса"
                ]
            },
            {
                "id": "ea894206-209f-429f-90ec-5c302c86ace6",
                "type": "BASIC",
                "name": "Всё включено",
                "price": 4990,
                "annualPrice": 47900,
                "period": 30,
                "features": [
                    "10 сайтов / 50 виджетов\r",
                    "Мини-видео\r",
                    "Сторис\r",
                    "Видео в контенте\r",
                    "Сбор контактов\r",
                    "Розыгрыш призов\r",
                    "Без лого сервиса\r",
                    "Премиум поддержка"
                ]
            }
        ]
    };
}

export async function fetchLandingHelp({ email, question }) {
    return { "success": true };
}
