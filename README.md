# (KaibanJS + Next) Example

This repository contains a demonstration project for the KaibanJS framework, utilizing React and Next to create a dynamic AI-powered blogging platform. The application leverages AI agents to research the latest news on a specified topic and automatically generate a comprehensive blog post.

**KaibanJS Resources:**
- [KaibanJS GitHub Repository](https://github.com/kaiban-ai/KaibanJS)
- [KaibanJS Official Website](https://www.kaibanjs.com/)

## Installation

To get this project up and running, follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/kaibanjs-next-example.git
   cd kaibanjs-next-example
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the project root and add your API keys for Tavily and OpenAI:

```
VITE_TRAVILY_API_KEY=your-tavily-api-key
VITE_OPENAI_API_KEY=your-openai-api-key
```

## Running the Application

To start the application in development mode:

```bash
npm run dev
```

This will start the Vite server. You can view your application by navigating to `http://localhost:3000/` in your web browser.

## Features

- **AI Agent Setup:** Configures AI agents using KaibanJS to perform tasks such as news research and content generation.
- **Dynamic Blog Post Generation:** Uses AI to research and generate blog posts based on user-input topics.
- **Markdown Visualization:** Enhances the display of generated blog posts using markdown formatting.

## Building for Production

To build the application for production:

```bash
npm run build
```

This command generates a production-optimized build in the `dist/` directory.

## Using the Demo

- Enter a topic in the input field.
- Click "Generate Blog Post" to see the AI agents in action as they research and compile a blog post on your specified topic.

## Contributing

Contributions to this project are welcome. Please feel free to fork the repository, make improvements, and submit pull requests.

## Feedback and Support

If you encounter any issues or have suggestions for improvements, please open an issue in this repository.