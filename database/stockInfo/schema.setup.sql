-- For postgresql schema
CREATE TABLE stockInfo (
  id varchar(9),
  stockCompany varchar(40),
  stockId varchar(9),
  averageStock numeric(5,2),
  changePercent numeric(4,2),
  prices_day varchar(70),
  prices_week varchar(70),
  prices_month varchar(70),
  prices_threeMonth varchar(70),
  prices_year varchar(70),
  prices_fiveYear varchar(70),
  relatedTags_1 varchar(15),
  relatedTags_2 varchar(15),
  relatedTags_3 varchar(15),
  relatedTags_4 varchar(15),
  relatedTags_5 varchar(15),
  noOfOwners integer,
  recommendationPercent smallint
);

-- For copying into postgresql database
COPY stockinfo from '/Users/tlindow/repos/hack-reactor/stock-chart/database/csv/StockInfo.csv';

-- For cassandra nosql schema
create table stockinfo (
  id int PRIMARY KEY,
  stockCompany text,
  stockId int,
  averageStock float,
  changePercent float,
  prices_day text,
  prices_week text,
  prices_month text,
  prices_threeMonth text,
  prices_year text,
  prices_fiveYear text,
  relatedTags_1 text,
  relatedTags_2 text,
  relatedTags_3 text,
  relatedTags_4 text,
  relatedTags_5 text,
  noOfOwners int,
  recommendationPercent int
);

-- Copying into cassandra database
COPY stockinfo (id,
  stockCompany,
  stockId,
  averageStock,
  changePercent,
  prices_day,
  prices_week,
  prices_month,
  prices_threeMonth,
  prices_year,
  prices_fiveYear,
  relatedTags_1,
  relatedTags_2,
  relatedTags_3,
  relatedTags_4,
  relatedTags_5,
  noOfOwners,
  recommendationPercent) from '/Users/tlindow/repos/hack-reactor/stock-chart/database/csv/StockInfo.csv' with delimiter = ',' AND HEADER=false;