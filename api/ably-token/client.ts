import Ably from 'ably/promises';

if (!process.env.ABLY_API_KEY) {
    throw new Error('you must define ABLY_API_KEY as environment variable');
};

export const createTokenRequest = async () => {
    const client = new Ably.Realtime(process.env.ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'vercel-test' });

    return tokenRequestData
}
