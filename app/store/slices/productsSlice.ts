import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { productService } from "../../services/productService";

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

interface ProductsState {
    items: Product[];
    total: number;
    loading: boolean;
    error: string | null;
    categories: string[];
    selectedCategory: string | null;
    searchQuery: string;
    currentPage: number;
    itemsPerPage: number;
    selectedProduct: Product | null;
}

const initialState: ProductsState = {
    items: [],
    total: 0,
    loading: false,
    error: null,
    categories: [],
    selectedCategory: null,
    searchQuery: "",
    currentPage: 1,
    itemsPerPage: 9,
    selectedProduct: null,
};

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (params: { limit: number; skip: number; category?: string | null; search?: string }, { rejectWithValue }) => {
        try {
            return await productService.getAll(params);
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const fetchCategories = createAsyncThunk(
    "products/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            return await productService.getCategories();
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (id: string, { rejectWithValue }) => {
        try {
            return await productService.getById(id);
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
            state.currentPage = 1;
            state.searchQuery = "";
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.currentPage = 1;
            state.selectedCategory = null;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.products;
                state.total = action.payload.total;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = ["All", ...action.payload];
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCategory, setSearchQuery, setCurrentPage, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
