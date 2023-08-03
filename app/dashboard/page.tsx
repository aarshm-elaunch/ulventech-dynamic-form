/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from 'next/navigation'
import useAxios from "@/app/hooks/useAxios";
import axios from 'axios';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Grid,
    useTheme,
} from "@mui/material";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import FormFieldText from "../components/FormFieldText";
import FormFieldSelect from "../components/FormFieldSelect";
import FormFieldEmail from "../components/FormFieldEmail";
import FormFieldMultiline from "../components/FormFieldMultiline";

const DashboardHome = () => {
    const theme = useTheme();
    const { data, loading, error } = useAxios("form", { method: "get" });
    const formFields = data?.data;
    const router = useRouter()
    const [originalValues, setOriginalValues] = useState<{
        [key: string]: string;
    }>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const newObject: { [key: string]: string } = {};
        formFields?.forEach((field: any) => {
            newObject[field.fieldName] = field.value;
        });
        setOriginalValues(newObject);
        formik.setValues(newObject);
    }, [formFields]);

    useEffect(() => {
        if (!isEmpty(originalValues) && !loading) {
            console.log(formFields);
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [originalValues, loading]);

    const yupObject: { [key: string]: any } = {};
    formFields?.forEach((field: any) => {
        yupObject[field.fieldName] =
            field.fieldName === "firstName" || field.fieldName === "lastName"
                ? Yup.string().trim().required()
                : field.fieldName === "emailAddress"
                    ? Yup.string().email().required()
                    : field.type === "number"
                        ? Yup.number().typeError(`${field.fieldName} must be a number`)
                        : Yup.string();
    });

    const validationSchema = Yup.object().shape(yupObject);

    const formik = useFormik({
        initialValues: originalValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true)
            try {
                // Make the POST API call here
                const response = await axios.post('https://ulventech-react-exam.netlify.app/api/form', values);
                console.log(response);
                if (response.data.success) {
                    router.push('/dashboard/submit-success')
                    setTimeout(() => setIsLoading(false), 1000)
                }
                // Handle the response here (if needed)

                // If the API call is successful, you can perform further actions or show success messages.
                // For example, you can redirect to a different page or display a success message.
            } catch (error: any) {
                // Handle any API error here
                console.error('API Error:', error.message);
            }
        },
    });

    const {
        handleSubmit,
        setFieldValue,
        getFieldProps,
        setFieldError,
        touched,
        errors,
        resetForm,
        values,
    } = formik;

    return (
        <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden", p: 5 }}>
            {!isLoading ? (
                <Grid container justifyContent={"center"} height={"100%"}>
                    <Grid item xs={12} sm={10} md={8} lg={6} height={"100%"}>
                        <form onSubmit={handleSubmit} style={{ height: "100%" }}>
                            <Card
                                sx={{
                                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                    height: "100%",
                                    bgcolor: "rgba(0,0,0,0.05)",
                                    display: "flex",
                                    flexDirection: "column",
                                }}>
                                <CardHeader
                                    title="Ulventech Dynamic Form"
                                    sx={{
                                        color: theme.palette.primary.main,
                                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                                    }}
                                    titleTypographyProps={{ fontWeight: 700 }}
                                />
                                <CardContent
                                    sx={{ flexGrow: 1, height: "calc(100% - 130px)", pr: 0 }}>
                                    <PerfectScrollbar
                                        style={{
                                            height: "100%",
                                            overflowY: "auto",
                                            paddingRight: "15px",
                                            paddingTop: "12px",
                                        }}>
                                        <Grid container spacing={2}>
                                            {formFields?.length > 0 ? (
                                                formFields.map((field: any, index: number) => (
                                                    <Grid
                                                        key={index}
                                                        item
                                                        xs={12}
                                                        sm={
                                                            field.fieldName === "firstName" ||
                                                                field.fieldName === "lastName"
                                                                ? 6
                                                                : 12
                                                        }>
                                                        {field.type === "text" ||
                                                            field.type === "number" ? (
                                                            <FormFieldText formik={formik} field={field} />
                                                        ) : field.type === "select" ? (
                                                            <FormFieldSelect formik={formik} field={field} />
                                                        ) : field.type === "email" ? (
                                                            <FormFieldEmail formik={formik} field={field} />
                                                        ) : field.type === "multiline" ? (
                                                            <FormFieldMultiline
                                                                formik={formik}
                                                                field={field}
                                                            />
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </Grid>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </Grid>
                                    </PerfectScrollbar>
                                </CardContent>
                                <CardActions
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
                                        p: 2.5,
                                    }}>
                                    <Button type="submit" variant="contained">
                                        Update Form
                                    </Button>
                                </CardActions>
                            </Card>
                        </form>
                    </Grid>
                </Grid>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                    }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
};

export default DashboardHome;
