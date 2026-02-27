import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    loading: false,
    error: null,
};

// DummyJSON update cart action
export const updateCartOnServer = createAsyncThunk(
    "cart/updateOnServer",
    async (cartData: { userId: number; products: { id: number; quantity: number }[] }, { rejectWithValue }) => {
        try {
            // DummyJSON update cart example (using cart id 1 for demo)
            const response = await axios.put("https://dummyjson.com/carts/1", {
                merge: true, // merge existing products with new products
                products: cartData.products,
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update cart");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }

            state.totalQuantity++;
            state.totalAmount += newItem.price;
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter(item => item.id !== id);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateCartOnServer.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCartOnServer.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateCartOnServer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
