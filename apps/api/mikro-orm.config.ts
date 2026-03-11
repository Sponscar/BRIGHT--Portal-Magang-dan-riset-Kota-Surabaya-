import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import * as path from 'path';

const config: Options = {
    driver: PostgreSqlDriver,
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    dbName: process.env.DB_NAME || 'brida_magang',
    entities: ['./dist/entities/*.entity.js'],
    entitiesTs: ['./src/entities/*.entity.ts'],
    metadataProvider: TsMorphMetadataProvider,
    extensions: [Migrator],
    migrations: {
        path: path.join(__dirname, './migrations'),
        pathTs: path.join(__dirname, './src/migrations'),
    },
    debug: process.env.NODE_ENV === 'development',
};

export default config;
