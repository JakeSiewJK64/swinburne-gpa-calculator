import { AppBar, Toolbar, Typography } from "@mui/material";
import Flex from "@react-css/flex";
import sun from '../../../assets/img/sun.svg';

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
                    <img src={sun} alt="sun" onClick={() => setTheme()} className="ms-auto" style={{ width: "30px", cursor: "pointer" }} />
                </Flex>
            </Toolbar>
        </AppBar >
    );
}

export default HeaderComponent;