import { ThemeOptions } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Colors } from "../../theme";


const initialState: ThemeOptions = {
    typography: {
        fontFamily: ['"Poppins"'].join(","),
    },
    palette: {
        primary: {
            light: Colors.white,
            main: Colors.dullOrange,
        },
        secondary: {
            main: "#f50057",
        },
        background: {
            default: "#fff",
        },
        success: {
            main: "#2a0d2b",
        },
    },
};

const theme = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changePallete: (state, action: PayloadAction<any>) => {
            state.palette = action.payload
        },
    },
})

export const { changePallete } = theme.actions




export default theme.reducer;
