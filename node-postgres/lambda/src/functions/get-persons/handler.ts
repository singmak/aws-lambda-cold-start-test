import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import knex, { Knex } from 'knex';
import KnexPosgres from 'knex/lib/dialects/postgres';

import schema from './schema';

type Person = {
  id: number;
  name: string;
  created_at: string;
}

const config: Knex.Config = {
  client: KnexPosgres,
  connection: 'postgresql://postgres:password@localhost:5432/postgres'
};

const knexInstance = knex(config);

const getPersons: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const persons = await knexInstance<Person>('person').select('*');
  return formatJSONResponse({
    persons,
  });
};

export const main = middyfy(getPersons);
