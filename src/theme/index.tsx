import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#1CEF64",
            contrastText: "#fff"
        },
        secondary: {
            main: "#9DFF84",
            contrastText: "#fff"
        },
        error: {
            main: "#E61B41",
            contrastText: "#fff"
        },
        warning: {
            main: "#FFCE5D",
            contrastText: "#fff"
        },
        info: {
            main: "#8D8E8E",
            contrastText: "#fff"
        },
        success: {
            main: "#9DFF84",
            contrastText: "#fff"
        }
    },
    components:{
        MuiTableCell: {
            styleOverrides: {
                head: {
                    background: "transparent",
                    color: "#FFF",
                    fontWeight: 600,
                    fontSize: 16
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    borderRadius: "10px",
                    background: "#212238"
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                subheader: {
                    fontWeight: "500",
                    color:  "#DCDCDC"
                }
            }
        },
    },
    
});
export default function Theme({ children }: { children: React.ReactNode }){
    return(
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}