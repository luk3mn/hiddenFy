import { darkColors, lightColors } from "../constants/colors";
import { useTheme } from "../contexts/ThemeContext"

export const useThemeColors = () => {
  const { isDarkMode } = useTheme();
  return isDarkMode ? darkColors : lightColors;
}