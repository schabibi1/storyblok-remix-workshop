import { storyblokEditable } from "@storyblok/react";

const PostLists = ({ blok }) => {
  return (
    <ul
      className="mx-auto w-full flex flex-col items-center"
      {...storyblokEditable(blok)}
      key={blok._uid}
    >
      {blok.posts.map((post) => {
        return (
          <li
            key={post.slug}
            className="max-w-4xl w-full px-10 my-4 py-6 rounded-lg shadow-md bg-white"
          >
            <div className="flex justify-between items-center">
              <span className="font-light text-gray-600">
                {`
                    ${new Date(post.created_at).getDay()}.
                    ${new Date(post.created_at).getMonth()}.
                    ${new Date(post.created_at).getFullYear()}`}
              </span>
            </div>
            <div className="mt-2">
              <a href={`/blog/${post.slug}`}>
                <a className="text-2xl text-gray-700 font-bold hover:text-gray-600">
                  {post.content.title}
                </a>
              </a>
              <p className="mt-2 text-gray-600">{post.content.intro}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <a href={`/blog/${post.slug}`}>
                <a className="text-blue-600 hover:underline">Read more</a>
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PostLists;