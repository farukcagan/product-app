import api from '../lib/api';

export const productService = {
    getAll: (params: { limit: number; skip: number; category?: string | null; search?: string }) => {
        let url = '/products';
        const { limit, skip, category, search } = params;

        if (search) {
            url = `/products/search?q=${search}&limit=${limit}&skip=${skip}`;
        } else if (category && category !== 'All') {
            url = `/products/category/${category}?limit=${limit}&skip=${skip}`;
        } else {
            url = `${url}?limit=${limit}&skip=${skip}`;
        }

        return api.get(url).then(res => res.data);
    },

    getCategories: () => {
        return api.get('/products/category-list').then(res => res.data);
    },

    getById: (id: string) => {
        return api.get(`/products/${id}`).then(res => res.data);
    },

    getCommentsByProductId: (id: string) => {
        return api.get(`/comments/post/${id}`).then(res => res.data);
    }
};
