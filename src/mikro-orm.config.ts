import { Options } from '@mikro-orm/core';
import { Post } from "./entities/Post";
import { Students } from './entities/Students'
import { __prod__ } from "./constants";
import path from 'path';

const config: Options = {
    allowGlobalContext: true,
    migrations: {
        path: path.join(__dirname,"./migrations"),
        glob: '!(*.d).{js,ts}',
    },
    entities: [Post,Students],
    dbName: "lireddit",
    type: "postgresql",
    user:'dominon',
    password:'abc@123',
    debug : !__prod__,
};
export default config;