import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const Auth = () => {
  return (
    <div>
      <form>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          maxWidth={400}
        >
          <Typography padding={3} textAlign="center">
            Login
          </Typography>
          <TextField margin="normal" />
          <TextField margin="normal" />
          <TextField margin="normal" />

          <Button>SignIn</Button>
          <Button>If You Already Haven't Account. SignUp Here</Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
