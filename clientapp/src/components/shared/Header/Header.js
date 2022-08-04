import { AppBar, Toolbar, Typography, Select, MenuItem } from "@mui/material";
import Flex from "@react-css/flex";
import { useState } from "react";
import sun from '../../../assets/img/sun.svg';
import i18n from "../../../utils/i18n";

const HeaderComponent = ({ setTheme }) => {


    const lang = localStorage.getItem("lang");
    const [language, setLanguage] = useState(lang ? lang : 'en')

    const languages = [
        { language: "english", value: "en" },
        { language: "日本語", value: "jp" },
    ]

    const swapLanguage = (value) => {
        localStorage.setItem("lang", value);
        setLanguage(value);
        i18n.changeLanguage(value);
    }

    return (
        <AppBar position="sticky" style={{ "background": "rgba(255,255,255,0.7)", "backdropFilter": "blur(20px)", "maxHeight": "100px" }}>
            <Toolbar>
                <Flex flexDirection="row" className="w-100">
                    <Typography
                        variant="h6"
                        noWrap
                        className="text-black"
                        component="div"
                    >
                        Unofficial Swinburne GPA Calculator
                        <sup className="rounded bg-primary text-white p-1 m-1">
                            beta
                        </sup>
                    </Typography>
                    <Flex flexDirection="row" gap={10} className="ms-auto">
                        <Select
                            required
                            label="Format"
                            labelId="format"
                            value={language}
                            onChange={(x) => { swapLanguage(x.target.value) }}
                            name="format"
                        >
                            {
                                languages.map(language => {
                                    return (
                                        <MenuItem key={language.value} value={language.value}>
                                            {language.language}
                                        </MenuItem>
                                    )
                                })
                            }

                        </Select>
                        <img src={sun} alt="sun" onClick={() => setTheme()} className="ms-auto" style={{ width: "30px", cursor: "pointer" }} />
                    </Flex>
                </Flex>
            </Toolbar>
        </AppBar >
    );
}

export default HeaderComponent;