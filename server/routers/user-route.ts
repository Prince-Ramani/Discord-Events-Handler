import { currentUser } from "@clerk/nextjs/server";
import { procedure, router } from "../trpc";


export const userRouter = router({
    getUserSyncStatus : procedure.query(async()=>{
        const user = await currentUser();
       
        return ({isSynced : !!user})
    })
})
