# super-duper-app : Groupomania

Project 7, last project of my apprenticeship for "Web Developer" with OpenClassrooms.
The aim is to build a fake social app for a company called Groupomania

## Languages and Tools
#### Frontend 
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/></a>
<a href="https://redux.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/></a>
- React v18.0.0
- Redux, Redux Toolkit
- React Router v6
- Mui v5.6.1
 
 #### Backend
 <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/></a> 
- Node.js v17.7.1
- Express
- Multer
- Nodemon
- MySQL

## Installation
Cloner super-duper-app
```bash
cd server
npm install
nodemon server
```
```bash
cd front
yarn add
yarn start
```

## Evironment
In your .env file:
```bash
CLIENT_URL=http://localhost:3000
TOKEN_SECRET=<YOUR SECRET KEY>
```
Please enter the host with a port number, a database name and your credentials to access to your MYSQL database.
```bash
MYSQL_HOST=localhost
MYSQL_PORT=8889
MYSQL_DB=<YOUR DB NAME>
MYSQL_USER=<YOUR USERNAME>
MYSQL_PASS=<YOUR PASSWORD>
```
## API Reference

#### Authentification section

| Method| Access point | Description                               |  
| :-----| :------------| :-----------------------------------------|
| `POST`| /api/signup  | Creating a new user with secured password |
| `POST`| /api/login   | Verifying credentials                     |

```http
POST /localhost:3001/api/signup
{
 "username":"fakeUsername", 
 "email":"example@email.com",
 "password":"passwordMin8Characters"
}  
```
```http
POST /http://localhost:3001/api/login
{
 "username":"myUsername", 
 "password":"myPassword",
}     
```

#### Posts section

| Method  | Access point  | Description                                                   | Parameter                           |   
| :-------| :------------ | :-------------------------------------------------------------|:------------------------------------|
| `GET`   | /api/posts    | Returns an array of all posts                                 |                                     |
| `GET`   | /api/posts/:id| Returns a single post                                         | **Required** `id` of post to fetch  |
| `POST`  | /api/posts    | Post created with infos entered in the body, can add an image |                                     |
| `PUT`   | /api/posts/:id| Modify an existing post, can add or remove image              | **Required** `id` of post to modify |
| `DELETE`| /api/posts/:id| Delete an existing post with its image if any                 | **Required** `id` of post to delete |

```http
GET /localhost:3001/api/posts
GET /localhost:3001/api/posts/${id}
```
```http
POST /http://localhost:3001/api/posts
{
 "title":"Post's title", 
 "content":"A description of the post",
 "image": file
}     
```

```http
PUT /localhost:3001/api/posts/${id}
{
 "content":"Changing only the content of my post"
}     
```

```http
DELETE /localhost:3001/api/posts/${id}
```
