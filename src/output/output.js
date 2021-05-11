function output(restaurants) {
  if (restaurants.length) {
    console.log('\nRESULTS:\n')
    for (const restaurant of restaurants) {
      console.log(`Name: ${restaurant.name}
Distance: ${restaurant.distance}km | Rating: ${restaurant.customer_rating}
Price: $${restaurant.price}
Cuisine: ${restaurant.cuisine_name}
______________________________________
      `)
    }
  } else {
    console.log('\nNo restaurants found.')
  }
}

module.exports = {
  output
}