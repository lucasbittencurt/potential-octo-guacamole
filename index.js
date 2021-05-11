const { main } = require('./src/main.js')
const { ask } = require('./src/ask')

function introduction() {
  console.log('Search Restaurant Program')
  console.log('-------------------------')
  console.log(`You can search by restaurant name, distance, rating, price and cuisine.
You don't need to provide all fields to search, but you need to use comma to
seperate your input.
Like if you want to search with name and rating this is the correct input:
name:Pizza,rating:5`)
  console.log('-------------------------\n')
}

function index() {
  console.log('start program...\n')
  introduction()
  ask("what is your search? ").then(search => main(search))
}

index()
