"use client";
import { ThemeProvider, createTheme, Theme } from "@mui/material";
import { ReactNode } from "react";

// Define the default color you want to use globally
const defaultTextColor = "rgba(69, 69, 69, 1)";

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "rgba(5, 60, 97, 1)", // Indigo
      light: "rgba(229, 234, 239, 1)",
      dark: "rgba(0, 20, 40, 1)",
    },
    secondary: {
      main: "rgba(255, 128, 0, 1)", // Yellowish Secondary
      light: "rgba(219, 128, 122, 1)", // light red
      dark: "rgba(88, 7, 13, 1)", // dark red
    },
    error: {
      main: "rgba(255, 77, 79, 1)", // red
      light: "rgba(219, 128, 122, 1)", // light red
      dark: "rgba(88, 7, 13, 1)", // dark red
    },
    warning: {
      main: "rgba(255, 152, 0, 1)", // orange
      light: "rgba(255, 201, 14, 1)", // light orange
      dark: "rgba(255, 109, 0, 1)", // dark orange
    },
    info: {
      main: "rgba(0, 120, 215, 1)", // blue
      light: "rgba(135, 206, 250, 1)", // light blue
      dark: "rgba(69, 69, 69, 1)", // dark brown
    },
    grey: {
      50: "rgba(250, 250, 250, 1)",
      100: "rgba(245, 245, 245, 1)",
      200: "rgba(240, 240, 240, 1)",
      300: "rgba(230, 230, 230, 1)",
      400: "rgba(220, 220, 220, 1)",
      500: "rgba(189, 189, 189, 1)",
      600: "rgba(158, 158, 158, 1)",
      700: "rgba(117, 117, 117, 1)",
      800: "rgba(97, 97, 97, 1)",
      900: "rgba(66, 66, 66, 1)",
    },
    success: {
      main: "rgba(0, 128, 0, 1)", // green
      light: "rgba(0, 255, 0, 1)", // light green
      dark: "rgba(0, 100, 0, 1)", // dark green
    },
    common: {
      white: "rgba(255, 255, 255, 1)",
      black: "rgba(0, 0, 0, 1)",
    },
  },
  typography: {
    fontFamily: "Noto Sans, Arial, sans-serif !important",
    // Set default text color
    allVariants: {
      color: defaultTextColor, // Set default color for all text variants
    },
    h1: {
      fontSize: "40px",
      fontWeight: 600,
    },
  },
  components: {
    // For Buttons
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            backgroundColor: "rgba(231, 231, 231, 1)",
            color: "rgba(180, 180, 180, 1)",
          },
          borderRadius: "10px",
          padding: "12px 14px",
        },

        // Customize the styles for the contained button
        contained: {
          backgroundColor: "rgba(5, 60, 97, 1)", // blue
          color: "rgba(255, 255, 255, 1)",
          // Add any other styles specific to the contained variant
        },
        // Customize the styles for the outlined button
        outlined: {
          borderColor: "rgba(5, 60, 97, 1)", // blue
          color: "rgba(5, 60, 97, 1)", // blue
          // Add any other styles specific to the outlined variant
        },
      },
    },

    // For Tabs Components
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTabs-indicator": {
            backgroundColor: "rgba(5, 60, 97, 1)",
            borderBottom: "3px solid rgba(5, 60, 97, 1)",
          },
          "& .MuiTab-root": {
            fontSize: "14px",
            fontWeight: "bold",
          },
          "& .MuiTab-textColorPrimary.Mui-selected": {
            color: "rgba(5, 60, 97, 1)",
          },
          display: "flex",
          justifyContent: "space-between",
        },
      },
    },

    // For Input Label
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: "14px",
          color: "rgba(69, 69, 69, 1) !important",
          "& .MuiInputLabel-asterisk": {
            color: "rgba(180, 24, 37, 1)",
          },
        },
      },
    },
    // For Radio Buttons
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "rgba(5, 60, 97, 1)", // Change the color of the radio button
          "&.Mui-checked": {
            color: "rgba(5, 60, 97, 1)", // Change the color of the radio button when checked
          },
        },
      },
    },

    // For Checkboxes
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "rgba(189, 189, 189, 1)", // Initial border color (gray)
          "&.Mui-checked": {
            color: "rgba(5, 60, 97, 1)", // Border color when checked (green)
          },
        },
      },
    },

    // Tooltip
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.7)", // Background color of the tooltip
          color: "rgba(255, 255, 255, 1)", // Text color of the tooltip
        },
        arrow: {
          color: "rgba(255, 255, 255, 1)", // Color of the arrow
        },
      },
    },

    // For Tables
    MuiTableHead: {
      styleOverrides: {
        root: {
          color: "rgba(69, 69, 69, 1)",
          textAlign: "center",
          background: "rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
        },
      },
    },
    // For Th (Cells available in Head)
    MuiTableCell: {
      styleOverrides: {
        head: {
          textAlign: "center",
          color: "rgba(69, 69, 69, 1)", // Example: Change the color of the text to white
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          textAlign: "center",
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: "rgba(5, 60, 97, 1)", // Set background color
          color: "rgba(255, 255, 255, 1)", // Set text color
        },
      },
    },

    MuiSelect: {
      defaultProps: {
        MenuProps: {
          PaperProps: {
            style: {
              maxHeight: 150,
              overflowY: "auto",
              borderRadius: 6,
              marginTop: 5,
              color: "rgb(55, 65, 81)",
              boxShadow:
                "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            },
          },
        },

        sx: {
          borderRadius: "10px",
          backgroundColor: "rgba(255, 255, 255, 1)",
          color: "rgba(69, 69, 69, 1)",
          fontWeight: "600",
          fontSize: "12px",
          "&:focus": {
            outline: "none",
          },
          padding: "2px",
          // "&.Mui-error": {
          //   outlineWidth: "1px",
          //   outlineStyle: "solid",
          //   outlineColor: "error.main",
          // },
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        slotProps: {
          paper: {
            sx: {
              maxHeight: 150,
              overflowY: "auto",
              borderRadius: 2,
              marginTop: 1,
              color: "rgb(55, 65, 81)",
              boxShadow:
                "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              "& .MuiMenu-list": {
                padding: "4px 0",
              },
            },
          },
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        slotProps: {
          paper: {
            sx: {
              boxShadow: "0px 0px 1px  rgba(0, 0, 0, 0.05)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
            },
          },
        },
      },
    },

    MuiIcon: {
      styleOverrides: {
        root: {
          color: defaultTextColor, // Set default color for all icons
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px !important",
            boxShadow: "0px 0px 1spx 0px rgba(0, 0, 0, 0.3)",
          },

          "& .MuiInputBase-input": {
            borderRadius: "10px !important",
            color: "rgba(69, 69, 69, 1) !important",
            fontWeight: "600 !important",
            fontSize: "15px !important",
          },
          "& .Mui-disabled": {
            backgroundColor: "rgba(242, 243, 243, 1) !important",
            color: "rgba(120, 123, 134, 1) !important",
          },

          "& .MuiFormHelperText-root": {
            color: "rgba(255, 77, 79, 1) !important",
            fontSize: "10px !important",
            fontWeight: "600 !important",
          },
          //error input border width
          "& .Mui-error .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px !important",
          },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "10px",
          fontWeight: "600",
          marginLeft: "5px",
        },
      },
    },
  },
});

interface ThemeContextProps {
  children: ReactNode;
}

const ThemeContext = ({ children }: ThemeContextProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeContext;
