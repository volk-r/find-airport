import React, { useState } from 'react';
import { IFormValues, IUseForm } from '../utils/interfaces';

export function useForm( inputValues: IFormValues ): IUseForm {
    const [formValues, setFormValues] = useState<IFormValues>(inputValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setFormValues({...formValues, [name]: value});
    };

    return {
        formValues,
        setFormValues,
        handleChange,
    };
}