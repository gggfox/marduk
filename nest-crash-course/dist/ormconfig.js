"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("./users/entities/user.entity");
const config = {
    type: 'sqlite',
    database: 'db',
    entities: [user_entity_1.User],
    synchronize: true,
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map