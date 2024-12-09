import * as React from 'react';
import { Box, Avatar, Menu, MenuItem } from '@mui/material';
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doLogout } from '../common/auth';


export default function Profile() {
    const router = useRouter();
    console.log(router);
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsBoxVisible(!isBoxVisible);
    };

    const closeBox = () => {
        setIsBoxVisible(false);
    };

    const handleLogout = () => {
        doLogout();
        router.push("/");
    }

    return (
        <div>
            <Box
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar
                    alt="User Avatar" 
                    src="/images/Codetrex_logo.png"
                    sx={{ width: 40, height: 40, cursor: "pointer" }}
                />
            </Box>
            {
                isBoxVisible &&
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    sx={{mt:1}}
                    onClick={closeBox}

                >
                    <MenuItem >
                        <SettingsIcon sx={{ color: "#666666", marginRight: 1 }} />
                        Settings
                    </MenuItem>
                    <MenuItem >
                        <PersonIcon sx={{ color: "#666666", marginRight: 1 }} />
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <LogoutIcon sx={{ color: "#666666", marginRight: 1 }} />
                        Logout
                    </MenuItem>
                </Menu>
            }

        </div>
    );
}
