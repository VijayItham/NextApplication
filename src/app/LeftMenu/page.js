import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import _ from "lodash";

const LeftMenu = () => {
  const userDetails = useSelector(
    (state) => state?.appUserReducer?.userDetail ?? {}
  );
  console.log("userDetails21123123", userDetails);
  const drawerWidth = 240;
  return (
    <div>
      {!_.isEmpty(userDetails) && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              marginTop: "73px", // Add the margin top here
              marginLeft: "10px",
              "--Paper-shadow": "none", // Disable shadow
            },
          }}
        >
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
      )}
    </div>
  );
};

export default LeftMenu;
