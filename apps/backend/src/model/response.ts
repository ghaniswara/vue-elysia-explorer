import { t , type TSchema} from 'elysia';


export function createResponseSchema<T extends TSchema>(dataSchema: T) {
  return t.Object({
    status: t.Number(),
    message: t.String(),
    data: dataSchema
  });
}