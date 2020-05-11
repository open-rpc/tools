"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var react_i18next_1 = require("react-i18next");
var i18n_1 = require("../../i18n");
var LanguageMenu = function (props) {
    var _a = react_i18next_1.useTranslation(), t = _a.t, i18n = _a.i18n;
    var _b = React.useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleMenuItemClick = function (lang) {
        setAnchorEl(null);
        // this forces language change for react + i18n react
        i18n.changeLanguage(i18n_1.reverseSupportedLanguages[lang]);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.Tooltip, { title: t("Change Language") },
            React.createElement(core_1.Button, { onClick: handleClick }, i18n_1.supportedLanguages[i18n.language])),
        React.createElement(core_1.Menu, { id: "simple-menu", anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: handleClose }, Object.values(i18n_1.supportedLanguages).map(function (lang, i) { return (React.createElement(core_1.MenuItem, { onClick: function (event) { return handleMenuItemClick(lang); } }, lang)); }))));
};
exports.default = LanguageMenu;
