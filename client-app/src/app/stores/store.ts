import { createContext, useContext } from "react";
import ActvitvityStore from "./activityStore";


interface Store{
    activityStore:ActvitvityStore
}

export const store:Store={
    activityStore:new ActvitvityStore()
}

export const StoreContext=createContext(store);

export function useStore(){

   return useContext(StoreContext);
}
