module.exports = `
  fragment R on ResultSet {
    id
    userId
    dateTime
    results {
      id
      question {
        id
      }
      answer {
        id
      }
    }
  }
`