import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const DarkModeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            className="mq-icon-btn"
            onClick={toggleTheme}
            title="Toggle theme"
            style={{ width: 42, height: 42, flex: "0 0 42px", borderRadius: 12 }}
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
};

export default DarkModeToggle;
