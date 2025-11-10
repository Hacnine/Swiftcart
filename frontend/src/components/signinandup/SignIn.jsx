
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, FormControlLabel, Grid, Alert, CircularProgress } from "@mui/material";
import {
  InputField,
  CheckBoxField,
  Wrapper,
  CustomLink,
  PrimaryButton,
} from "./index";
import { login, selectIsAuthenticated, selectAuth } from "../../store/slices/authSlice";
import { initSocket } from "../../services/socket";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { loading, error, token } = useSelector(selectAuth);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      // Initialize Socket.IO connection on successful login
      if (token) {
        initSocket(token);
      }
      navigate("/");
    }
  }, [isAuthenticated, token, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    const resultAction = await dispatch(login({
      email: formData.email,
      password: formData.password,
    }));

    if (login.fulfilled.match(resultAction)) {
      // Success - redirect handled by useEffect
      console.log("Login successful");
    }
  };

  return (
    <Wrapper welcomeMessage="Welcome to " pageName="Sign In">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <InputField 
          label="Email" 
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField 
          label="Password" 
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <FormControlLabel
          control={
            <CheckBoxField 
              color="Indigo"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
          }
          label={<span className="text-sm text-gray-600">Remember Me</span>}
        />
        
        <Box sx={{ position: 'relative' }}>
          <PrimaryButton 
            name={loading ? "Signing In..." : "Sign In"} 
            disabled={loading}
          />
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
        
        <Grid container>
          <CustomLink message="Forgot password?" link="/forgot-password" />
          <CustomLink message="Don't have an account? Sign Up" link="/signup" />
        </Grid>
      </Box>
    </Wrapper>
  );
};

export default SignIn;
