import { folders, foldersRelations } from '../schema/folders';
import { users, usersRelations } from '../schema/users';
// export all schema here so we can utilize using the drizzle query
const models = {
 folders,
 users,
};

const relations = {
  ...foldersRelations,
  ...usersRelations,
};

const schema = {
  ...models,
  ...relations,
};

export default schema;