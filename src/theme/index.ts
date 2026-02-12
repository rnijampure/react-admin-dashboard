import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

/* -------------------------------------------------------------------------- */
/*                              Palette Extension                             */
/* -------------------------------------------------------------------------- */
declare module "@mui/material/styles" {
  interface Palette {
    brand: {
      main: string;
      soft: string;
      success?: string;
      info?: string;
      warning?: string;
      error?: string;
    };
  }

  interface PaletteOptions {
    brand?: {
      main?: string;
      soft?: string;
      success?: string;
      info?: string;
      warning?: string;
      error?: string;
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                                 Light Theme                                */
/* -------------------------------------------------------------------------- */
export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",

    /* Brand (accent only) */
    brand: {
      main: "#ff7070",
      soft: "#ffe5e5",
      success: "#10b981",
      info: "#3b82f6",
      warning: "#f59e0b",
      error: "#ef4444",
    },

    /* Neutral primary (not blue!) */
    primary: {
      main: "#1f2937", // slate-800
    },

    background: {
      default: "rgb(229 231 235)", // light gray canvas
      paper: "#ffffff",
    },

    text: {
      primary: "#111827", // slate-900
      secondary: "#6b7280", // slate-500
    },

    divider: "#e5e7eb",
  },

  typography: {
    fontFamily: `"Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif`,

    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },

    button: {
      textTransform: "none",
      fontWeight: 500,
      letterSpacing: "0.08em",
      border: "none",
      outline: "none",
      ":focus-visible": {
        outline: "none",
      },
      ":focus": {
        outline: "none",
      },
    },
  },

  shape: {
    borderRadius: 10,
  },

  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.08)",
    "0 4px 12px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.08)",
  ] as const,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: "0.85rem",
          fontWeight: 500,
          color: theme.palette.text.secondary,
          marginBottom: theme.spacing(0.5),

          "&.Mui-focused": {
            color: theme.palette.brand.main,
          },
        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          borderRadius: 8,
          backgroundColor: theme.palette.background.paper,

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.divider,
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.secondary,
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.brand.main,
            borderWidth: 2,
          },
        }),
        input: {
          padding: "12px 14px",
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }: any) => ({
          marginLeft: 0,
          fontSize: "0.75rem",
          color: theme.palette.text.secondary,
        }),
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

/* -------------------------------------------------------------------------- */
/*                                 Dark Theme                                 */
/* -------------------------------------------------------------------------- */
export const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",

    brand: {
      main: "#ff7070",
      soft: "#402020",
      success: "#10b981",
      info: "#3b82f6",
      warning: "#f59e0b",
      error: "#ef4444",
    },

    primary: {
      main: "#e5e7eb",
    },

    background: {
      default: "#2f384d", // slate-900
      paper: "#111827", // slate-800
    },

    text: {
      primary: "#f9fafb",
      secondary: "#9ca3af",
    },

    divider: "#1f2937",
  },

  typography: {
    fontFamily: `"Inter", system-ui, sans-serif`,
  },

  shape: {
    borderRadius: 10,
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: "0.85rem",
          fontWeight: 500,
          color: theme.palette.text.secondary,
          marginBottom: theme.spacing(0.5),

          "&.Mui-focused": {
            color: theme.palette.brand.main,
          },
        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          backgroundColor: theme.palette.background.paper,

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.divider,
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.secondary,
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.brand.main,
            borderWidth: 2,
          },
        }),
        input: {
          padding: "12px 14px",
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => ({
          marginLeft: 0,
          fontSize: "0.75rem",
          color: theme.palette.text.secondary,
        }),
      },
    },
  },
});
