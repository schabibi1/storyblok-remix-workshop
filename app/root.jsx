import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "./components/Feature";
import Grid from "./components/Grid";
import Teaser from "./components/Teaser";
import Page from "./components/Page";
import BlogPost from "./components/BlogPost";
import FeaturedPosts from "./components/FeaturedPosts";
import PostsList from "./components/PostsList";

import styles from "./styles/app.css"

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  post: BlogPost,
  "featured-posts": FeaturedPosts,
  "selected-posts": PostsList,
};

storyblokInit({
  accessToken: "YOUR_TOKEN",
  use: [apiPlugin],
  components,
});

export const meta = () => ({
  charset: "utf-8",
  title: "Storyblok Remix Multilanguage Website",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
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