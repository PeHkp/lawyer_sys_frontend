import React, { useReducer } from "react";
import { Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import "./Login.css";
import DefaultButton from "../../components/Button/DefaultButton";
import { useNavigate } from 'react-router-dom';
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import { Box } from "@mui/system";
import LoginService from "./LoginService";

const initialState = {
  email: '',
  password: '',
  visiblityPassword: false,
  errorMsg: ''
}

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.data }
    case "clear":
      return initialState
    case 'success':
      return { ...state, success: true, error: false }
    case 'error':
      return { ...state, success: false, error: true }
    case 'close_alert':
      return { ...state, success: false, error: false }
    default:
      return new Error();
  }
}

function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { email, password } = state
  const { visiblityPassword, errorMsg, ...data } = state

  let navigate = useNavigate();

  const handleChange = ({ target: { value, name } }) => {
    dispatch({ type: 'update', data: { [name]: value } })
  }

  const handleLogin = () => {
    let obj = {
      email: email,
      senha: password
    }

    LoginService
      .login(obj)
      .then((response) => {
        if (response.status == 200) {
          console.log(response)
          sessionStorage.setItem('token', response.data.success.token)
          navigate('/home')
        }
      }).catch((e) => {
        console.log(e.response)
        dispatch({ type: 'update', data: { errorMsg: e.response.data.error.message } })
      })
  }

  const handleShowPassword = () => {
    dispatch({ type: 'update', data: { visiblityPassword: !visiblityPassword } })
  }

  return (
    <>
      <Grid container direction="row" className="container">
        <Grid
          container
          item
          xs={11}
          sm={8}
          md={6}
          lg={4}
          justifyContent="center"
          rowSpacing={3}
          className="card"
        >
          {
            errorMsg != '' &&
            <Typography style={{ color: 'red' }} variant="h6">{errorMsg}</Typography>
          }
          <Grid item xs={10} md={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                name="email"
                label="E-mail"
                variant="standard"
                type="email"
                fullWidth
                onChange={handleChange}
                value={email}
              />
            </Box>
          </Grid>
          <Grid item xs={10} md={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                name="password"
                label="Senha"
                type={visiblityPassword ? "text" : "password"}
                variant="standard"
                fullWidth
                onChange={handleChange}
                value={password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleShowPassword}
                      >
                        {visiblityPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={10} md={12}>
            <DefaultButton description="Logar" onClick={handleLogin} />
          </Grid>
          <Grid
            container
            direction="row"
            item
            xs={10}
            md={12}
            justifyContent="space-between"
          >
            <div onClick={() => navigate('/recover-password')}>
              <span span className="link">Esqueceu a Senha?</span>
            </div>
            <div item onClick={() => navigate('/register')}>
              <span className="link">Cadastre-se</span>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
