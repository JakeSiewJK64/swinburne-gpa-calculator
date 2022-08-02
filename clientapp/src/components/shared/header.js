import { AppBar, Toolbar, Typography } from "@mui/material";

const HeaderComponent = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    MUI
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default HeaderComponent;