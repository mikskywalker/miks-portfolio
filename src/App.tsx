import React, { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import {
  Box,
  Fab,
  Fade,
  Grid,
  Grow,
  ThemeProvider,
  createTheme,
  useScrollTrigger,
} from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoPage from "./pages/NoPage";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import { grey, deepPurple } from "@mui/material/colors";
import Footer from "./components/Footer";

// icons
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";


// need for overiding mui components on ts
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dashed: true;
    btnLink: true;
  }
}

// const customColorTeal = "#0BD99E";
 const customWhiteText = '#D4D4C8'

export const themes = createTheme({
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: 'inherit'
      },
      variants: [
        {
          props: {
            variant: "btnLink", // custom button variant
          },
          style: {
            textTransform: "none",
            padding: 0,
            margin: 0,
            disableRipple: true,
            "&:hover": { background: "transparent" },
            "&:after": {
              content: '""',
              display: "block",
              position: "absolute",
              bottom: "-2px",
              left: 0,
              width: "0%",
              height: "2px",
              // background: customColorTeal, // the teal color
              background: deepPurple[500], // the primary
              transition: "width .3s",
            },
            "&:hover:after": {
              width: "100%",
            },
          },
        },
      ],
    },
    MuiTypography: {
      defaultProps: {
        variant: 'body1', // Set the default variant for Typography
        lineHeight: 2, // Adjust line height
        color: customWhiteText
        // Add more default styles as needed
      },
    }
  },
  palette: {
    primary: {
      light: deepPurple[300],
      main: deepPurple[500],
      dark: deepPurple[900],
      contrastText: '#fff',
    },
    secondary: {
      // main: '#262626',
      light: grey.A400,
      main: grey[400],
      dark: grey[800],
      contrastText: customWhiteText,
    }
  },
});

/**
 *
 * Back to Top Button logic
 *
 *  */
interface Props {
  children?: React.ReactElement;
}

function ScrollTop(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 300,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 30, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function App(props: Props) {
  const [fabHover, setFabHover] = useState<boolean>(false);

  /** for the scroll to top Fab btn changing color logic */
  const [toTopBtnColor, setToTopBtnColor] = useState<"black" | "white">(
    "black"
  );

  const handleScroll = () => {
    if (window.scrollY >= 0) {
      setToTopBtnColor("white");
    }
    // if (window.scrollY >= 710) {
    //   setToTopBtnColor("white");
    // }
    // if (window.scrollY >= 1720) {
    //   setToTopBtnColor("black");
    // }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <ThemeProvider theme={themes}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "#111010",
        }}
      >
        {/* This grid is an anchor for the back-to-top button */}
        <Grid id="back-to-top-anchor" />
        <Box sx={{ flexGrow: 1 }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Nav />}>
                <Route index element={<HomePage />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Box>
        <ScrollTop {...props}>
          <Fab
            aria-label="scroll back to top"
            disableRipple
            sx={{
              width: "5rem",
              height: "5rem",
              fontSize: "4rem",
              background: "transparent",
              boxShadow: "none",
              "&:hover": { background: "none" },
            }}
            onMouseOver={() => setFabHover(true)}
            onMouseOut={() => setFabHover(false)}
          >
            {fabHover ? (
              <Grow in={fabHover}>
                <KeyboardDoubleArrowUpOutlinedIcon
                  fontSize="inherit"
                  sx={{ color: toTopBtnColor }}
                />
              </Grow>
            ) : (
              <KeyboardArrowUpOutlinedIcon
                fontSize="inherit"
                sx={{ color: toTopBtnColor }}
              />
            )}
          </Fab>
        </ScrollTop>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
