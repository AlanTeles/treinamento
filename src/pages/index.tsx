import { Box, Toolbar, AppBar } from "@mui/material";
import Navbar from "./../components/Navbar";

export default function Adm({ children }: {children: React.ReactNode}) {
    return (
        <Box>
            <Navbar />
            <Box 
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    height: `calc(100vh - (24px * 2))`,
                    overflorY: "auto"
                }}
            >
                <Toolbar />    
                {children}
                
                <Toolbar />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" color="transparent" className="bg-dark" sx={{ top: 'auto', bottom: 0 }}>
                    <Toolbar className="shadow-top w-100">
                        <small className="color-medium mx-auto">BlueShift Brasil | Todos os direitos reservados | 2022 © | v.1.1.10</small>
                    </Toolbar>
                </AppBar>
            </Box>
        </Box>
    );
}