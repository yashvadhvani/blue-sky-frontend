import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Logo from "../assests/Logo.svg";

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ background: "white" }}>
        <Box sx={{ height: "50px", width: "200px" }}>
          <Logo />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
