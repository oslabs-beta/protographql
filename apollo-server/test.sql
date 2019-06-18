CREATE TABLE "Author" (
  id serial PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR
);

CREATE TABLE "Books" (
  id serial PRIMARY KEY,
  name VARCHAR,
  author_id INTEGER
);

INSERT INTO "Author" (first_name, last_name)
VALUES
  ('JK', 'Rowling'),
  ('Thomas', 'Jack'),
  ('Kobe', 'Bryant');

INSERT INTO "Books" (name, author_id)
VALUES
  ('Harry Potter Chamber of Secrets', 1),
  ('Harry Potter Goblet of Fire', 1),
  ('New Book Title', 2),
  ('Lakers', 3);