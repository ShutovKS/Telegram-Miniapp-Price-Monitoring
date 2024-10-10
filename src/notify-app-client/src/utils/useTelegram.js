let tg = window.Telegram.WebApp;

export function useTelegram() {
    const onClose = () => {
        tg.close();
    }

    const onToggleButton = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    const user = tg.initDataUnsafe?.user;
    const userId = user?.id || process.env.REACT_APP_TELEGRAM_USER_ID;

    return {
        close: onClose,
        toggleButton: onToggleButton,
        tg : tg || {},
        user: user || {},
        userId: userId || 0
    }
}

export default useTelegram;