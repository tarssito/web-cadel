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
        }, {
            id: 5,
            description: "E-mail inválido."
        }, {
            id: 6,
            description: "CPF inválido."
        }, {
            id: 7,
            description: "A pesquisa não retornou registro(s)."
        }, {
            id: 8,
            description: "Registro já cadastrado."
        }, {
            id: 9,
            description: "O número de matrícula deve ser maior que zero."
        }, {
            id: 10,
            description: "A carga horária deve ser maior que zero."
        } 
    ];

    public static get(id: Number): string {
        return this.messages.find(message => message.id === id).description;
    }
}