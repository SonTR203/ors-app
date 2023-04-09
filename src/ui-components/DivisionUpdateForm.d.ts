/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Division } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DivisionUpdateFormInputValues = {
    name?: string;
    abbreviation?: string;
    teams?: string[];
    level?: string;
    description?: string;
    is_playoff?: boolean;
};
export declare type DivisionUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    abbreviation?: ValidationFunction<string>;
    teams?: ValidationFunction<string>;
    level?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    is_playoff?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DivisionUpdateFormOverridesProps = {
    DivisionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    abbreviation?: PrimitiveOverrideProps<TextFieldProps>;
    teams?: PrimitiveOverrideProps<TextFieldProps>;
    level?: PrimitiveOverrideProps<SelectFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    is_playoff?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type DivisionUpdateFormProps = React.PropsWithChildren<{
    overrides?: DivisionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    division?: Division;
    onSubmit?: (fields: DivisionUpdateFormInputValues) => DivisionUpdateFormInputValues;
    onSuccess?: (fields: DivisionUpdateFormInputValues) => void;
    onError?: (fields: DivisionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DivisionUpdateFormInputValues) => DivisionUpdateFormInputValues;
    onValidate?: DivisionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DivisionUpdateForm(props: DivisionUpdateFormProps): React.ReactElement;
