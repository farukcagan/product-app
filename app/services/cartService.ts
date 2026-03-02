import api from '../lib/api';

export const cartService = {
    updateCart: (userId: number, products: { id: number; quantity: number }[]) => {
        return api.put('/carts/1', {
            merge: true,
            products: products,
        }).then(res => res.data);
    },
};
