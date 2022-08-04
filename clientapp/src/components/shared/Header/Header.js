import { AppBar, Toolbar, Typography, Select, MenuItem } from "@mui/material";
import Flex from "@react-css/flex";
import { useState } from "react";
import i18n from "../../../utils/i18n";
import sun from '../../../assets/img/sun.svg';
import japan from '../../../assets/img/country_flags/japan.png';
import uk from '../../../assets/img/country_flags/uk.png';
import china from '../../../assets/img/country_flags/china.png';

const HeaderComponent = ({ setTheme }) => {


    const lang = localStorage.getItem("lang");
    const [language, setLanguage] = useState(lang ? lang : 'en')

    const languages = [
        { language: "English", value: "en", img: uk },
        { language: "日本語", value: "jp", img: japan },
        { language: "中文", value: "cn", img: china },
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
                            style={{"maxHeight": "50px"}}
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
                                            <img src={language.img} style={{ width: "30px" }} alt="country_flag" />&nbsp;
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