import { fakerFR as faker } from '@faker-js/faker';

export const getFakeUsername = (): string => {
  let username = `${faker.animal.type()} ${faker.word.adjective()}`;
  username = username.charAt(0).toUpperCase() + username.slice(1);
  return username;
};
