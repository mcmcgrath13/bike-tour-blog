# [Mary Bikes](https://mary-bikes.web.app) - a Bike Tour Blog

A image-first blog built with Gatsby and styled components for my 2022 bike tour across the northern US. Vega is used to generate the map visualizations. Netlify CMS is used for creating posts (with heavily edited CSS to make it mobile usable). Using github auth for Netlify and have the data saved as markdown and images to this repo.

## Setup

```
npm install
npm run develop
```

To add content with Netlify CMS locally, in another terminal, run:
```
npx netlify-cms-proxy-server
```

## Deployment

Github actions is set up to deploy on push to `main`.  The site is hosted on Firebase with a Firebase Function to run the Netlify CMS oath server (from [netlifycms-oath-server](https://github.com/hatappo/netlifycms-oauth-server)).

Previews are deployed on pull requests.
