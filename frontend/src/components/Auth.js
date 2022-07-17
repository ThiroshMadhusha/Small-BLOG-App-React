import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "../store";

const Auth = () => {
  // Change Project To REDUX
  const dispatch = useDispatch();
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

    if (isSignup) {
      sendRequest("signup")
        .then(() => dispatch(authAction.login()))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then(() => dispatch(authAction.login()))
        .then((data) => console.log(data));
    }
  };

  // send requests
  // mehi type use karanne login ekata amatharawa signup eka thiyena nisa
  const sendRequest = async (type = "signin") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((error) => console.log(error));

    const data = await res.data;
    return data;
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
