/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DivisionCreateFormInputValues = {
    name?: string;
    abbreviation?: string;
    teams?: string[];
    level?: string;
    description?: string;
    is_playoff?: boolean;
};
export declare type DivisionCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    abbreviation?: ValidationFunction<string>;
    teams?: ValidationFunction<string>;
    level?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    is_playoff?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DivisionCreateFormOverridesProps = {
    DivisionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    abbreviation?: PrimitiveOverrideProps<TextFieldProps>;
    teams?: PrimitiveOverrideProps<TextFieldProps>;
    level?: PrimitiveOverrideProps<SelectFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    is_playoff?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type DivisionCreateFormProps = React.PropsWithChildren<{
    overrides?: DivisionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DivisionCreateFormInputValues) => DivisionCreateFormInputValues;
    onSuccess?: (fields: DivisionCreateFormInputValues) => void;
    onError?: (fields: DivisionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DivisionCreateFormInputValues) => DivisionCreateFormInputValues;
    onValidate?: DivisionCreateFormValidationValues;
} & React.CSSProperties>;
export default function DivisionCreateForm(props: DivisionCreateFormProps): React.ReactElement;
