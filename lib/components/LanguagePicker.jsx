import React from "react";

import { DropdownList } from "lib/components/DropdownList";

// TODO: Switch this back to being dynamically generated based on locize
export function LanguagePicker(props) {
  const langs = {
    en: {
      name: "English",
      nativeName: "English",
    },
    es: {
      name: "Spanish",
      nativeName: "Español",
    },
    de: {
      name: "German",
      nativeName: "Deutsch",
    },
    fr: {
      name: "French",
      nativeName: "Français",
    },
    it: {
      name: "Italian",
      nativeName: "Italiana",
    },
    ko: {
      name: "Korean",
      nativeName: "한국어 (韓國語)",
    },
    pt: {
      name: "Portuguese",
      nativeName: "Português",
    },
    tr: {
      name: "Turkish",
      nativeName: "Türkçe",
    },
    zh: {
      name: "Zhōngwén",
      nativeName: "中文",
    },
  };

  const { currentLang, changeLang } = props;

  const onValueSet = (newLang) => {
    setCurrentLang(newLang);
    changeLang(newLang);
  };

  const formatValue = (key) => {
    const lang = langs[key];

    return (
      <>
        {key.toUpperCase()} -{" "}
        <span className="capitalize">{lang.nativeName.split(",")[0]}</span> (
        {lang.name.split(";")[0]})
      </>
    );
  };

  return (
    <DropdownList
      id="language-picker-dropdown"
      className="ml-2 xs:ml-4 mr-1 text-xxs sm:text-sm"
      label={currentLang?.toUpperCase()}
      formatValue={formatValue}
      onValueSet={onValueSet}
      current={currentLang}
      values={langs}
    />
  );
}
