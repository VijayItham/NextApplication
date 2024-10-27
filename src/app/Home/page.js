// app/components/Home.js
"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { doLogout } from "../common/auth";

const drawerWidth = 240;

const Home = () => {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      {/* <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">My Application</Typography>
        </Toolbar>
      </AppBar> */}

      {/* Permanent Drawer (Left Sidebar Menu) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          
          [`& .MuiDrawer-paper`]: { marginTop:'100px', width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} href="/AppRole">
            <ListItemText primary="App Role" />
          </ListItem>
          <ListItem button component={Link} href="/AppUser">
            <ListItemText primary="App User" />
          </ListItem>
          <ListItem button component={Link} href="/Menu">
            <ListItemText primary="Menu" />
          </ListItem>
          <ListItem button component={Link} href="/RoleMenu">
            <ListItemText primary="Role Menu" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          marginLeft: `${drawerWidth}px`, // Ensure the main content moves right of the drawer
        }}
      >
        <Toolbar /> {/* Add space for AppBar */}
        <Typography variant="h4">Welcome to My Application</Typography>
        <Typography paragraph>
          Click the links on the left to navigate.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
