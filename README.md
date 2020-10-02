# blog-template-api
Basic api for blog template. Node.js/Express.Js MongoDB-Moongoose

# Index
| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
|/register | `POST` | {'name':'foo',  'surname':'bar',    'username':'Turkey',    'email':"email@gmail.com",  'password':"123456"} | Register a new user |
|/authenticate | `POST` | {'username':'Turkey', 'password':"123456"} | User authenticate and give a token. |


# User
| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
|/users | `GET` | Empty | List all users. |
|/users | `POST` | {'name':'foo',  'surname':'bar',    'username':'Turkey',    'email':"email@gmail.com",  'password':"123456",    'photo':"object",   'createdAt':"Default" } | Create a new user. |
|/users/:user_id | `GET` | Empty | Get a user. |
|/users/:user_id | `PUT` | {'name':'foo',  'surname':'bar',    'username':'Turkey',    'email':"email@gmail.com",  'password':"123456",    'photo':"object"} | Update a user with new info. |
|/users/:user_id | `DELETE` | Empty | Delete a user. |

# Main Category
| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
|/maincategory | `GET` | Empty | List all main category. |
|/maincategory | `POST` | {'title':'foo',  'metaTitle':'bar',   'createdAt':"Default" } | Create a new main category. |
|/maincategory/:mainCategory_id | `GET` | Empty | Get a main category. |
|/maincategory/:mainCategory_id | `PUT` | {'title':'foo',  'metaTitle':'bar',   'createdAt':"Default" } | Update a main category with new info. |
|/maincategory/:mainCategory_id | `DELETE` | Empty | Delete a main category.|

# Sub Category
| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
|/subcategory | `GET` | Empty | List all sub category. |
|/subcategory | `POST` | {'mainCategoryId':"12axvrtyte84554",   'title':'foo',  'metaTitle':'bar',   'createdAt':"Default" } | Create a new sub category. |
|/subcategory/:subCategory_id | `GET` | Empty | Get a sub category. |
|/subcategory/:subCategory_id | `PUT` | {'mainCategoryId':"12axvrtyte84554",   'title':'foo',  'metaTitle':'bar',   'createdAt':"Default" } | Update a sub category with new info. |
|/subcategory/:subCategory_id | `DELETE` | Empty | Delete a sub category.|

# Comment
| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
|/comment | `GET` | Empty | List all comment. |
|/comment | `POST` | {'postId':"12axvrtyte84554",   'userId':"12ayuhj956rtyte84554",   'comment':'foo',  'isApproved':'false',   'createdAt':"Default" } | Create a new comment. |
|/comment/:comment_id | `GET` | Empty | Get a comment. |
|/comment/:comment_id | `PUT` | {'postId':"12axvrtyte84554",   'userId':"12ayuhj956rtyte84554",   'comment':'foo',  'isApproved':'false',   'createdAt':"Default" } | Update a comment with new info. |
|/comment/:comment_id | `DELETE` | Empty | Delete a comment.|

# Post
| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
|/post | `GET` | Empty | List all post. |
|/post | `POST` | {'userId':"12ayuhj956rtyte84554", 'subCategoryId':"123dfsfdsf34"  ,'title':'foo',  'text':'post body',   'coverImage':"Object",  'createdAt':"Default" } | Create a new post. |
|/post/:post_id | `GET` | Empty | Get a post. |
|/post/:post_id | `PUT` | {'userId':"12ayuhj956rtyte84554", 'subCategoryId':"123dfsfdsf34" ,'title':'foo',  'text':'post body',   'coverImage':"Object",  'createdAt':"Default" } | Update a post with new info. |
|/post/:post_id | `DELETE` | Empty | Delete a post.|
