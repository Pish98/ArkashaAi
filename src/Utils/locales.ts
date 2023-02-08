import {DEFAULT_LOCALE, LOCALES_PATH} from "../config";
import * as fs from "fs";
import * as Path from "path";
import {ILocale, LocalizedTextField} from "../basic_types";

const fileNames = fs.readdirSync(LOCALES_PATH);
export const locales: ILocale = {};

fileNames.forEach(locale => {
    locales[locale] = {};

    const text = fs.readFileSync(Path.resolve(LOCALES_PATH, locale), "utf8");

    for (let line of text.split("\n")) {
        const trimmedLine = line.trim();
        const spaceIndex = trimmedLine.indexOf(" ");

        if (spaceIndex === -1) continue;

        const key = trimmedLine.slice(0, spaceIndex);
        const value = trimmedLine.slice(spaceIndex + 1);

        locales[locale][key] = value.trim();
    }
});

export const getLocale = (target: LocalizedTextField, locale: string = DEFAULT_LOCALE) => {
    if (typeof target === "string") {
        return locales[locale][target] || target;
    }

    return target(locale);
};

export const wrapLocale = (key: string) => {
    return (locale: string) => {
        return getLocale(key, locale);
    }
};

// export const unwrapLocale = (func: LocalizedTextField, locale: string): string => {
//     if (typeof func === "string")
//         return func;
//
//     return func(locale);
// };

// export const getLocale = () => {
//
// };