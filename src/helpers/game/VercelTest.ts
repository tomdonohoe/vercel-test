import { GameStateMachine } from './GameStateMachine';
import {
    StartHandler,
    EndHandler,
} from "./VercelTest.handlers";

export const VercelTest = (handlerContext: any) => new GameStateMachine({
  steps: {
    "StartHandler": new StartHandler(),
    "EndHandler": new EndHandler(),
  },
  context: handlerContext
});

export class VercelTestClient {
    private gameId: any;
    private channel: any;

  constructor(gameId: any, channel: any) {
    this.gameId = gameId;
    this.channel = channel;
  }

//   async sendImage(base64EncodedImage) {
//     const result = await fetch("/api/storeImage", {
//       method: "POST",
//       body: JSON.stringify({ gameId: this.gameId, imageData: base64EncodedImage })
//     });

//     const savedUrl = await result.json();
//     this.channel.sendMessage({ kind: "drawing-response", imageUrl: savedUrl.url });
//   }

//   async sendCaption(caption) {
//     this.channel.sendMessage({ kind: "caption-response", caption: caption });
//   }

//   async logVote(id) {
//     this.channel.sendMessage({ kind: "pick-one-response", id: id });
//   }

//   async hostProgressedVote() {
//     this.channel.sendMessage({ kind: "skip-scoring-forwards" })
//   }
}