"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220317150433 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220317150433 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "students" ("_id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "name" text not null, "score" int not null);');
        this.addSql('alter table "post" drop constraint if exists "post_created_at_check";');
        this.addSql('alter table "post" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
        this.addSql('alter table "post" alter column "created_at" set default \'NOW()\';');
        this.addSql('alter table "post" drop constraint if exists "post_updated_at_check";');
        this.addSql('alter table "post" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
        this.addSql('alter table "post" alter column "updated_at" set default \'NOW()\';');
    }
    async down() {
        this.addSql('drop table if exists "students" cascade;');
        this.addSql('alter table "post" drop constraint if exists "post_created_at_check";');
        this.addSql('alter table "post" alter column "created_at" drop default;');
        this.addSql('alter table "post" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
        this.addSql('alter table "post" drop constraint if exists "post_updated_at_check";');
        this.addSql('alter table "post" alter column "updated_at" drop default;');
        this.addSql('alter table "post" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    }
}
exports.Migration20220317150433 = Migration20220317150433;
//# sourceMappingURL=Migration20220317150433.js.map