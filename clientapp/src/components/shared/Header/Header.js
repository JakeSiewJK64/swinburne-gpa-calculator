import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Flex from "@react-css/flex";

const HeaderComponent = ({ setTheme }) => {
    return (
        <AppBar position="fixed" style={{ "background": "rgba(255,255,255,0.7)", "backdropFilter": "blur(20px)", "maxHeight": "100px" }}>
            <Toolbar>
                <Flex flexDirection="row" className="w-100">
                    <Typography
                        variant="h6"
                        noWrap
                        className="text-black"
                        component="div"
                    >
                        Unofficial Swinburne GPA Calculator
                    </Typography>
                    <Button onClick={() => setTheme()} className="ms-auto">Darkmode</Button>
                </Flex>
            </Toolbar>
        </AppBar>
    );
}

export default HeaderComponent;