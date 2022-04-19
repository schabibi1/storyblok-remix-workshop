import Layout from "../components/Layout";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { i18n } from "~/i18n.server.jsx";
import { useChangeLanguage } from "remix-i18next";
import { useTranslation } from "react-i18next";

import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
} from "@storyblok/react";

export default function Page({ locale }) {
  let story = useLoaderData(locale);
  let { t } = useTranslation("home");
  locale = story.lang;
  story = useStoryblokState(story, {
    resolveRelations: ["featured-posts.posts", "selected-posts.posts"],
    language: locale,
  });
  console.log('Page locale: ' + locale);

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return (
    <Layout locale={locale}>
      {console.log(locale)}
      <StoryblokComponent blok={story.content} />
      <h1>{t(story.content)}</h1>
    </Layout>
  )
};

export const loader = async ({ locale, params, preview = false, request }) => {
  let slug = params["*"] ?? "home";

  let sbParams = {
    version: "draft", // or 'draft'
    resolve_relations: ["featured-posts.posts", "selected-posts.posts"],
    language: locale,
  };
  console.log('loader locale: ' + locale)

  if (preview) {
    sbParams.version = "draft"
    sbParams.cv = Date.now()
  };

  // const LoaderData = locale;
  locale = await i18n.getLocale(request);

  let { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, sbParams);
  return json(data?.story, preview, locale);
};

export let handle = {
  // In the handle export, we could add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  i18n: ["home"],
};