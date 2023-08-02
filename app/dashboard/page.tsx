'use client'
import React from 'react'
import useAxios from '@/hooks/useAxios'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, TextField, useTheme } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar'

const DashboardHome = () => {
    const theme = useTheme()
    const { data, loading, error } = useAxios('form', { method: 'get' });
    const formFields = data?.data
    
    return (
        <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden', p: 5 }}>
            <Grid container justifyContent={'center'} height={'100%'}>
                <Grid item xs={12} sm={8} md={6} height={'100%'}>
                    <Card sx={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", height: '100%', bgcolor: 'rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                        <CardHeader title='Ulventech Dynamic Form' sx={{ color: theme.palette.primary.main, boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px" }} titleTypographyProps={{ fontWeight: 700 }} />
                        <CardContent sx={{ flexGrow: 1, height: 'calc(100% - 130px)', pr: 0  }}>
                            <PerfectScrollbar style={{ height: '100%', overflowY: 'auto', paddingRight: '15px', paddingTop:'12px'}}>
                                <Grid container spacing={2}>
                                    {formFields?.length > 0 ? formFields.map((field:any, index: number) => <Grid key={index} item xs={12}><TextField fullWidth value={field.value} label={field.fieldName}  /></Grid>): <></>}
                                </Grid>
                            </PerfectScrollbar>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset" }}>
                            <Button variant='contained'>Update Form</Button>
                        </CardActions>

                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DashboardHome


