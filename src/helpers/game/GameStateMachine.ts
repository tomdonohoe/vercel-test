export class NullMessageChannel {
    private sentMessages: any;

    constructor() {
        this.sentMessages = []
    }

    sendMessage(message: any, targetClientId: any) {
        this.sentMessages.push({ message, targetClientId });
    }
}

export class GameStateMachine {
    private steps: any;
    private context: any;
    private state: any;
    private currentStepKey: any;
    private msTracker: any;

    constructor(gameDefinition: any) {
        this.steps = gameDefinition.steps;
        this.context = gameDefinition.context || {};

        if (!this.context.channel) {
            this.context.channel = new NullMessageChannel();
        }

        this.state = {
            msInCurrentStep: 0,
        };

        this.resetCurrentStepKeepingState();
    }

    resetCurrentStepKeepingState() {
        this.currentStepKey = "StartHandler";
        this.msTracker = null;
    }

    currentStep() { return this.steps[this.currentStepKey]; }

    async run() {
        console.log("Invoking run()", this.currentStepKey);

        this.trackMilliseconds();

        const currentStep = this.currentStep();
        const response = await currentStep.execute(this.state, this.context);

        if (this.currentStepKey === "EndHandler" && (response === null || response.complete)) {
            return; // State machine exit signal
        }

        if (response == null) {
            throw Error("You must return a response from your execute functions so we know where to redirect to.");
        }

        this.currentStepKey = response.transitionTo;
        this.run();
    }

    async handleInput(input: any) {
        const currentStep = this.currentStep();
        if (currentStep.handleInput) {
            currentStep.handleInput(this.state, this.context, input);
        } else {
            console.log("Input received while no handler was available.");
        }
    }

    trackMilliseconds() {
        clearTimeout(this.msTracker);
        this.state.msInCurrentStep = 0;

        const interval = 5;
        this.msTracker = setInterval(() => {
            this.state.msInCurrentStep += interval;
        }, interval);
    }
}

export function waitUntil(condition: any, timeout: any) {
    return new Promise<void>((res, rej) => {

        if (condition()) {
            res();
            return;
        }

        let elapsed = 0;
        const pollFrequency = 10;
        let poll = setInterval(() => {

            if (condition()) {
                clearInterval(poll);
                res();
                return;
            }

            elapsed += pollFrequency;

            if (!timeout) {
                return;
            }

            if (elapsed >= timeout) {
                clearInterval(poll);
                rej("Timed out");
            }
        }, pollFrequency);

    });
}