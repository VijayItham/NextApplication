"use client";
import * as React from 'react';
import { Box, Drawer, CssBaseline, Toolbar, List, Typography, Divider, IconButton, 
    ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useTheme, AppBar as MuiAppBar}  from '@mui/material';
import {Menu, ChevronLeft, ChevronRight, Inbox  } from '@mui/icons-material';
import AddAppRole from './AppRole/AddAppRole'
import AppUserRole from './AppUser/AddAppUser';
import { MenuList, MenuSelection } from '../constants/MenuConst';

const drawerWidth = 240;

const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 0 : `-${drawerWidth}px`,
  }));
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState (false);
  const [selectedMenu, setSelectedMenu] = React.useState(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (component) => {
    setSelectedMenu(component);
};

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Recharge App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {MenuList.map(({id, value, name}) => (
            <ListItem key={id} disablePadding>
              <ListItemButton  onClick={() => handleMenuClick(name)}>
                <ListItemIcon>
                   <Inbox />
                </ListItemIcon>
                <ListItemText primary={value}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography sx={{ marginBottom: 2 }}>
        {selectedMenu === MenuSelection.ROLE && <AddAppRole />}
        {selectedMenu === MenuSelection.USER  && <AppUserRole />} 
        </Typography>
      </Main>
    </Box>
  );
}
