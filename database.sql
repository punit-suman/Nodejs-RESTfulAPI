DROP DATABASE IF EXISTS noderest;

CREATE DATABASE noderest;

\c noderest;

CREATE TABLE users(
    userid SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    CITY TEXT NOT NULL
);