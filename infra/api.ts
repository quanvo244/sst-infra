import {table} from './storage'
// Create new api

export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link:[table]
      }
    }
  }
});
api.route("POST /notes", "packages/function/src/notes/create.main");