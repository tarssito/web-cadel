export class Shifts {
    public static sifth = [
        {
            id: 'M',
            label: 'Matutino'
        },
        {
            id: 'V',
            label: 'Vespertino'
        },
        {
            id: 'N',
            label: 'Noturno'
        }
    ];

    public static get(id: string) {
        return this.sifth.find(sifth => sifth.id === id);
    }

    public static getAll() {
        return this.sifth;
    }
}