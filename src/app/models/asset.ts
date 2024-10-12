export class Asset {
    ID: number;
    name: string;
    path: string;
    icon: string;
    type: string;

    constructor(id: number, n: string, p: string, i: string, t: string) {
        this.ID = id;
        this.name = n;
        this.path = p;
        this.icon = i;
        this.type = t;
    }
}