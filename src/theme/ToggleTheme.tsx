import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeMode } from "./ThemeContext";

export function ToggleTheme() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Tooltip title="Toggle theme">
      <IconButton onClick={toggleMode} size="small">
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
