export class Visitor {
    id: number | undefined;
    name:string = '';
    timeIn: Date = new Date();
    timeOut: Date = new Date();
    tagIssue: string = '';
    tagReturned:boolean = false;
    get isNew(): boolean {
        return this.id === undefined;
    }


constructor(initializer?:any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.timeIn) this.timeIn = initializer.timeIn;
    if (initializer.timeOut) this.timeOut = initializer.timeOut;
    if (initializer.tagIssue) this.tagIssue = initializer.tagIssue;
    if (initializer.tagReturned) this.tagReturned = initializer.tagReturned;
    }   
}