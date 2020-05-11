"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core"); //tslint:disable-line
var use_dark_mode_1 = __importDefault(require("use-dark-mode"));
var Brightness3_1 = __importDefault(require("@material-ui/icons/Brightness3"));
var WbSunny_1 = __importDefault(require("@material-ui/icons/WbSunny"));
var theme_1 = require("../themes/theme");
var react_i18next_1 = require("react-i18next");
var LanguageMenu_1 = __importDefault(require("./LanguageMenu"));
require("./MyApp.css");
var Introspector_1 = __importDefault(require("../components/Introspector"));
var MyApp = function () {
    var darkMode = use_dark_mode_1.default();
    var t = react_i18next_1.useTranslation().t;
    var theme = darkMode.value ? theme_1.darkTheme : theme_1.lightTheme;
    var logs = [{
            timestamp: new Date(),
            payload: {
                jsonrpc: "2.0",
                method: "foo"
            }
        }];
    return (react_1.default.createElement(core_1.MuiThemeProvider, { theme: theme },
        react_1.default.createElement(core_1.AppBar, { position: "sticky", color: "default", elevation: 0 },
            react_1.default.createElement(core_1.Toolbar, null,
                react_1.default.createElement(core_1.Grid, { container: true, alignContent: "center", alignItems: "center", justify: "space-between" },
                    react_1.default.createElement(core_1.Typography, { variant: "h6" }, t("Pristine")),
                    react_1.default.createElement(core_1.Typography, { variant: "caption" }, "typescript-react-material-ui"),
                    react_1.default.createElement(core_1.Grid, { item: true },
                        react_1.default.createElement(LanguageMenu_1.default, null),
                        react_1.default.createElement(core_1.Tooltip, { title: t("Toggle Dark Mode") },
                            react_1.default.createElement(core_1.IconButton, { onClick: darkMode.toggle }, darkMode.value ? react_1.default.createElement(Brightness3_1.default, null) : react_1.default.createElement(WbSunny_1.default, null))))))),
        react_1.default.createElement("div", null,
            react_1.default.createElement(core_1.CssBaseline, null),
            react_1.default.createElement(core_1.Grid, { container: true, alignContent: "center", alignItems: "center", justify: "center", direction: "column" },
                react_1.default.createElement(Introspector_1.default, { logs: logs }),
                react_1.default.createElement(core_1.Typography, { variant: "caption", style: { position: "absolute", bottom: "10px" } }, t("Date", { date: new Date() }))))));
};
exports.default = MyApp;
