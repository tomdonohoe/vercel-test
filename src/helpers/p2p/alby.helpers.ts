const shouldHandleMessage = (message: any, metadata: any) => {
    let messageReceipients = message.forClientId?.constructor === Array ? message.forClientId : [message.forClientId];
    messageReceipients = messageReceipients.filter(mr => mr != null);
    return messageReceipients.length === 0 || messageReceipients.indexOf(metadata.clientId) > -1;
  }
  
export const handleMessagefromAbly = (message: any, metadata: any, p2pClient: any, p2pServer: any) => {
    if (shouldHandleMessage(message, metadata)) {
      p2pServer?.onReceiveMessage(message);
      p2pClient?.onReceiveMessage(message);
    }
}
