# Recipe Challenge

## Features

- Express
- TypeScript
- JWT
- Apollo Server
- TypeORM
- GraphQL
- MySql
- TypeDI

## Usage

1. Clone this repo: `git clone https://github.com/LeandroMAcosta/recipe-digital`
2. Change directory: `cd recipe-digital`
3. Install dependencies: `npm i`
4. Create a MySql database and user, then set your credentials on a `.env` file.
5. Run the application: `npm run dev`
6. Navigate to `http://localhost:3000/graphql`

Also you can try it on [heroku](https://recipe-digital-challenge.herokuapp.com/graphql) 

## Configuration

| Environment variable | Default value |
| -------------------- | ------------- |
| SESSION_PRIVATE_KEY  | random uuid   |
| PORT                 | 3000          |
| HOST                 | localhost     |
| DB_NAME              | recipe_db     |
| DB_USERNAME          | recipe        |
| DB_PASSWORD          | r3c1p3        |


## Some basic queries you can try


### Auth Mutations


#### Register
```
mutation {
  signUp(input:{
  	name:"your name",
    email:"my@email.com"
    password:"super-secret-password"
  }) {
		user {
      id
    }
    token
  }
}
```

#### Login
```
mutation {
  login(input:{
  	email:"my@email.com"
    password:"super-secret-password"
  }) {
    token
  }
}
```

You can copy the token in the response and put it in the headers for some of the upcoming queries / mutations


```
{
  "authorization":"Bearer <token>"
}
```

---

### Category Mutations/Queries

```
mutation{
  createCategory(categoryInput:{
  	name:"ensaladas"
  }) {
    id
    name
  }
}
```
