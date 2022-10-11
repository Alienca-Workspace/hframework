import {createLengthExtraData, ExtraData, validate, ValidationData} from "../../utils/request.ts";
import {error, success} from "../../utils/response.ts";

export const getUserInfo = async (request:Request):Promise<Response> => {
    const result: boolean = validate(await request.formData(),[
        {key:"username",rule:"required"},
        {key:"username",rule:"length",extra:createLengthExtraData({max:10,min:5})},
        {key:"email",rule:"required"}
    ])
    if (!result){
        return error("validation error")
    }
    return success("okkk!",{})
}