

export class StartHandler {
    async execute(state: any, context: any) {
        console.log(state);
        console.log(context);
        console.log('handing over to next step')
        return { transitionTo: "EndHandler" };
    }
}

export class EndHandler {
    async execute(state: any, context: any) {
        console.log(state);
        console.log(context);
        console.log('game end')
        return { complete: true };
    }
}
