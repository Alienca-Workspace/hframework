export interface ExtraData{}
export interface LengthExtraData extends ExtraData{
    min: number
    max: number
}

export const createLengthExtraData = (lengthExtraData:LengthExtraData):LengthExtraData => {
    return {
        min: lengthExtraData.min,
        max: lengthExtraData.max,
    }
}

export interface ValidationData<ExtraData> {
    key: string
    rule: string
    extra?: ExtraData
}

export const validate = (formData:FormData,validationData: ValidationData<ExtraData>[]): boolean => {
    let flag = true
    for (let i = 0;i<validationData.length;i++){
        if(validationData[i].rule === "required"){
            if(!formData.get(validationData[i].key)){
                return false
            }
        }
        formData.forEach((value,key) => {
            if(key === validationData[i].key && validationData[i].rule == "length"){
                if((<string>value).length < (<LengthExtraData>validationData[i].extra).min || (<string>value).length > (<LengthExtraData>validationData[i].extra).max){
                    flag = false
                }
            }
        })
    }

    return flag
}