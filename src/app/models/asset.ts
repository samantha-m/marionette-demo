export class Asset {
    ID: number;
    name: string;
    path: string;
    icon: string;
    file: string;
    type: string;

    constructor(id: number, n: string, p: string, i: string, f: string, t: string) {
        this.ID = id;
        this.name = n;
        this.path = p;
        this.icon = i;
        this.file = f;
        this.type = t;
    }
}