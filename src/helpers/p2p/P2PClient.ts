import { VercelTestClient } from "../game/VercelTest";

export class P2PClient {
    private identity: any;
    private uniqueId: any;
    private ably: any;
    private state: any;
    private vercelTest: any;
    private serverState: any;

  constructor(identity: any, uniqueId: any, ably: any) {
    this.identity = identity;
    this.uniqueId = uniqueId;
    this.ably = ably;

    this.vercelTest = null;
    this.serverState = null;

    this.state = {
      status: "disconnected",
      instructionHistory: [],
      lastInstruction: null
    };
  }

  async connect() {
    await this.ably.connect(this.identity, this.uniqueId);
    this.ably.sendMessage({ kind: "connected" });
    this.state.status = "awaiting-acknowledgement";
    this.vercelTest = new VercelTestClient(this.uniqueId, this.ably);
  }

  onReceiveMessage(message: any) {
    if (message.serverState) {
      this.serverState = message.serverState;
    }

    switch (message.kind) {
      case "connection-acknowledged":
        this.state.status = "acknowledged";
        break;
      case "instruction":
        this.state.instructionHistory.push(message);
        this.state.lastInstruction = message;
        break;
    }
  }
}