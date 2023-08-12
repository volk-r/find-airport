import React from "react";

export interface IFormValues {
    [key: string]: string;
}

export interface IUseForm {
    formValues: IFormValues;
    setFormValues: (formValues: IFormValues) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}