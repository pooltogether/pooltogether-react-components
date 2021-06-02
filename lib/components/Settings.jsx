import React, { useState } from "react";
import classnames from "classnames";
import FeatherIcon from "feather-icons-react";
import VisuallyHidden from "@reach/visually-hidden";
import { motion } from "framer-motion";
import {
  useReducedMotion,
  APP_ENVIRONMENT,
  useAppEnv,
} from "@pooltogether/hooks";
import { useTranslation } from "react-i18next";

import { CheckboxInputGroup } from "lib/components/CheckboxInputGroup";
import { ThemeSwitcher } from "lib/components/ThemeSwitcher";

/**
 * TODO: Make settings extendible for all apps
 * @param {*} props
 * @returns
 */
export function Settings(props) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const toggleOpen = (e) => {
    e.preventDefault();

    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleOpen}
        className={classnames(
          "w-5 h-5 sm:w-6 sm:h-6 ml-2 my-1 hover:text-inverse",
          {
            "text-highlight-2": !isOpen,
            "text-highlight-1": isOpen,
          }
        )}
      >
        <FeatherIcon
          icon="settings"
          className="w-full h-full"
          strokeWidth="0.09rem"
        />
      </button>

      <motion.div
        key="settings-overlay"
        onClick={toggleOpen}
        className={classnames(
          "fixed t-0 l-0 r-0 b-0 w-full h-full z-30 bg-overlay bg-blur",
          {
            "pointer-events-none": !isOpen,
            "border-t-4": isOpen,
          }
        )}
        style={{
          borderColor: "black",
          top: 104,
        }}
        animate={isOpen ? "enter" : "exit"}
        initial="initial"
        transition={{ duration: shouldReduceMotion ? 0 : 0.1 }}
        variants={{
          exit: { opacity: 0 },
          enter: { opacity: 1 },
          initial: { opacity: 0 },
        }}
      />

      <motion.div
        className="bg-highlight-3 border-l-4 h-full fixed t-0 b-0 z-40 px-8 pr-16 py-8 shadow-md"
        style={{
          borderColor: "black",
          height: "100vh",
          right: -30,
          top: "108px",
          width: "320px",
        }}
        animate={isOpen ? "enter" : "exit"}
        initial="initial"
        variants={{
          exit: {
            x: "320px",
            opacity: 0,
            transition: {
              duration: shouldReduceMotion ? 0 : 0.2,
              staggerChildren: shouldReduceMotion ? 0 : 0.1,
            },
          },
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: shouldReduceMotion ? 0 : 0.1,
              staggerChildren: shouldReduceMotion ? 0 : 0.1,
            },
          },
          initial: {
            x: 0,
            opacity: 0,
            transition: {
              duration: shouldReduceMotion ? 0 : 0.1,
            },
          },
        }}
      >
        <button
          onClick={toggleOpen}
          className="absolute close-button text-highlight-2 hover:text-green trans outline-none focus:outline-none active:outline-none"
          style={{
            right: 50,
            top: 34,
          }}
        >
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>
            <FeatherIcon icon="x-circle" className="w-6 h-6" />
          </span>
        </button>

        <h6 className="text-white mt-4 mb-16 capitalize">{t("settings")}</h6>

        {/* <div className="mt-4">
          <label className="uppercase text-accent-1 font-bold text-xxs mb-4">
            {t("theme")}
          </label>
          <ThemeSwitcher />
        </div> */}

        <div className="mt-10">
          <label className="uppercase text-accent-1 font-bold text-xxs mb-4 mr-2">
            {t("developmentMode")}
          </label>
          <TestnetToggle />
        </div>
      </motion.div>
    </>
  );
}

const TestnetToggle = () => {
  const { appEnv, setAppEnv } = useAppEnv();
  const { t } = useTranslation();

  return (
    <CheckboxInputGroup
      large
      id="testnets-view-toggle"
      name="testnets-view-toggle"
      label={t("showTestnets")}
      checked={appEnv === APP_ENVIRONMENT.testnets}
      handleClick={() => {
        if (appEnv === APP_ENVIRONMENT.testnets) {
          setAppEnv(APP_ENVIRONMENT.mainnets);
        } else {
          setAppEnv(APP_ENVIRONMENT.testnets);
        }
      }}
    />
  );
};
