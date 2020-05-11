"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var i18next_1 = __importDefault(require("i18next"));
var react_i18next_1 = require("react-i18next");
var i18next_browser_languagedetector_1 = __importDefault(require("i18next-browser-languagedetector"));
var en_1 = __importDefault(require("./translations/en"));
var kr_1 = __importDefault(require("./translations/kr"));
var cn_1 = __importDefault(require("./translations/cn"));
var moment_1 = __importDefault(require("moment"));
require("moment/locale/ko");
require("moment/locale/zh-cn");
require("moment/locale/en-ca");
var i18next_2 = __importDefault(require("i18next"));
var momentMap = {
    "kr": "ko",
    "cn": "zh-cn",
    "en-US": "en-ca",
};
i18next_1.default
    .use(i18next_browser_languagedetector_1.default)
    .use(react_i18next_1.initReactI18next)
    .init({
    resources: {
        en: { translation: en_1.default },
        kr: { translation: kr_1.default },
        cn: { translation: cn_1.default },
    },
    interpolation: {
        escapeValue: false,
        format: function (value, format, lng) {
            if (!lng) {
                return;
            }
            var ln = momentMap[lng];
            switch (format) {
                case "date":
                    return moment_1.default(value).locale(ln || "en").format("MMMM Do YYYY, h:mm:ss a");
                default:
                    break;
            }
        },
    },
});
exports.reverseSupportedLanguages = {
    "EN": "en-US",
    "中文": "cn",
    "한국어": "kr",
};
exports.supportedLanguages = {
    "en-US": "EN",
    "cn": "中文",
    "kr": "한국어",
};
exports.changeLanguage = function (l) {
    return i18next_2.default.changeLanguage(l);
};
