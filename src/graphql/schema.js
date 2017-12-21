import { mergeSchemas } from "graphql-tools";

import UserRoleSchema from "./userRoles/schema";
import UserSchema from "./user/schema";

export default mergeSchemas({
  schemas: [UserRoleSchema, UserSchema]
});
