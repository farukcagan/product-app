import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UISerializableState {
    theme: "light" | "dark";
    sidebarOpen: boolean;
}

const initialState: UISerializableState = {
    theme: "light",
    sidebarOpen: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        setSidebar: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload;
        },
    },
});

export const { toggleTheme, setSidebar } = uiSlice.actions;
export default uiSlice.reducer;
