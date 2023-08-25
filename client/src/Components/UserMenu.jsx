import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { styles } from '../styles/appFrame.styles'
import { Box } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';



export default function MenuPopupState() {
    const navigate = useNavigate();
    
    function handleLogout() {

        fetch('http://localhost:8000/accounts/api/v1/logout/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ token: localStorage.getItem('token') })  
        })
            .then(response => {
                if (response.ok) {
                    // Remove the token from local storage.
                    localStorage.removeItem('token');
                    navigate("/login");
                }
            });
    }

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Box>
                        <PermIdentityIcon sx={styles.icon} {...bindTrigger(popupState)}/>
                    </Box>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}>Profile</MenuItem>
                        <MenuItem onClick={popupState.close}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}><LogoutOutlinedIcon sx={ styles.icon }/></MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}
