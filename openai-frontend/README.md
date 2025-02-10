# Chat App

This is a full-stack React-based chat application with a Node.js backend that allows users to send messages, upload profile pictures, and share conversation links.

## Features
- **Real-time Chat**: Users can send and receive messages.
- **User & Assistant Avatars**: Users can upload an image, and the assistant has a default avatar.
- **Share Chat Link**: Generates a sharable link containing the conversation history.
- **Delete Chat**: Clears the chat history with confirmation.
- **Backend Integration**: Sends user prompts to an AI chatbot via a backend server.

## Installation

### Prerequisites
- Node.js installed (>= 14.x recommended)
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/chat-app.git
   cd chat-app
   ```

2. Install frontend and backend dependencies:
   ```sh
   cd openai-frontend
   npm install
   cd ../openai-backend
   npm install
   ```

3. Start the backend:
   ```sh
   cd openai-backend
   npm start
   ```

4. Start the frontend:
   ```sh
   cd ../openai-frontend
   npm run dev
   ```

## Usage
- **Sending Messages**: Type a message and press send (`➤`).
- **Uploading an Avatar**: Click the file input and upload an image.
- **Sharing Chat**: Click `🔗 Share link to Prompt`, and the link will be copied to the clipboard.
- **Deleting Chat**: Click `🗑️ Delete Prompt`, then confirm to clear the chat.

## Project Structure
```
OpenAi/
│── openai-backend/       # Backend server
│   ├── node_modules/     # Backend dependencies
│   ├── .env              # Environment variables
│   ├── package.json      # Backend dependencies
│   ├── server.js         # Express server
│── openai-frontend/      # Frontend application
│   ├── node_modules/     # Frontend dependencies
│   ├── public/           # Static files (images, icons)
│   ├── src/              # React source files
│   ├── package.json      # Frontend dependencies
│   ├── vite.config.js    # Vite configuration
│── README.md             # Project documentation
```

## API Endpoint (Backend)
If using a backend, the chat messages are sent to:
```
POST http://localhost:5000/chat
Body: { "prompt": "User message" }
Response: { "response": "AI reply" }
```

## Future Enhancements
- Persistent chat history
- Authentication for users
- WebSocket for real-time chat

