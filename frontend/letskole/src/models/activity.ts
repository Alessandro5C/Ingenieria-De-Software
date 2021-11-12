export class Activity{
    id: number = 0;
    userId: number = 0;
    name: string = '';
    description: string = '';
    startDate: Date = new Date();
    endDate: Date = new Date(); 
    completed: boolean = false;
    startTime: Date = new Date();
    endTime: Date = new Date();
}