"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Typography,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const SignupForm = ({}) => {
  const router = useRouter();

  const [userNameEmail, setUserNameEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState({ username: false, password: false });
  const [errorText, setErrorText] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [keepLogin, setKeepLogin] = useState(false);

  const validateAndPass = (e: FormEvent<HTMLHeadElement>) => {
    e.preventDefault();
    if (userPassword) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
      if (!passwordRegex.test(userPassword)) {
        setErrors((prev) => ({
          ...prev,
          password: true,
        }));
        setErrorText(
          "Password must contain at least 8 characters, including 1 uppercase letter, 1 number, and 1 special character (!@#$%^&*)",
        );
        setShowSnackbar(true);
      } else {
        setErrors((prev) => ({ ...prev, password: false }));
        setErrorText("");
        if (typeof window != undefined) {
          document.cookie = `keeplogin=${keepLogin}`;
        }
        router.push("/");
      }
    }
  };
  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        className="border-b pb-12 w-full lg:w-1/2 max-w-[300px] lg:max-w-lg"
        onSubmit={(e) => validateAndPass(e)}
      >
        <div className="flex flex-col gap-3">
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            Sign In
          </Typography>
          <span className="flex gap-1 items-center">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              New User?
            </Typography>
            <Link href={"#"} className="text-[blue] font-semibold">
              Create a User
            </Link>
          </span>
          <div className="w-full flex flex-col gap-5">
            <TextField
              required
              error={!!errors.username}
              label="Username or Email"
              value={userNameEmail}
              onChange={(e) => setUserNameEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              required
              error={!!errors.password}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="large"
                  checked={keepLogin}
                  onChange={() => setKeepLogin(!keepLogin)}
                />
              }
              label="Keep me signed in"
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{ backgroundColor: "black" }}
            >
              Sign in
            </Button>
          </div>
        </div>
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={Object.values(errors).includes(true) ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorText}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignupForm;
