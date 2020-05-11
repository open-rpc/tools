import i18n from "i18next";
import "moment/locale/ko";
import "moment/locale/zh-cn";
import "moment/locale/en-ca";
interface IMap {
    [key: string]: string;
}
export declare const reverseSupportedLanguages: IMap;
export declare const supportedLanguages: IMap;
export declare const changeLanguage: (l: string) => Promise<i18n.TFunction>;
export {};
