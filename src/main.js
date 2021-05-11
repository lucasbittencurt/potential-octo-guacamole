const fs = require('fs')
const csv = require('csv-parser')

const { readCSVStream } = require('./utils/read_csv_stream.js')
const { identifySearchParameters } = require('./input/identify_search_parameters.js')
const { restaurantsExtration, loadCuisinesOnRestaurant } = require('./search_engine/queries.js')
const { sort } = require('./search_engine/sort.js')
const { output } = require('./output/output.js')

async function loadData() {
  const cuisines_data = await readCSVStream(fs.createReadStream('cuisines.csv').pipe(csv()))
  const cuisines_dict = cuisines_data.reduce((prev,cur) => ({...prev, [cur.id]: cur.name}), {})
  const restaurants_data = await readCSVStream(fs.createReadStream('restaurants.csv').pipe(csv()))
  return Promise.resolve({
    cuisines_data: cuisines_dict,
    restaurants_data
  })
}


async function main(searchInput) {
 
  const searchParameters = identifySearchParameters(searchInput)
  const { cuisines_data, restaurants_data } = await loadData()

  try {
    const restaurantsExtrationResult = restaurantsExtration(restaurants_data, cuisines_data, searchParameters)
    const restaurantsWithCuisinesNames = loadCuisinesOnRestaurant(restaurantsExtrationResult, cuisines_data)
    const restaurantsLoad = sort(restaurantsWithCuisinesNames) 
    output(restaurantsLoad)
    console.log('search succeeded.\n')
  } catch (error) {
    console.log(`\n${error.message}`)
    console.log('Search failed.\n')
    process.exit()
  }

  process.exit()
}

module.exports = {
  main
}
