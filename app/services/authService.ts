import api from '../lib/api';

export const authService = {
    login: (credentials: { username: string; password: string }) => {
        return api.post('/auth/login', {
            ...credentials,
            expiresInMins: 60,
        }).then(res => res.data);
    },
};
