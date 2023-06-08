CREATE OR REPLACE TABLE traces (
    id SERIAL PRIMARY KEY,
    closing_at TIMESTAMPZ not null,
    direction VARCHAR(50) not null,
    distance NUMERIC not null,
    elevation JSONB not null,
    geojson JSONB not null,
    geohash geography(POINT) not null,
    latitude_center NUMERIC not null,
    latitude_start NUMERIC not null,
    longitude_center NUMERIC not null,
    longitude_start NUMERIC not null
);

CREATE INDEX traces_geohash_index
  ON public.traces
  USING GIST (geohash);
