# Restaurant search engine study algorithm

### Requirements
- Node.js LTS

### Initialization
- Command to initialize the program
```
yarn start
```

### Input instructions 
You can search by restaurant **name**, **distance**, **rating**, **price** and **cuisine**.
You don't need to provide all fields to search, but you need to use comma to
seperate your input.
Like if you want to search with name and rating this is the correct input:
`name:Pizza,rating:5`

### Tests
- Command to run integration tests
```
yarn test
```

----
## What would be good to improve
- Improve test coverage
- Use Typescript
- Provide "CLI mode", instead of use stdin
- Isolate main function to only call search engine functions