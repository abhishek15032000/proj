import { ButtonBaseProps, ButtonProps } from "@mui/material";
import React from "react";


export interface CCButtonProps extends ButtonProps {
    text?: string;
    rounded?: boolean;
    children: React.ReactNode;
}
