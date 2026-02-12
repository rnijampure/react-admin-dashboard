// Navbar.tsx
import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  Container,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ToggleTheme } from "../../../theme/ToggleTheme";
import logo from "../../../assets/images/logo.png";
//"../../assets/images/logo.png";
import { NavLink } from "react-router";

const pages = [
  "Home",
  "Products",
  "Orders",
  "Customers",
  "Reports",
  "Settings",
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar() {
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        borderBottom: `1px solid ${theme.palette.brand.soft}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box display="flex" alignItems="center">
            <img src={logo} alt="Logo" width={160} />
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 6 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: theme.palette.brand.main,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <NavLink
                  to={`/${page.toLocaleLowerCase()}`}
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-black"
                  }
                >
                  {page}
                </NavLink>
              </Button>
            ))}
          </Box>

          {/* Right-side: user avatar + theme toggle */}
          <Box display="flex" alignItems="center" gap={2}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              sx={{ mt: "45px" }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: theme.palette.brand.main,
                    }}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>

            {/* Theme toggle */}
            <ToggleTheme />
          </Box>

          {/* Mobile menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
