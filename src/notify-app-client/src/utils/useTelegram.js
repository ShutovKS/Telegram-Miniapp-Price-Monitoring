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

    return {
        close: onClose,
        toggleButton: onToggleButton,
        tg,
        user: tg.initDataUnsafe?.user
    }
}

export default useTelegram;