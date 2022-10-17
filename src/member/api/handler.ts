import {createLengthExtraData, validate} from "../../utils/request.ts";
import {error, success} from "../../utils/response.ts";
import {getMemberInfo, setMemberInfo} from "../service/member.ts";

export const signIn = async (request:Request):Promise<Response> => {
    const formData = await request.formData()
    const validationResult: boolean = validate(formData,[
        {key:"username",rule:"required"},
        {key:"password",rule:"required"},
        {key:"platform",rule:"required"},
        {key:"username",rule:"length",extra:createLengthExtraData({max:50,min:3})},
        {key:"password",rule:"length",extra:createLengthExtraData({max:50,min:3})},
        {key:"platform",rule:"length",extra:createLengthExtraData({max:50,min:3})}
    ])
    if(!validationResult){
        return error("validation error")
    }

    const username:string = <string>formData.get("username")
    const password:string = <string>formData.get("password")
    const platform:string = <string>formData.get("platform")

    const result = await getMemberInfo(platform,username)
    await setMemberInfo(platform,username)
    return success("sign in successfully",result)
}