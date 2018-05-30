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
        }, {
            id: 11,
            description: "Não é possível excluir, existem dados vinculados a este registro."
        }, {
            id: 12,
            description: "É necessário incluir no mínimo 1 (um) aluno na turma."
        }, {
            id: 13,
            description: "Aluno já vinculado."
        }, {
            id: 14,
            description: "É necessário incluir no mínimo 1 (um) curso para a disciplina."
        }, {
            id: 15,
            description: "É necessário incluir no mínimo 1 (uma) disciplina para o professor."
        }, {
            id: 16,
            description: "É necessário incluir no mínimo 1 (uma) turma para a classe."
        }, {
            id: 17,
            description: "O campo sigla deve conter 5 caracteres."
        }, {
            id: 18,
            description: "Não há aula(s) cadastrada(s) para hoje."
        }, {
            id: 19,
            description: "Dados inválidos. Por favor, tente novamente."
        }, {
            id: 20,
            description: "Ocorreu um erro na execução do serviço."
        }, {
            id: 21,
            description: "Aula aberta com sucesso."
        }, {
            id: 22,
            description: "Aula salva com sucesso."
        }
    ];

    public static get(id: Number): string {
        return this.messages.find(message => message.id === id).description;
    }
}