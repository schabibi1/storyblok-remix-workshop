# Remix Storyblok Blog Boilerplate

![Blog](https://res.cloudinary.com/dsmeebz8b/image/upload/v1651070686/Remix%20workshop/Screenshot_2022-04-27_at_16.44.03_cv5f0c.png)

This repository is a Remix [Storyblok](https://www.storyblok.com) workshop blog demo.

We have a starter template that you can use from our [5 minute tutorial](https://www.storyblok.com/tp/headless-cms-remix) if you want to start from a scratch.

## Requirements

To use this project you need a Storyblok account. If you don't have one yet you can register at [Storyblok](https://www.storyblok.com). It's free.

## How to get started?

Read the [Remix tutorial](https://www.storyblok.com/tp/headless-cms-remix) about connecting Storyblok with Remix.

### 1. Clone the repo

```sh
git clone https://github.com/storyblok/storyblok-remix-boilerplate.git
```

### 2. Install all dependecies

```sh
npm install
```

### 3. Clone a space

Clone a Remix Storyblok blog space by clicking this URL: https://app.storyblok.com/#!/build/153407

### 4. Adding the Access token

Exchange the preview token of your new space with the `accessToken` in `app/root.jsx`.

### 5. Run your project

Set the preview domain in <strong>Storyblok</strong> to `http://localhost:3000/`

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

### 6. Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

#### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

#### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```

## Resources

- [Remix Docs](https://remix.run/docs)
- [Storyblok Tutorial](https://www.storyblok.com/tp/headless-cms-remix)
