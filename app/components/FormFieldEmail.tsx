'use client'
import { TextField } from '@mui/material';
import React from 'react'

const FormFieldEmail = ({ formik, field }: any) => {
    return (
        <TextField
            type='email'
            fullWidth
            label={field.fieldName}
            {...formik.getFieldProps(field.fieldName)}
            value={formik.values[field.fieldName]}
            error={formik.touched[field.fieldName] && Boolean(formik.errors[field.fieldName])}
            helperText={formik.touched[field.fieldName] && formik.errors[field.fieldName]}
        />
    )
}

export default FormFieldEmail