import React from "react";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import { Box } from '@mui/material';
import { styles } from '../styles/appFrame.styles'
import { Link } from 'react-router-dom'
import UserMenu from './UserMenu.jsx'
export default function AppFrame({ children }) {

    return (
        <Box sx={styles.mainBox } >
            <Box sx={ styles.secondBox } >
                <Box  sx={ styles.thirdBox } >
                    <Box
                        component="img"
                        src='/assets/logo.svg'
                        alt="Logo"
                        sx={styles.img}>
                    </Box>
                    <Box>
                        <UserMenu />
                    </Box>
                </Box>
                {children}
                <Box sx={ styles.centerBox} >
                    <Box>
                        <BarChartOutlinedIcon sx={ styles.icon } />
                    </Box>
                    <Box>
                        <Link to='/categories'>
                            <CategoryOutlinedIcon sx={ styles.icon } />
                        </Link>
                    </Box>
                    <Box>
                        <Link to='/operations'>
                            <EuroOutlinedIcon sx={ styles.icon } />
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
