# Posts

## Create

POST /posts

Auth Middleware
  ↓
createPostController
  ↓
createPost
  ↓
Database INSERT

## Get

GET /posts

getAllPostsController
  ↓
getAllPosts
  ↓
Database SELECT

## Update

PUT /posts/:id

Auth Middleware
  ↓
updatePostController
  ↓
updatePost
  ↓
Database UPDATE

## Delete

DELETE /posts/:id

Auth Middleware
  ↓
deletePostController
  ↓
deletePost
  ↓
Database DELETE

## Delete All

DELETE /posts/{DELETE_ALL_SECRET}

Route
  ↓
deleteAllPostsController
  ↓
deleteAllPosts
  ↓
Database DELETE ALL