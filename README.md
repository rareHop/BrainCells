Here : a cool group chat website called "Last Braincells" with a shared password authentication and MongoDB for message persistence. Since we're in WebContainer, we'll use MongoDB Atlas for the database.

I've created a modern, responsive group chat application with the following features:

Authentication:

Single shared password for the group
Username requirement for identification
Smooth login/logout experience
Chat Features:

Real-time messaging using Socket.IO
Message persistence with MongoDB
System notifications for user join/leave
Message timestamps
Auto-scroll to latest messages
UI/UX:

Beautiful gradient background
Glass-morphism design
Responsive layout
Different message styles for sent/received
Loading of previous messages
Clean animations and transitions
To use this:

Replace the MongoDB URI in the .env file with your MongoDB Atlas connection string
The default group password is "KOIGHUSNAPAYE"
Each user needs to enter a unique username and the group password to join
The chat features a modern, clean design with a purple/indigo theme that matches the "Last Braincells" concept. Messages are displayed in a bubble style with clear sender identification and timestamps.


To Run : Npm Run dev / vite preview
