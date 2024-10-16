const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

// Sample data
const words = [
  { spanish: 'anguila', english: 'eel' },
  { spanish: 'caballito de mar', english: 'seahorse' },
  { spanish: 'medusa', english: 'jellyfish' },
  { spanish: 'foca', english: 'seal' },
  { spanish: 'nutria', english: 'otter' },
  { spanish: 'morsa', english: 'walrus' },
  { spanish: 'león marino', english: 'sea lion' },
  { spanish: 'pingüino', english: 'penguin' },
  { spanish: 'pulpo', english: 'octopus' },
  { spanish: 'langosta', english: 'lobster' },
  { spanish: 'cangrejo', english: 'crab' },
  { spanish: 'gaviota', english: 'seagull' },
  { spanish: 'pelícano', english: 'pelican' },
  { spanish: 'camarón', english: 'shrimp' },
  { spanish: 'mantarraya', english: 'manta ray' },
  { spanish: 'almeja', english: 'clam' },
];

// GraphQL schema
const schema = buildSchema(`
  type Word {
    spanish: String
    english: String
  }

  type Query {
    words: [Word]
  }
`);

// Root resolver
const root = {
  words: () => words,
};

const app = express();
app.use(cors()); 
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () =>
  console.log('Server running on http://localhost:4000/graphql')
);
