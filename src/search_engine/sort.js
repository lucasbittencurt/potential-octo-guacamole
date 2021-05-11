const MAX_RESULTS = 5

function sort(restaurants) {
  const ordered_by_distance = orderByDistance(restaurants)
  const ordered_by_rating = orderByRating(ordered_by_distance)
  const ordered_by_price = orderByPrice(ordered_by_rating)
  return ordered_by_price.slice(0,MAX_RESULTS)
}

function orderByDistance(restaurants) {
  const orderedByDistance = restaurants.sort(function(a, b) {
    if (parseInt(a.distance) > parseInt(b.distance)) return 1
    if (parseInt(a.distance) < parseInt(b.distance)) return -1
    return 0
  })
  return orderedByDistance
}

function orderByRating(restaurants) {
  const distances = [...new Set(restaurants.map(r => (r.distance)))]
  let ordered_by_rating = []

  for (const d of distances) {
    const with_same_distance = restaurants.filter(r => r.distance === d)
    const with_same_distance_order = with_same_distance.sort(function(a, b) {
      if (parseInt(a.customer_rating) > parseInt(b.customer_rating)) return -1
      if (parseInt(a.customer_rating) < parseInt(b.customer_rating)) return 1
      return 0
    })
    ordered_by_rating = [...ordered_by_rating, ...with_same_distance_order]
  }

  return ordered_by_rating
}

function orderByPrice(restaurants) {
  const ratings = [...new Set(restaurants.map(r => (r.customer_rating)))]
    .sort()
    .reverse()
  const distances = [...new Set(restaurants.map(r => (r.distance)))]

  let ordered_by_price = []

  for (const distance of distances) {
    for (const rating of ratings) {
      const with_same_rating_and_distance = restaurants
        .filter(r => r.customer_rating === rating && r.distance === distance)
      
      if (with_same_rating_and_distance.length > 1) {
        const with_same_price_order = with_same_rating_and_distance
          .sort(function(a, b) {
            if (parseInt(a.price) > parseInt(b.price)) return 1
            if (parseInt(a.price) < parseInt(b.price)) return -1
            return 0
          })
        ordered_by_price = [...ordered_by_price, ...with_same_price_order]
      } else {
        ordered_by_price = [...ordered_by_price, ...with_same_rating_and_distance]
      }
    }
  }

  return ordered_by_price
}

module.exports = {
  sort
}
