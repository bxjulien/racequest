import { fakerFR as faker } from '@faker-js/faker';

export const getFakeUsername = (): string => {
  let animal = faker.animal.type();
  animal = animal.charAt(0).toUpperCase() + animal.slice(1);
  let adjective = faker.word.adjective();
  adjective = adjective.charAt(0).toUpperCase() + adjective.slice(1);

  const username = `${animal}${adjective}`;
  return username;
};
