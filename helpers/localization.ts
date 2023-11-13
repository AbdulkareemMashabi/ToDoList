import {I18n} from 'i18n-js';
export class Locale {
  public static i18n: any;
  public static isRTL: boolean = false;
  public static language = Locale?.i18n?.locale;
  public static config = (translations: Object) => {
    Locale.i18n = new I18n(translations);
    Locale.i18n.enableFallback = true;
  };
  public static t = (key: string, props?: Object | string) => {
    return Locale?.i18n?.t(key, props);
  };
  public static setLanguage = (lang: string) => {
    Locale.i18n.locale = lang;
    Locale.isRTL = 'ar' === lang;
    Locale.language = lang;
  };
}
export default Locale;
