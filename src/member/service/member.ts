export const getMemberInfo = async (platform: string,username: string):Promise<any> => {
    return {
        platform:platform,
        username:username
    }
}