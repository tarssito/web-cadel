export class States {
    public static states = [
        {
            id: 'P',
            value: 'Pendente',
            color: '#ecac19'
        },
        {
            id: 'A',
            value: 'Aberta',
            color: 'green'
        },
        {
            id: 'F',
            value: 'Fechada',
            color: 'red'
        },
        {
            id: 'R',
            value: 'Registrada',
            color: 'gray'
        }
    ];

    public static get(id: string) {
        return this.states.find(state => state.id === id);
    }
}