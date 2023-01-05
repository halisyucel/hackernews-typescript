import * as dotenv from 'dotenv-flow';

dotenv.config({
  node_env: process.env.NODE_ENV || 'development',
});
