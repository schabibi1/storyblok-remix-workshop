import Layout from "../components/Layout";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
} from "@storyblok/react";

export default function Page({ locale }) {
  let story = useLoaderData();
  locale = story.lang;
  story = useStoryblokState(story, {
    resolveRelations: ["featured-posts.posts", "selected-posts.posts"],
    language: locale,
  });
  console.log('Page locale: ' + locale)

  return (
    <Layout locale={locale}>
      {console.log(locale)}
      <StoryblokComponent blok={story.content} />
    </Layout>
  )
};

export const loader = async ({ locale, params, preview = false }) => {
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

  let { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, sbParams);
  return json(data?.story, preview);
};
