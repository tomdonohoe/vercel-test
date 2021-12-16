import { v4 as uuidv4 } from 'uuid';

export class Identity {
    private clientId: string;
    private friendlyName: any;

    constructor(friendlyName: any) {
      this.clientId = uuidv4();
      this.friendlyName = friendlyName;
    }

    getClientId() {
        return this.clientId;
    }

    getfriendlyName() {
        return this.friendlyName;
    }
}
