# DeepSite

DeepSite is a web-based code editor that allows you to create and edit HTML, CSS, and JavaScript files. It also provides a live preview of your code, so you can see your changes in real-time.

## Installation

To get started, you'll need to have Node.js and npm installed on your machine. Then, you can follow these steps:

1.  Clone the repository:

    ```bash
    git clone https://github.com/Kayushan/deepsite.git
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    npm run dev
    ```

This will start a local development server at `http://localhost:3000`.

## Features

*   **Code editor:** DeepSite uses the Monaco Editor, which is the same editor that powers VS Code. This means you get all the features you'd expect from a modern code editor, including syntax highlighting, code completion, and error checking.
*   **Live preview:** As you type, you'll see a live preview of your code in the right-hand pane. This makes it easy to see how your changes will look without having to refresh the page.
*   **File explorer:** DeepSite has a built-in file explorer, so you can easily navigate between your files.
*   **AI assistant:** DeepSite has an AI assistant that can help you with your code. Just type a prompt, and the AI will generate the code for you.

## Troubleshooting

If you encounter any issues during the installation process, please try the following steps:

1.  **Run Command Prompt as an Administrator:**
    *   Click the **Start** button and type "Command Prompt".
    *   Right-click on "Command Prompt" and select "Run as administrator".
2.  **Clear the npm Cache:**
    *   In the administrator Command Prompt, run the following command:
        ```bash
        npm cache clean --force
        ```
3.  **Install the Dependencies:**
    *   Navigate to the `deepsite` directory and run the following command:
        ```bash
        npm install
        ```

If you are still having issues after trying these steps, you may need to configure your proxy settings. You can do this by running the following commands:

```bash
npm config set proxy http://your-proxy-url:your-proxy-port
npm config set https-proxy http://your-proxy-url:your-proxy-port
```

Replace `your-proxy-url` and `your-proxy-port` with the appropriate values for your proxy server.

### Vite Error

If you encounter a Vite error related to PostCSS and `tailwindcss`, you can resolve it by following these steps:

1.  **Delete `node_modules` and `package-lock.json`:**
    *   In your file explorer, navigate to the `deepsite` directory.
    *   Delete the `node_modules` directory and the `package-lock.json` file.
2.  **Clear the npm Cache:**
    *   In the administrator Command Prompt, run the following command:
        ```bash
        npm cache clean --force
        ```
3.  **Install the Dependencies:**
    *   In the administrator Command Prompt, navigate to the `deepsite` directory and run the following command:
        ```bash
        npm install
        ```
4.  **Restart the Development Server:**
    *   If the development server is still running, stop it by pressing `Ctrl+C`.
    *   Restart the development server by running the following command:
        ```bash
        npm run dev
        ```

## Contributing

If you'd like to contribute to DeepSite, please fork the repository and submit a pull request. We'd love to have your help!
