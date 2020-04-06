"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Level",
    embedded: false
  },
  {
    name: "Question",
    embedded: false
  },
  {
    name: "Answer",
    embedded: false
  },
  {
    name: "Result",
    embedded: false
  },
  {
    name: "ResultSet",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/baptiste-menard-24df76/js_quiz/dev`
});
exports.prisma = new exports.Prisma();
