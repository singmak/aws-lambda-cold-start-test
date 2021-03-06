import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import getPersons from '@functions/get-persons';

const { DB_CONNECTION } = process.env;

const serverlessConfiguration: AWS = {
  service: 'lambda',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DB_CONNECTION, 
    },
  },
  // import the function via paths
  functions: { hello, getPersons },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
      external: ['pg', 'pg-query-stream']
    },
  },
};

module.exports = serverlessConfiguration;
