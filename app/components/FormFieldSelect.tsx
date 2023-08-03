'use client'
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

const FormFieldSelect = ({formik, field}:any) => {
    return (
        <FormControl component="fieldset" error={formik.touched[field.fieldName] && Boolean(formik.errors[field.fieldName])}>
            <FormLabel component="legend">{field.fieldName}</FormLabel>
            <RadioGroup
                row
                name={field.fieldName}
                value={formik.values[field.fieldName]}
                onChange={formik.handleChange}
            >
                {field.options.map((option: string) => (
                    <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={option}
                    />
                ))}
            </RadioGroup>
            {formik.touched[field.fieldName] && formik.errors[field.fieldName] && (
                <Box>{formik.errors[field.fieldName]}</Box>
            )}
        </FormControl>
    )
}

export default FormFieldSelect