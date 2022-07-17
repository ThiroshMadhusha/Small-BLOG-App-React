import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const Auth = () => {
  // This useState used for Button change and Form Names Change
  const [isSignup, setIsSignup] = useState(false);

  // This useState use for Text Field
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handleChange For All TExt Fields
  const handleChange = (e) => {
    setInputs((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  // handleSubmit For Form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={10}
          borderRadius={5}
          maxWidth={400}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Register" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              margin="normal"
              placeholder="Enter Your User Name"
              value={inputs.name}
              onChange={handleChange}
              name="name"
            />
          )}
          {""}
          <TextField
            type={"email"}
            margin="normal"
            placeholder="Enter Your Email"
            value={inputs.email}
            onChange={handleChange}
            name="email"
          />
          <TextField
            type={"password"}
            margin="normal"
            placeholder="Enter Your Password"
            value={inputs.password}
            onChange={handleChange}
            name="password"
          />

          <Button
            color="warning"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            type="submit"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Already {isSignup ? "Have" : "Haven't"} an Account.{" "}
            {isSignup ? "Login" : "Signup"} Here
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
