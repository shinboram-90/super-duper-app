# super-duper-app : Groupomania

Project 7, last project of my "Web Developer" apprenticeship with OpenClassrooms.
The aim is to build a social app for employees at a company called Groupomania. It provides the main functions you'd expect from a social app such as a user session, publishing posts and comments, an admin system, etc.

## Requirements
- Authenticate a user and maintain his session
- Manage a data storage using SQL
- Implement a secured data storage using SQL
- Customize the content sent to a web client

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
Ensure that you have React, Node and Mysql already installed on your machine.

🚀 Clone super-duper-app
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

## Evironment Variables
To run this project, you will need to add the following environment variables to your .env file
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

Example of a user object created:
{
 "id": 101,
 "username": "User",
 "email": "user@email.com",
 "password": "$2b$10$KXh26EJi7Wob8VYZCZwGteL2F4mYgaFFSAzMYjdlCgKkGz745Y7wu",
 "role": "user",
 "biography": null,
 "is_active": 1,
 "avatar": null,
 "created_at": "2022-02-10T13:52:19.000Z",
 "updated_at": "2022-02-10T13:52:19.000Z",
 "first_name": null,
 "last_name": null,
 "phone": null
        }
```
```http
POST /localhost:3001/api/login
{
 "username":"myUsername", 
 "password":"myPassword",
}     
```
#### Posts section

| Method  | Access point        | Description                                                        | Parameter                          |   
| :-------| :------------------ | :------------------------------------------------------------------|:-----------------------------------|
| `GET`   | /api/posts          | Returns an array of all posts                                      |                                    |
| `GET`   | /api/profile/:userId| Returns an array of all posts that belong to one user              | **Required** `id` of post's author |
| `GET`   | /api/posts/:id      | Returns a single post                                              | **Required** `id` of post to fetch |
| `POST`  | /api/posts/         | Create a post, can add an image                                    |                                    |
| `PUT`   | /api/posts/:id      | Modify an existing post, can remove an image if any or add one     | **Required** `id` of post to edit  |
| `DELETE`| /api/posts/:id      | Delete an existing post with the linked image                      | **Required** `id` of post to delete|

```http
GET /localhost:3001/api/posts
GET /localhost:3001/api/profile/${userId}
GET /localhost:3001/api/posts/${id}
```

api/profile/${auth.id}
```http
POST /localhost:3001/api/posts
{
 "title":"Post's title",
 "content":"Post's description",
 "image":file
}
```
```http
PUT /localhost:3001/api/posts/${id}
{
 "title":"Title can be modified",
 "content":"Content can be modified",
 "image":file can be removed or changed
}
A user with an admin role is given rights to edit a post.
```

```http
DELETE /localhost:3001/api/posts/${id}
A user with an admin role is given rights to delete a post.
```
#### Comments section

| Method  | Access point                   | Description                                      | Parameter                                           |   
| :-------| :----------------------------- | :------------------------------------------------|:----------------------------------------------------|
| `GET`   | /api/posts/:postId/comments    | Returns an array of comments related to one post | **Required** `id` of post with comments             |
| `POST`  | /api/posts/:postId/comments    |Comment created for the selected post with infos entered in the body | **Required** `id` of post related|
| `PUT`   | /api/posts/:postId/comments/:id| Modify an existing comment              | **Required** `id` of post related and `id` of comment to edit|
| `DELETE`| /api/posts/:postId/comments/:id| Delete an existing comment            | **Required** `id` of post related and `id` of comment to delete|

```http
GET /localhost:3001/api/posts/${postId}/comments
```
```http
POST /localhost:3001/api/posts/${postId}/comments
{ 
 "content":"My first comment",
}     
```
```http
This part has been removed client side for now, will be implemented soon
PUT /localhost:3001/api/posts/${postId}/comments/${id}
{
 "content":"Content can be modified"
}
A user with an admin role is given rights to edit a comment.
```
```http
DELETE /localhost:3001/api/posts/${postId}/comments/${id}
A user with an admin role is given rights to delete a comment.
```
#### Users section

| Method  | Access point  | Description               | Parameter                          |   
| :-------| :------------ | :-------------------------|:---------------------------------- |
| `GET`   | /api/users    | Returns an array of users |                                    |
| `GET`   | /api/users/:id| Resturns a single user    | **Required** `id` of user to fetch |
| `PUT`   | /api/users/:id| Modify an existing user   | **Required** `id` of user to edit  |
| `DELETE`| /api/users/:id| Delete an existing user   | **Required** `id` of user to delete|

```http
GET /localhost:3001/api/users
GET /localhost:3001/api/users/${id}
```

```http
This part has been removed client side for now, will be implemented soon
PUT /localhost:3001/api/users/${id}
{
 "first_name":"John",
 "last_name":"Doe",
 "biography":"Something about myself",
 "avatar":file
}     
```
```http
DELETE /localhost:3001/users/${id}
```
#### Likes section is not up running yet, will be in V2

## Author
[@shinboram-90](https://github.com/shinboram-90)
