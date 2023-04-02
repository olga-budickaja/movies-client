import { reactive } from "vue";

const bodyElement: HTMLElement | null = document.querySelector('body');

interface ThemeState {
    theme: string;
}

const themeState: ThemeState = reactive({
    theme: localStorage.getItem("theme") || "light-theme",
});

const darkTheme: () => void = () => {
    themeState.theme = "dark-theme";
    localStorage.removeItem("light-theme");
    localStorage.setItem("theme", "dark-theme");
};

const lightTheme: () => void = () => {
    themeState.theme = "light-theme";
    localStorage.removeItem("theme");
    localStorage.setItem("light-theme", "light-theme");
};

export const toggleTheme: () => void = () => {
    if (themeState.theme === 'dark-theme') {
        lightTheme();
        bodyElement?.classList.remove('dark-theme');
    } else {
        darkTheme();
        bodyElement?.classList.add('dark-theme');
    }
}

export const currentTheme: () => void = () => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme: string | null = localStorage.getItem("theme");
    const lightTheme: string | null = localStorage.getItem("light-theme");

    theme && bodyElement?.classList.add('dark-theme');

    if (isDarkMode) {
        lightTheme ? bodyElement?.classList.remove('dark-theme') : bodyElement?.classList.add('dark-theme')
    }
}