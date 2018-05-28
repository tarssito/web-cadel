export class Weekdays {
    public static weekdays = [
        {
            id: 2,
            label: 'Segunda-feira'
        },
        {
            id: 3,
            label: 'Terça-feira'
        },
        {
            id: 4,
            label: 'Quarta-feira'
        },
        {
            id: 5,
            label: 'Quinta-feira'
        },
        {
            id: 6,
            label: 'Sexta-feira'
        },
        {
            id: 7,
            label: 'Sábado'
        }
    ];

    public static get(id: number) {
        return this.weekdays.find(weekday => weekday.id === id);
    }

    public static getAll() {
        return this.weekdays;
    }
}