import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { cartService } from "../../services/cartService";

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

export const updateCartOnServer = createAsyncThunk(
    "cart/updateOnServer",
    async (cartData: { userId: number; products: { id: number; quantity: number }[] }, { rejectWithValue }) => {
        try {
            return await cartService.updateCart(cartData.userId, cartData.products);
        } catch (error: any) {
            return rejectWithValue(error || "Failed to update cart");
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
