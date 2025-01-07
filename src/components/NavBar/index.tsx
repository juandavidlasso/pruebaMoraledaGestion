'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { User } from 'next-auth';
import { imageWithBasePath } from '@/lib/utils/redirect';
import { logout } from '@/app/(auth)/login/actions';

interface Props {
    user: User;
}

const NavBar: React.FC<Props> = ({ user }) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position='static' sx={{ background: '#ecf0f1' }}>
            <Container>
                <Toolbar disableGutters>
                    <Image
                        src={imageWithBasePath('/assets/icons/Icon-logo.png')}
                        alt='Logo'
                        width={60}
                        height={60}
                        priority
                        style={{ width: '60px', height: '60px' }}
                    />

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
                        <Typography sx={{ color: '#212f3d', fontSize: 15, fontWeight: 600 }}>Moraleda Gestión</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        <Typography sx={{ color: '#212f3d', fontSize: 20, fontWeight: 600 }}>Moraleda Gestión</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title='Opciones'>
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ pl: 2, pr: 2, background: '#212f3d', '&:hover': { background: '#212f3d' } }}
                            >
                                <Typography sx={{ color: '#FFFFFF', fontSize: 20 }}>{user?.name?.charAt(0)}</Typography>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id='menu-appbar'
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem
                                onClick={async () => {
                                    handleCloseUserMenu();
                                    await logout();
                                }}
                            >
                                <Typography sx={{ textAlign: 'center' }}>Cerrar sesión</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
