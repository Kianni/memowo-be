import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import cors from 'cors';

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


// {
//   words {
//     spanish
//     english
//   }
// }
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

// CORS configuration
const allowedOrigins = [
  'https://memowo-fe-bmeed5dkbpcre6e6.canadacentral-01.azurewebsites.net',
  'http://localhost:3000'
];

const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST',
    credentials: true,
  })
);

// Root route
app.get('/', (req, res) => {
  res.send('Hola, mundo');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log('Server running on http://localhost:4000/graphql')
);

// At the end of server.js
export default app;
