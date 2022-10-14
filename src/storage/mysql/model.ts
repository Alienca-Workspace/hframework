export class Model{
    static _instance:any = null
    constructor() {}

    getInstance():Model{
        if(Model._instance === null){
            Model._instance = new Model()
        }
        return <Model>Model._instance
    }
}