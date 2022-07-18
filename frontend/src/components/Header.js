import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [value, setvalue] = useState();

  // For Logout Buttonn Using useDispatch()
  const dispatch = useDispatch();
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);",
      }}
    >
      <Toolbar>
        <Typography variant="h4">Thirosh BLOG</Typography>

        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setvalue(val)}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
                LinkComponent={Link}
                to="/auth"
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
                LinkComponent={Link}
                to="/auth"
              >
                Sign Up
              </Button>{" "}
            </>
          )}
          {isLoggedIn && (
            <Button
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
              LinkComponent={Link}
              to="/auth"
              onClick={() => dispatch(authAction.logout())}
            >
              LogOut
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
