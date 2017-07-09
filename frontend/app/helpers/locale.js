import ru from 'react-intl/locale-data/ru'
import en from 'react-intl/locale-data/en'

export const localeDataHash = {
    en,
    ru,
}

export const DEFAULT_LANGUAGE = 'en'

export const getCurrentLanguage = () => {
    const navigatorLanguages = [window.navigator.language, ...(window.navigator.languages || [])]
    const supportedLanguages = Object.keys(localeDataHash)
    const languageCode = navigatorLanguages.find((language) => {
        return (supportedLanguages.indexOf(language) !== -1)
    })
    return (languageCode || DEFAULT_LANGUAGE)
}

export const accidentMessages = {
    en: {
        'server.state.connecting': 'Connecting',
        'server.state.connected': 'Connected',
        'server.state.disconnected': 'Disconnected',
        'server.state.connection_error': 'Connection error',
    },
    ru: {
        'server.state.connecting': 'Устанавливается соединение',
        'server.state.connected': 'Соединение установленно!',
        'server.state.disconnected': 'Нет соединения',
        'server.state.connection_error': 'Ошибка соединения',
    },
}
