import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

export const defaultAuthState = {
    user: {
        id: 1,
        username: 'emilys',
        email: 'emily@test.com',
        firstName: 'Emily',
        lastName: 'Smith',
        gender: 'female',
        image: '',
        token: 'mock-token',
    },
    loading: false,
    error: null,
    isAuthenticated: true,
};

export const defaultUiState = {
    theme: 'light' as const,
    sidebarOpen: false,
};

export const defaultProductsState = {
    items: [],
    total: 0,
    loading: false,
    error: null,
    categories: ['All', 'smartphones', 'laptops'],
    selectedCategory: null,
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 9,
    selectedProduct: null,
};

export const defaultCartState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    loading: false,
    error: null,
};

export const mockProduct = {
    id: 1,
    title: 'Test Product',
    description: 'Test description',
    price: 99.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 50,
    brand: 'TestBrand',
    category: 'smartphones',
    thumbnail: '/test-image.jpg',
    images: ['/test-image-1.jpg', '/test-image-2.jpg'],
};

interface MockAuthState {
    user?: typeof defaultAuthState.user | null;
    loading?: boolean;
    error?: string | null;
    isAuthenticated?: boolean;
}

interface MockProductsState {
    items?: typeof defaultProductsState.items;
    total?: number;
    loading?: boolean;
    error?: string | null;
    categories?: string[];
    selectedCategory?: string | null;
    searchQuery?: string;
    currentPage?: number;
    itemsPerPage?: number;
    selectedProduct?: typeof defaultProductsState.selectedProduct;
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    preloadedState?: {
        auth?: MockAuthState;
        ui?: Partial<typeof defaultUiState>;
        products?: MockProductsState;
        cart?: Partial<typeof defaultCartState>;
    };
}

export function createMockStore(preloadedState: ExtendedRenderOptions['preloadedState'] = {}) {
    return configureStore({
        reducer: {
            auth: (state = { ...defaultAuthState, ...preloadedState?.auth }, action: any) => {
                switch (action.type) {
                    case 'auth/logout':
                        return { ...state, user: null, isAuthenticated: false };
                    default:
                        return state;
                }
            },
            ui: (state = { ...defaultUiState, ...preloadedState?.ui }, action: any) => {
                switch (action.type) {
                    case 'ui/setSidebar':
                        return { ...state, sidebarOpen: action.payload };
                    default:
                        return state;
                }
            },
            products: (state = { ...defaultProductsState, ...preloadedState?.products }, action: any) => {
                switch (action.type) {
                    case 'products/setCategory':
                        return { ...state, selectedCategory: action.payload };
                    case 'products/setSearchQuery':
                        return { ...state, searchQuery: action.payload };
                    default:
                        return state;
                }
            },
            cart: (state = { ...defaultCartState, ...preloadedState?.cart }, action: any) => {
                switch (action.type) {
                    case 'cart/addToCart':
                        return { ...state, totalQuantity: state.totalQuantity + 1 };
                    default:
                        return state;
                }
            },
        },
    });
}

export function renderWithProviders(
    ui: React.ReactElement,
    options: ExtendedRenderOptions = {}
) {
    const { preloadedState, ...renderOptions } = options;
    const store = createMockStore(preloadedState);

    function Wrapper({ children }: { children: React.ReactNode }) {
        return <Provider store={store}>{children}</Provider>;
    }

    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
}
