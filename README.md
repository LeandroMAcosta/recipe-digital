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
```javascript
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
```javascript
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


```json
{
  "authorization":"Bearer <token>"
}
```

---

### Category Mutations/Queries

#### Create a category
```javascript
mutation{
  createCategory(categoryInput:{
    name:"ensaladas"
  }) {
    id
    name
  }
}
```
--- 
### Recipes Mutations/Queries

#### Create a recipe

> Replace categoryId with the id that returned the previous mutation. 
```javascript
mutation{
  createRecipe(recipeInput:{
    name:"ensalada rusa",
    categoryId: 1
    description:"Receta de ensalada rusa de la Abuela"
    ingredients: [
      {
        item:"Papas",
        unit:"unidad",
        quantity: 4
      },
      {
        item:"zanahoria",
        unit:"unidad"
        quantity: 2
      },
      {
        item:"arvejas",
        unit:"lata"
        quantity: 1
      },
      {
        item:"mayonesa",
        unit:"taza"
        quantity: 1
      }
    ]
  }) {
    name
    category {
      id
    }
  }
}
```

#### Get your Recipes

```javascript
{
  getMyRecipes {
    id
    name
    ingredients {
      item
      unit
      quantity
    }
  }
}
```

### You can add filters too

Try to get all the recipes with "ensalada" in the name 
```javascript
{
  getRecipes(name:"lada") {
    id
    name
    ingredients {
      unit
      quantity
      id
    }
  }
}
```