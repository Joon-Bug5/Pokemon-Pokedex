Project description
This project, learning Javascript/jQuery and the function it does to understand how Javascript can format and how the website works, being able to control where to fetch information and how to display the information on HTML.

How to get the project running
I started out with the basic structure of HTML and added different elements and functions in Javascript as well as CSS for the look of the webpage.

Project dependencies (ESLint rules)
Vanilla JS as jQuery
ESLint Rules
{
    "env": {
        "es6": true,
        "browser": true,
        "commonjs": true,
        "jquery": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "rules": {
        "quotes": ["error", "single"]
    }
}

Which API the project uses
This project is using https://pokeapi.co/ as the API to pull the information.
