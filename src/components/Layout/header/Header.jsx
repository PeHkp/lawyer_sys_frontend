import React, { useReducer, useEffect } from 'react'
import { AppBar, Avatar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import { IconButton } from '@mui/material';
import { Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';

const initialState = {
    open: false,
    openInfoUser: false
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

export default function Header(props) {

    let navigate = useNavigate();

    const [state, dispatch] = useReducer(reducer, initialState);
    const { open } = state

    const handleOpenMenu = () => {
        dispatch({ type: 'update', data: { open: !open } })
    }

    let itemMenu = [
         { id: 1, text: 'Advogado', route: '/lawyer' },
        { id: 2, text: 'Cliente', route: '/customer' },
        //{ id: 3, text: 'Estagiário', route: '/trainner' },
        //{ id: 4, text: 'Livro', route: '/book' },
        { id: 5, text: 'Ação', route: '/action' },
        //{ id: 5, text: 'Emprestimo', route: '/loan' },
    ]

    useEffect(() => {
        let token = sessionStorage.getItem("token")
        if (!token) {
            navigate('/login')
        }
    }, [])

    return (
        <>
            <Grid container item xs={12}>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container
                            item xs={12}
                        >
                            <Grid item xs={8}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    onClick={handleOpenMenu}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                            <Grid container justifyContent="flex-end" alignItems="center" item xs={4} spacing={2}>
                                <Grid item xs={4} sm={2} md={2} lg={1}>
                                    <Avatar>U</Avatar>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Grid>
                                        Perfil
                                    </Grid>
                                    <Grid>
                                        <b onClick={() => navigate('/login')}>Sair</b>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                {props.children}
            </Grid >

            <Drawer
                open={open}
                onClose={handleOpenMenu}
            >

                <Box sx={{ width: 300 }}>
                    <Box sx={{ marginTop: 1 }}>
                        <Typography variant='h6' textAlign="center">
                            {"Menu"}
                        </Typography>
                        <hr />
                    </Box>
                    <List>
                        {itemMenu.map((item) => {
                            return (
                                <ListItem key={item.id} disablePadding onClick={() => {
                                    navigate(item.route)
                                    handleOpenMenu()
                                }}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <EmailIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}
