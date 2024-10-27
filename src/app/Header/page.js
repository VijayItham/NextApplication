// app/components/Header.js
"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { doLogout, getUserDetails } from "../common/auth";
import { onLogout } from "../redux/AppUserSlice";
import _ from "lodash";

const Header = () => {
  const  userDetail  = useSelector((state) => state?.appUserReducer?.userDetail??{});
  const router = useRouter();
  const dispatch = useDispatch();
  console.log('userDetail', userDetail)
  const handleLogout = () => {
    dispatch(onLogout());
    router.push("/");
  };
  return (
    <AppBar position="static">
      <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
             {!_.isEmpty(userDetail) ? `Welcome, ${userDetail.userName}` : "Recharge App"}
          </Typography>
        { !_.isEmpty(userDetail) ? ( 
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Link href="/Login" passHref>
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/SignUp" passHref>
              <Button color="inherit">Signup</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
