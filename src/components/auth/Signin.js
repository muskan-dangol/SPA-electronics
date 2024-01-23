// SignupForm.js

import React from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../store/action";
import { useRecoilState } from "recoil";
import { userSigninState } from "../../store/atom";
import {
  Typography,
  Button,
  TextField,
  Grid,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(userSigninState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(signin(formData));
      navigate("/");
    } catch (error) {
      console.error("Signin error:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 30,
          }}
        >
          <FormControl
            sx={{
              width: "50vw",
              border: "1px solid gray",
              p: 5,
              borderRadius: 2,
            }}
          >
            <Typography variant="h4">Sign In</Typography>
            <Typography variant="h6">Email</Typography>
            <TextField
              name="email"
              type="text"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <Typography variant="h6">Password</Typography>
            <TextField
              name="password"
              type="password"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <Grid container>
              <Grid item mt={3}>
                <Button type="submit" variant="contained">
                  sign in
                </Button>
              </Grid>
            </Grid>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Don't have an Account?
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignInForm;
