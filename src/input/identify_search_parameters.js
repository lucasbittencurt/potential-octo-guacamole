function identifySearchParameters(askResponse) {
  const parameters = askResponse
    .split(',')
    .map(p => p.trim())

  const searchParameters = {}
  parameters.forEach(param => {
    switch (param) {
      case String(param.match(/^name:.*/)):
        searchParameters.name = param.replace('name:', '')
        break
      case String(param.match(/^distance:.*/)):
        searchParameters.distance = param.replace('distance:', '')
        break
      case String(param.match(/^rating:.*/)):
        searchParameters.rating = param.replace('rating:', '')
        break
      case String(param.match(/^price:.*/)):
        searchParameters.price = param.replace('price:', '')
        break
      case String(param.match(/^cuisine:.*/)):
        searchParameters.cuisine = param.replace('cuisine:', '')
        break
    }
  })
  return searchParameters
}

module.exports = {
  identifySearchParameters
}