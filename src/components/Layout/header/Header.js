import React, { useReducer } from 'react'
import { AppBar, Avatar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import { IconButton } from '@mui/material';
import { Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';

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
    const [state, dispatch] = useReducer(reducer, initialState);
    const { open, openInfoUser } = state

    const handleOpenMenu = () => {
        dispatch({ type: 'update', data: { open: !open } })
    }
    const handleOpenInfoUser = () => {
        dispatch({ type: 'update', data: { openInfoUser: !openInfoUser } })
    }


    let itemMenu = [
        { id: 1, text: 'Menu1' },
        { id: 2, text: 'Menu2' },
        { id: 3, text: 'Menu3' },
        { id: 4, text: 'Menu4' },
        { id: 5, text: 'Menu5' },
        { id: 6, text: 'Menu6' },
        { id: 7, text: 'Menu7' },
    ]

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
                                        <b>Sair</b>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                {props.children}
            </Grid>

            <Drawer
                open={open}
                onClose={handleOpenMenu}
            >
                <Box sx={{ marginTop: 1 }}>
                    <Typography variant='h6' textAlign="center">
                        {"Menu"}
                    </Typography>
                    <hr />
                </Box>
                <Box sx={{ width: 200 }}>
                    <List>
                        {itemMenu.map((item) => {
                            return (
                                <ListItem key={item.id} disablePadding>
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