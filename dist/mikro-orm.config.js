"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("./entities/Post");
const Students_1 = require("./entities/Students");
const User_1 = require("./entities/User");
const constants_1 = require("./constants");
const path_1 = __importDefault(require("path"));
const config = {
    allowGlobalContext: true,
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        glob: '!(*.d).{js,ts}',
    },
    entities: [Post_1.Post, Students_1.Students, User_1.User],
    dbName: "lireddit",
    type: "postgresql",
    user: 'dominon',
    password: 'abc@123',
    debug: !constants_1.__prod__,
};
exports.default = config;
//# sourceMappingURL=mikro-orm.config.js.map