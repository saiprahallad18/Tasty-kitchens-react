# Tasty Kitchens

A responsive restaurant and food ordering app built with React. Users can sign in, browse restaurants and menus, and manage food items in a shopping cart.

## Features

- Sign in using the Tasty Kitchens login API
- Protected routes for app pages
- Browse restaurant offers and restaurant listings
- Search, sort, and paginate restaurant results
- View restaurant details and menu items
- Add food to the cart and change item quantities
- Save cart data in browser local storage
- Responsive layout, loading indicators, and error views

## Routes

| Path | Page |
| --- | --- |
| `/login` | Login |
| `/` | Home and restaurant listings |
| `/restaurant/:id` | Restaurant details and menu |
| `/cart` | Shopping cart |
| Any unknown path | Page not found |

## Technologies

- React
- Vite
- React Router
- React Icons
- React Loader Spinner

## Run the project locally

Install dependencies:

```bash
npm install

src/
├── components/
│   ├── AllRestaurants/
│   ├── Cart/
│   ├── Footer/
│   ├── Header/
│   ├── Home/
│   ├── LoginForm/
│   ├── NotFound/
│   ├── ProtectedRoute/
│   └── RestaurantDetails/
├── App.jsx
├── index.css
└── main.jsx

public/
└── Images and public assets