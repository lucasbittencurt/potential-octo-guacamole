function findRestaurantsByField(field, data, cuisines_data, param) {
  return data.filter(item => {
    switch (field) {
      case 'name':
        return item[field].toLowerCase().match(param.toLowerCase())
      case 'distance':
      case 'price':
        return item[field] == param
      case 'rating':
        return item.customer_rating == param
      case 'cuisine':
        const cuisine = cuisines_data[item.cuisine_id]
        return cuisine.toLowerCase().match(param.toLowerCase())
      default:
        throw new Error("Invalid search parameters")
    }
  })
}

function restaurantsExtration(restaurants_data, cuisines_data, searchParameters, index = 1) {
  const searchParametersKeys = Object.keys(searchParameters)
  const currentKey = searchParametersKeys[index - 1]

  if (searchParametersKeys.length > index) {
    const filteredData = findRestaurantsByField(currentKey, restaurants_data, cuisines_data, searchParameters[currentKey])
    return restaurantsExtration(filteredData, cuisines_data, searchParameters, index + 1)
  } else {
    return findRestaurantsByField(currentKey, restaurants_data, cuisines_data, searchParameters[currentKey])
  }
}

function loadCuisinesOnRestaurant(restaurants, cuisines) {
  return restaurants.map(restaurant => {
    return {
      ...restaurant,
      cuisine_name: cuisines[restaurant.cuisine_id]
    }
  })
}

module.exports = {
  restaurantsExtration,
  loadCuisinesOnRestaurant
}