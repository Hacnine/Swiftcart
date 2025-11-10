import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, FormControlLabel, Grid, Stack, Alert, CircularProgress } from "@mui/material";
import {
  InputField,
  CheckBoxField,
  Wrapper,
  CustomLink,
  PrimaryButton,
} from "./index";
import { register, selectIsAuthenticated, selectAuth } from "../../store/slices/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { loading, error } = useSelector(selectAuth);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setValidationError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setValidationError("All fields are required");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    const resultAction = await dispatch(register({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
    }));

    if (register.fulfilled.match(resultAction)) {
      console.log("Registration successful");
      // Redirect handled by useEffect
    }
  };

  return (
    <Wrapper welcomeMessage="Let's begin with " pageName="Sign Up">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {(error || validationError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || validationError}
          </Alert>
        )}
        
        <Stack>
          <Stack direction="row" spacing={1}>
            <InputField 
              label="First Name" 
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <InputField 
              label="Last Name" 
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Stack>
          
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
          
          <InputField 
            label="Re Enter Password" 
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Stack>

        <FormControlLabel
          control={
            <CheckBoxField 
              color="Indigo"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
          }
          label={<span className="text-sm text-gray-600">I agree to terms & conditions</span>}
        />
        
        <Box sx={{ position: 'relative' }}>
          <PrimaryButton 
            name={loading ? "Creating Account..." : "Sign Up"} 
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
          <CustomLink message="Have an account? Sign In" link="/signin" />
        </Grid>
      </Box>
    </Wrapper>
  );
};

export default SignUp;
