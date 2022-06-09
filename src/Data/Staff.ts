export class Staff {
        id: number | undefined;
        day: Date = new Date(0);
        name:string = '';
        department:string ='';
        meetingRoom:string ='';
        timeIn: string='';
        timeOut: string='';
        tagIssue: string = '';
        tagReturned:boolean = false;
        get isNew(): boolean {
            return this.id === undefined;
        }


    constructor(initializer?:any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.name) this.name = initializer.name;
        if (initializer.department) this.department = initializer.department;
        if (initializer.meetingRoom) this.meetingRoom = initializer.meetingRoom;
        if (initializer.timeIn) this.timeIn = initializer.timeIn;
        if (initializer.timeOut) this.timeOut = initializer.timeOut;
        if (initializer.tagIssue) this.tagIssue = initializer.tagIssue;
        if (initializer.tagReturned) this.tagReturned = initializer.tagReturned;
        }   
}