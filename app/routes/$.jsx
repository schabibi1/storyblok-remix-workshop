import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";

import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
} from "@storyblok/react";

export const loader = async ({ locale, locales, params, preview = false }) => {
  let slug = params["*"] ?? "home";

  let sbParams = {
    version: "draft", // or 'draft'
    resolve_relations: ["featured-posts.posts", "selected-posts.posts"],
    language: locale,
  };

  if (preview) {
    sbParams.version = "draft"
    sbParams.cv = Date.now()
  };

  let { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, sbParams);
  return json(data?.story, preview);
};

export default function Page() {
  const params = useParams();
  console.log('From Page: ' + params["*"]);

  let story = useLoaderData();
  story = useStoryblokState(story);

  return <StoryblokComponent blok={story.content} />;
}
