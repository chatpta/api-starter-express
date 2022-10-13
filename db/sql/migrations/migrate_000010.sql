BEGIN;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS Users
(
    user_id    uuid               DEFAULT uuid_generate_v4() PRIMARY KEY,

    first_name text,
    last_name  text,
    main_body  json,
    roles      text[]             DEFAULT '{ user }',

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS Items
(
    item_id     uuid               DEFAULT uuid_generate_v4() PRIMARY KEY,

    title       text,
    description text,
    main_body   json,

    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_timestamp
    BEFORE UPDATE
    ON Users
    FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE OR REPLACE TRIGGER set_timestamp
    BEFORE UPDATE
    ON Items
    FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
COMMIT;
