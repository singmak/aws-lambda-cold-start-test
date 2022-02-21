import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import knex, { Knex } from 'knex';
import KnexPosgres from 'knex/lib/dialects/postgres';

import schema from './schema';

const { DB_CONNECTION } = process.env;

type Person = {
  id: number;
  name: string;
  created_at: string;
}

const config: Knex.Config = {
  client: KnexPosgres,
  connection: DB_CONNECTION,
};

const knexInstance = knex(config);

const getPersons: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const persons = await knexInstance<Person>('person').select('*');
  return formatJSONResponse({
    persons,
  });
};

export const main = middyfy(getPersons);
