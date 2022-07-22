import { FilledTextFieldProps, StandardTextFieldProps, TextFieldProps } from "@mui/material";
import { MuiTextFieldProps } from "@mui/x-date-pickers/internals";

export type CCInputFieldProps = TextFieldProps & {
    clearFn?: any
}