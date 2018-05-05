export class SysMessages {
    public static messages = [
        {
            id: 1,
            description: "Inclusão realizada com sucesso."
        }, {
            id: 2,
            description: "Alteração realizada com sucesso."
        }, {
            id: 3,
            description: "Exclusão realizada com sucesso."
        }, {
            id: 4,
            description: "Campo(s) obrigatório(s) não preenchido(s)."
        }
    ];

    public static get(id: Number): string {
        return this.messages.find(message => message.id === id).description;
    }
}