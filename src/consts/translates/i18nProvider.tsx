import polyglotI18nProvider from 'ra-i18n-polyglot';
import { spanishMedicalMessages } from "./spanishTranslations";

export const i18nProvider = polyglotI18nProvider(
    locale => spanishMedicalMessages, 'es'
)