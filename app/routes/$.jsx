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
      {console.log('Page JSX: ' + locale)}
      <StoryblokComponent blok={story.content} />
    </Layout>
  )
};

export const loader = async ({ lang, params, preview = false }) => {
  let slug = params["*"] ?? "home";
  let activeLanguage = ['ja', 'default'].includes(lang) ? lang : 'default'
  console.log('slug: ' + slug);
  console.log('params["*"]: ' + params["*"]);
  console.log(params);

  let sbParams = {
    version: "draft", // or 'draft'
    resolve_relations: ["featured-posts.posts", "selected-posts.posts"],
    language: activeLanguage,
    // find_by: "uuid",
  };
  console.log('loader activeLanguage: ' + activeLanguage)

  if (preview) {
    sbParams.version = "draft"
    sbParams.cv = Date.now()
  };

  let { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, sbParams);
  console.log('data.story.lang: ' + data.story.lang)
  return json(data?.story, preview);
};
