//creamos una clase para tener llenar los datos e imitirlo a la API
export class ProjectModel{
    constructor(
        public _id:string,
        public name:string,
        public description:string,
        public category:string,
        public technology:string,
        public image:string
    ){

    }
}