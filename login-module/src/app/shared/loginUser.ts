export class loginUser {
    constructor(
        public email: string,
        public password: string,
        public buildingName: string,
        public roomNumber: number,
        public city: string,
        public state: string,
        public pin: number
    ) {}
}