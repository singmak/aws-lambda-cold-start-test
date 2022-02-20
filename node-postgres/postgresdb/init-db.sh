#!/bin/bash

psql -h localhost -p 5432 -f ./create-db.sql -U postgres
psql -h localhost -p 5432 -f ./seed.sql -U postgres