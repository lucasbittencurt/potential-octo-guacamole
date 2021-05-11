function readCSVStream(stream) {
  return new Promise((resolve, reject) => {
      let data = [];
      stream.on("data", item => data.push(item))
      stream.on("end", () => resolve(data))
      stream.on("error", error => reject(error))
  });
}

module.exports = {
  readCSVStream
}
