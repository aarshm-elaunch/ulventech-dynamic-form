'use client'
import { TextField } from '@mui/material'
import React from 'react'

const FormFieldText = ({ formik, field }: any) => {
    return (
        <TextField
            inputProps={{
                inputMode: field.type === 'number' ? 'numeric' : 'text',
                pattern: field.type === 'number' ? '[0-9]*' : undefined,
            }}
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

export default FormFieldText