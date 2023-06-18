# Buglift Full-Stack App

Welcome to the Buglift repository! This repository contains the source code for Buglift, a full-stack web application developed using Create React App for the frontend and Express.js, Node.js, and MongoDB for the server-side and database functionalities. BugLift showcases my skills in React, HTML, CSS, JavaScript, as well as server-side development.

## Features

Buglift is a bug tracking and issue management application with the following features:

<ul>
<li>Dashboard: An overview of the current status of bugs and issues.</li>
<li>Projects: View, filter, and search through the list of projects.</li>
<li>Tickets: View, filter, and search through the list of tickets.</li>
<li>Ticket Details: View detailed information about a specific bug, including its status, priority, and assigned developer.</li>
<li>Create Ticket: Add new tickets to the system, including information such as title, description, and priority.</li>
  <li>Create Projects: Add new projects to the system, including information such as title, description.</li>
<li>Edit ticket: Modify existing ticket details, update its status or priority.</li>
</ul>

## Repository Structure

The repository is structured as follows:

|- client/               # Directory for the frontend code (Create React App)<br/>
|  |- src/               # React components and frontend code<br/>
|  |- public/            # Public assets and index.html file<br/>
|- server/               # Directory for the server-side code (Express.js, Node.js)<br/>
|  |- routes/            # Server routes and API endpoints<br/>
|  |- models/            # Database models and schemas (MongoDB)<br/>
|- images/               # Directory for images used in the app<br/>
|- package.json          # Project dependencies and scripts<br/>
|- README.md             # README file<br/>

Feel free to explore the code and make any modifications or improvements as needed.

## Getting Started
To run the BugLift app locally, follow these steps:
<ol>
<li>Clone the repository or download the source code.</li>
<li>Open a terminal and navigate to the project's root directory.</li>
<li>Install the frontend dependencies:</li>
<ul>
  <li>Navigate to the client directory: cd client</li>
<li>Run npm install to install the frontend dependencies.</li>
 </ul> 
<li>Install the server-side dependencies:</li>
  <ul>
<li>Navigate back to the project root directory: cd ..</li>
<li>Navigate to the server directory: cd server</li>
<li>Run npm install to install the server-side dependencies.</li>
    </ul>
<li>Run the app:</li>
  <ul>
<li>From the project root directory, start the frontend: npm run client</li>
<li>Open a new terminal window/tab, navigate to the project root directory, and start the server: npm run server</li>
<li>The app will be accessible at http://localhost:3000.</li>
  </ul>
Make sure you have MongoDB installed and running on your machine to enable database functionalities.
</ol>

## Technologies Used
<ul> 
<li>Frontend:</li>
  <ul>
<li>React</li>
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
  </ul>
<li>Backend:</li>
  <ul>
<li>Express.js</li>
<li>Node.js</li>
<li>MongoDB</li>
  </ul>
</ul>

## CRUD Functionalities
Buglift incorporates Create, Read, Update, and Delete (CRUD) functionalities to manage bugs and issues effectively. These functionalities enable users to:
<ul>
  <li>Create: Add new bugs to the system using the provided form.</li>
  <li>Read: View and search through the list of reported bugs and access their details.</li>
  <li>Update: Modify existing bug details, update status, or change priority.</li>
  <li>Delete: Remove bugs from the system when they are resolved or no longer relevant.</li>
</ul>

## Credits

This app was developed by Russell Ramiro as a project to showcase programming skills and knowledge of web development technologies.

## License

This project is licensed under the MIT License. Feel free to use the code as a reference or template for your own bug tracking or issue management applications.

## Contact

If you have any questions, suggestions, or just want to say hello, feel free to reach out to me. My contact information can be found within the Buglift app.
Thank you for visiting the Buglift repository!
