import { Link } from "react-router-dom";
import { Box, AppBar, Toolbar, Stack } from "@mui/material";


import LeafSVG from "./../../assets/img/leaf.svg";
import LogoPNG from "./../../assets/img/logo-white.png";
export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="transparent" className="bg-dark">
                <Toolbar className="shadow-bottom w-100">
                    <Stack className="mx-auto" direction="row" justifyItems="center" spacing={2}>
                        <Link to="/" className="a-not-effect">
                            <img src={LogoPNG} alt="" width={150} />
                        </Link>
                        <Link to="/" className="a-not-effect">
                            <div className="d-flex">
                                <img src={LeafSVG} alt="" />
                                <h2 className="my-auto ml-3 color-primary">NutriTech</h2>
                            </div>
                        </Link>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}