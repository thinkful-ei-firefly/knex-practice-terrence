BEGIN;

INSERT INTO blogful_articles
    (title, date_published, content)
VALUES
  ('My Bread',               '2016-01-16 12:00:00',       'tell me about bread'),
  ('Cooking Eggs ',          '2016-05-01 15:00:00',       'I live my eggs over medium'),
  ('Day at beach',           '2017-02-22 12:00:00',       'dont bring sand'),
  ('Thunder buddies',        '2017-04-04 08:00:00',       'fuck you thunder'),
  ('World news ',            '2017-04-23 15:00:00',       'its a cold world'),
  ('Life not fair',          '2017-08-11 13:00:00',       'Play at your own risk'),
  ('Where I want to live ',  '2017-12-09 17:00:00',       'no place like home'),
  ('Most People are good',   '2018-01-24 19:00:00',       'but some are bad'),
  ('Describe your God',      '2018-01-29 11:00:00',       'all the glory'),
  ('I want to travel',       '2018-02-13 05:00:00',       'take me to Hong Kong'),
  ('Where not to travel ',   '2018-03-13 09:00:00',       'France'),
  ('Reduce Pain ',           '2018-03-31 13:00:00',       'Share and share alike'),
  ('Unfair Socialism',       '2019-04-03 07:00:00',       'the 1%'),
  ('Unfair capitalism',      '2019-05-05 21:00:00',       'all kinds of greed'),
  ('Religious views',        '2017-12-09 17:00:00',       'we were genetically engineered'),
  ('What news affects you',  '2017-12-09 17:00:00',       'Black lives matter'),
  ('Solve world problem',    '2017-12-09 17:00:00',       'no more hunger'),
  ('Run the country',        '2017-12-09 17:00:00',       'no more homeless'),
  ('Happy ending ',          '2017-12-09 17:00:00',       'Happily ever after'),
  ('What do you envy',       '2017-12-09 17:00:00',       'my own home');
    
COMMIT;