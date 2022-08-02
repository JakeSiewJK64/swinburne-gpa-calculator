import { AppBar, Toolbar, Typography } from "@mui/material";
import './Header.css';

const HeaderComponent = () => {
    return (
        <AppBar position="static" style={{ "background": "rgba(255,255,255,0.7)" }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    className="text-black"
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    Unofficial Swinburne GPA Calculator
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default HeaderComponent;