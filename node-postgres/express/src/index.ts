import express from 'express';
import knex, { Knex } from 'knex';

const app = express();

app.use(express.json());

type Person = {
  id: number;
  name: string;
  created_at: string;
}

const config: Knex.Config = {
  client: 'pg',
  connection: 'postgresql://postgres:password@localhost:5432/postgres'
};

const knexInstance = knex(config);

app.get('/', (req, res) => {
    res.send('Well done!');
});

app.get('/persons', async (req, res) => {
  try {
    const persons = await knexInstance<Person>('person').select('*');
    res.send(persons);
  } catch (err: unknown) {
    // error handling
    res.status(500);
    res.send((err as Error).message);
  }
});

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});