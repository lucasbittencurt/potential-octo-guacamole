const { main } = require('../src/main.js')
const { output } = require('../src/output/output.js')

jest.mock('../src/output/output.js');

describe('Main', () => {
  beforeEach(() => {
    jest.spyOn(process, 'exit').mockImplementation(() => {});
  })
  
  test('should search restaurants with name "Grill" and call output with five results in an correct order', async () => {
    const search_term = 'name:Grill'
    const console_log_spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await main(search_term)

    const expected_data = [
      {"cuisine_id": "8", "cuisine_name": "Korean", "customer_rating": "3", "distance": "1", "name": "Dished Grill", "price": "10"},
      {"cuisine_id": "15", "cuisine_name": "African", "customer_rating": "5", "distance": "2", "name": "Presto Grill", "price": "40"},
      {"cuisine_id": "2", "cuisine_name": "Chinese", "customer_rating": "2", "distance": "2", "name": "Grill Tasty", "price": "30"},
      {"cuisine_id": "5", "cuisine_name": "French", "customer_rating": "4", "distance": "3", "name": "Cater Grill", "price": "50"},
      {"cuisine_id": "14", "cuisine_name": "Malaysian", "customer_rating": "3", "distance": "3", "name": "Grilltastic", "price": "30"}
    ]

    expect(output).toHaveBeenCalledWith(expected_data)
    expect(console_log_spy).toHaveBeenCalledWith('search succeeded.\n')
  })

  test('should search restaurants with name "Oranges" and call output with no results in an correct order', async () => {
    const search_term = 'name:Oranges'
    const console_log_spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await main(search_term)
    expect(output).toHaveBeenCalledWith([])
    expect(console_log_spy).toHaveBeenCalledWith('search succeeded.\n')
  })

  test('should search restaurants correctly with diferrent parameters', async () => {
    const search_term = 'name:deli,rating:4,distance:1,cuisine:Chinese'
    const console_log_spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await main(search_term)

    const expected_data = [{
      "cuisine_id": "2",
      "cuisine_name": "Chinese",
      "customer_rating": "4",
      "distance": "1",
      "name": "Deliciouszilla",
      "price": "15",
    }]
    expect(output).toHaveBeenCalledWith(expected_data)
    expect(console_log_spy).toHaveBeenCalledWith('search succeeded.\n')
  })

  test('should search restaurants with invalid parameters return an Invalid search parameters error', async () => {
    const searchTerm = 'test:test'
    const console_log_spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await main(searchTerm)
    expect(console_log_spy).toHaveBeenCalledWith('\nInvalid search parameters')
  })
})
