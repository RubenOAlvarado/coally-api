export class Task {
    constructor(
        public id: string,
        public title: string, 
        public description: string, 
        public isCompleted: boolean,
        public createdAt: Date,
    ) {}
}