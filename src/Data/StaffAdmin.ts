export class StaffAdmin {
    id: number | undefined;
    name: string ="";
    department: string="";

    get isNew(): boolean {
        return this.id === undefined
    }

    constructor(initializer?:any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.name) this.name = initializer.name;
        if(initializer.department) this.department = initializer.department;
    }
}