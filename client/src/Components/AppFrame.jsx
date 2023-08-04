import React from "react";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Box } from '@mui/material';

export default function AppFrame({children}) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
                pt: '1.5rem',
                pb: '1.5rem',
            }}
        >
            <Box
                sx={{
                    border: '2px solid',
                    borderColor: 'secondary.main',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '80%',
                    margin: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    borderRadius: '.6rem',
                    bgcolor: 'background.white',
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // gap: '1rem',
                        alignSelf: 'flex-start',
                        marginBottom: 'auto',
                        p: 3,
                        width: '100%',
                    }}
                >
                    <Box

                    >
                        <LogoutOutlinedIcon sx={{color:'secondary.main'}}/>
                    </Box>
                </Box>

                    {children}

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // gap: '1rem',
                        alignSelf: 'flex-start',
                        marginTop: 'auto',
                        p: 3,
                        width: '100%',
                    }}
                >
                    <Box

                    >
                        <BarChartOutlinedIcon sx={{color:'secondary.main'}}/>
                    </Box>
                    <Box

                    >
                        <CategoryOutlinedIcon sx={{color:'secondary.main'}}/>
                    </Box>
                    <Box>
                        <EuroOutlinedIcon sx={{color:'secondary.main'}} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
