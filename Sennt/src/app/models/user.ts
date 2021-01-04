export class User{
    constructor(
        public _id: string,
        public name,
        public email: string,
        public password: string,
        public image: string
    ){}
}