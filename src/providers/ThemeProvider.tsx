import { ThemeProvider as Theme } from "@mui/material/styles";
import { light as lightTheme } from "../themes/light";
import { dark as darkTheme } from "../themes/dark";
import useColorMode from "../hooks/useColorMode";

const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  const mode = useColorMode();

  return <Theme theme={lightTheme}>{children}</Theme>;
};

export default ThemeProvider;
