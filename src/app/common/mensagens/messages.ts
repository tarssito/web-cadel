export class SysMessages {
    public static messages = [{
        id: 1,
        description: "Inclusão realizada com sucesso."
    }];

    public static get(id: Number): string {
        return this.messages.find(message => message.id === id).description;
    }
}