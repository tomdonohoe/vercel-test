import Ably from 'ably/promises';

export class PubSubClient {
    private connected: boolean;
    private metadata!: any;
    private channel!: any;
    private onMessageReceivedCallback!: any;

    constructor() {
      this.connected = false;
    }
  
    async connect(identity: any, uniqueId: any) {
      if (this.connected) return;
  
      this.metadata = { uniqueId: uniqueId, ...identity };
  
      const ably = new Ably.Realtime.Promise({ authUrl: '/api/ably-token/token' });
      this.channel = ably.channels.get(`p2p-sample-${uniqueId}`, { params: { rewind: '1m' } });
  
      await this.channel.subscribe((message: any) => {
        this.onMessageReceivedCallback(message.data, this.metadata);
      });
  
      this.connected = true;
    }
  
    sendMessage(message: any, targetClientId: any) {
      if (!this.connected) {
        throw Error("Client is not connected");
      }
  
      message.metadata = this.metadata;
      message.forClientId = targetClientId ? targetClientId : null;
      this.channel.publish({ name: "myMessageName", data: message });
    }

    setOnMessageReceivedCallback(onMessageReceivedCallback: any) {
      this.onMessageReceivedCallback = onMessageReceivedCallback;
    }
}
