# nodejs-graphql-base
A GraphQL implementation of a NodeJS API GW leveraging Sequelize ORM

## Application Base Structure
 **src** <br>
|__ **bin** - _[start script]_<br> 
|__ **database** _[Sequelize specific implementations & database models]_<br>
|___ config<br>
|___ migrations<br>
|___ models<br>
|___ seeders<br>
|__ **graphql** - _[GraphQL specific implementations]_<br>
|___ resolvers<br>
|___ typedefs<br>
|___ index.js<br>
|___ schema.js<br>
|__ **app.js** - _[Application Boostrap]_ <br>
**.gitignore**<br>
**nodemon.json**<br>
**package.json**<br>

## Database Schema
![img.png](img.png)
### Sequelize model generation
#### Organizations

