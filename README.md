# Open AI Chatbot

## Table of Contents

- [Description](#description)
    - [Client](#client)
    - [Server](#server)
- [Tech Stack](#tech-stack)
- [Features](#features-wait-until-gifs-load)
- [Open AI DALL·E 2 API](#open-ai-dall-e-2-api)
- [Database Structure](#database-structure)
    - [MongoDB](#mongodb)
    - [Cloudinary](#cloudinary)
- [Format Configuration](#format-configuration)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)

## Description

In summary, this project is a full-stack web application that combines the Vite framework, Tailwind CSS, Prettier, ExpressJS, Cloudinary, and MongoDB to deliver a dynamic and efficient user experience.The output of this project is a real-time, interactive application that allows users to generate unique images and art based on their descriptions in natural language. The generated content is then stored and managed using Cloudinary, making it accessible and shareable across the web.

### Client
The "client" folder is a front-end application built using the [Vite framework](https://github.com/vitejs/vite). It utilizes the [Tailwind CSS](https://tailwindcss.com/) framework for styling and the [Prettier](https://prettier.io/) library for code formatting to deliver a visually appealing and well-structured user interface. It also support [TypeScript](https://www.typescriptlang.org/), and its deployed using [Vercel](https://vercel.com/docs)

### Server
The "server" folder is a back-end component powered by [ExpressJS](https://expressjs.com/). It uses [Cloudinary](https://cloudinary.com/) to store and manage images, and is connected to a [MongoDB](https://mongodb.com) database for persistent data storage. It also utilizes the OpenAI's DALL·E 2 AI system, which generates realistic images and art from a description in natural language and its deployed using [Render](https://render.com/)


## Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Prettier](https://prettier.io/)
- [ExpressJS](https://expressjs.com/)
- [Vercel](https://vercel.com/docs)
- [Render](https://render.com/)

## Features (wait until GIFs load)

- View list of images

![List of Images](https://user-images.githubusercontent.com/72515147/224482269-27877714-dc00-429d-99d8-2659ce3da9e5.gif)

- Download images.

![Download](https://user-images.githubusercontent.com/72515147/224489304-335e5ed6-c207-4200-9e3b-806f866a41a9.gif)

- Title and User included in each image.

![Title and User](https://user-images.githubusercontent.com/72515147/224489404-c1faeceb-03cc-46be-81f8-890811415059.gif)

- Create and post the image

![Posting](https://user-images.githubusercontent.com/72515147/224490228-55a57d2d-68c1-4b50-8272-821785d69de6.gif)

- Random prompt to generate.

![Prompt](https://user-images.githubusercontent.com/72515147/224490060-69d380e3-448c-44a3-89dc-db5e1cca589c.gif)

- View generated image before posting. 

![Generate Image](https://user-images.githubusercontent.com/72515147/224489993-fa8b0408-ab11-4150-9e36-267f1b8793c9.gif)


## Open AI DALL E 2 API
- `dalleRoutes.js`

When a POST request is received at the root URL ("/"), the function defined in the code is executed. It starts by extracting the prompt from the request body and using it as a parameter in a call to the createImage method of the OpenAIApi instance. This method generates an image based on the prompt and returns the result in base64 encoded JSON format.

The code then extracts the image data from the response and packages it in a JSON object with a property named photo. Finally, the JSON object is sent back to the client with a status code of 200 (OK), indicating that the request was successful.

In the event of an error, the error message is logged to the console and sent back to the client with a status code of 500 (Internal Server Error), indicating that an internal server error occurred.

```
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "256x256",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
});

```

## Database Structure

### MongoDB
```
import mongoose from "mongoose";

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;
      
```

### Cloudinary
```
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
    res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

```

## Format Configuration
```

{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true
}

```

## Folder Structure
```
.
|-- client
|   |-- index.html        
|   |-- package-lock.json 
|   |-- package.json      
|   |-- postcss.config.cjs
|   |-- public
|   |   `-- vite.svg      
|   |-- src
|   |   |-- App.css
|   |   |-- App.tsx
|   |   |-- assets
|   |   |   |-- download.png
|   |   |   |-- index.js
|   |   |   |-- logo.svg
|   |   |   `-- preview.png
|   |   |-- components
|   |   |   |-- Card.tsx
|   |   |   |-- FormField.tsx
|   |   |   |-- Loader.tsx
|   |   |   `-- index.ts
|   |   |-- constants
|   |   |   `-- index.ts
|   |   |-- index.css
|   |   |-- main.tsx
|   |   |-- pages
|   |   |   |-- CreatePost.tsx
|   |   |   |-- Home.tsx
|   |   |   `-- index.js
|   |   `-- utils
|   |       `-- index.ts
|   |-- tailwind.config.cjs
|   `-- vite.config.js
`-- server
    |-- index.js
    |-- mongodb
    |   |-- connect.js
    |   `-- models
    |       `-- post.js
    |-- package-lock.json
    |-- package.json
    `-- routes
        |-- dalleRoutes.js
        `-- postRoutes.js

```

## Environment Variables

- Generate a key from Open AI.
```
OPENAI_API_KEY=
```

- Generate using your DB cluster connect option.
```
MONGODB_URL=
```

- Generated on the dashboard of Cloudinary under the section "Product Environment Credentials".
```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```





