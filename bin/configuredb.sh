#!/bin/bash

dropdb -U node_user invoicesdb
createdb -U node_user invoicesdb

database= "invoicesdb";

echo "Creating database: $database";

psql -U node_user invoicesdb < ./bin/sql/invoicesdb.sql;

echo "Database $database created";



