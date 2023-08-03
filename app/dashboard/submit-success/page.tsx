'use client'
import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Lottie from "react-lottie-player";
import submitJson from '@/public/submitted.json'
import { useRouter } from 'next/navigation';

const SubmissionSuccess = () => {
    const router = useRouter()
    const [render, setRender] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => setRender(true),2000)
    }, [])

    const handleNewFormClick = () => {
        router.push('/dashboard')
    }
    return (
        <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden", p: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%', width: '100%' }}>
                <Lottie
                    animationData={submitJson}
                    play
                    loop={false}
                    style={{ width: 250, height: 250 }}
                />
                {render && <Box><Button onClick={handleNewFormClick} variant='outlined' sx={{textTransform: 'capitalize'}}>Generate new form</Button></Box>}
            </Box>
        </Box>
    )
}

export default SubmissionSuccess