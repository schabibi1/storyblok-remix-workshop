import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";

import { i18n } from "~/i18n.server.jsx";
import { useChangeLanguage } from "remix-i18next";
import { useTranslation } from "react-i18next";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "./components/Feature";
import Grid from "./components/Grid";
import Page from "./components/Page";
import Teaser from "./components/Teaser";

import styles from "./styles/app.css"

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
};

storyblokInit({
  accessToken: "IpSV7QBufqcmYTxZ2sAKUgtt",
  use: [apiPlugin],
  components,
});

export const meta = () => ({
  charset: "utf-8",
  title: "Storyblok Remix Multilanguage Website",
  viewport: "width=device-width,initial-scale=1",
});

export let handle = {
  // In the handle export, we could add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  i18n: ["translations", "root"],
};

export default function App({ locale }) {
  locale = useLoaderData(locale);
  let { i18n } = useTranslation();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);
  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}