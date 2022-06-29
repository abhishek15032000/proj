import  {TYPES} from "../constants";

export const AUTH_ACTIONS={
    login:(data:any) => {
        return {
            type: TYPES.AUTH.LOGIN,
            payload: data,
          };
    }
}