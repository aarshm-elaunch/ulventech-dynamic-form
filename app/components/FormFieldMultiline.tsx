'use client'
import { TextField } from '@mui/material'
import React from 'react'

const FormFieldMultiline = ({ field, formik }: any) => {
    return (
        <TextField
            type='text'
            multiline
            rows={3}
            fullWidth
            label={field.fieldName}
            {...formik.getFieldProps(field.fieldName)}
            name={field.fieldName}
            value={formik.values[field.fieldName]}
            error={formik.touched[field.fieldName] && Boolean(formik.errors[field.fieldName])}
            helperText={formik.touched[field.fieldName] && formik.errors[field.fieldName]}
        />
    )
}

export default FormFieldMultiline