module.exports = `
  fragment R on Result {
    id
    question {
      id
      correctAnswer {
        id
      }
    }
    answer {
      id
    }
  }
`