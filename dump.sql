CREATE TYPE "roles" AS ENUM (
  'user',
  'admin'
);

CREATE TYPE "notification_types" AS ENUM (
  'user',
  'group',
  'everyone'
);

CREATE TABLE "groups" (
  "id" SERIAL PRIMARY KEY,
  "name" text
);

CREATE TABLE "notifications" (
  "id" SERIAL PRIMARY KEY,
  "n_type" notification_types,
  "content" text NOT NULL,
  "time" timestamp
);

CREATE TABLE "users_to_notifications" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "notification_id" int,
  "read" boolean
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text UNIQUE NOT NULL,
  "password" text,
  "role" roles
);

CREATE TABLE "users_to_groups" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "group_id" int
);

ALTER TABLE "users_to_groups" ADD FOREIGN KEY ("group_id") REFERENCES "groups" ("id") ON DELETE CASCADE;

ALTER TABLE "users_to_groups" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "users_to_notifications" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "users_to_notifications" ADD FOREIGN KEY ("notification_id") REFERENCES "notifications" ("id") ON DELETE CASCADE;
