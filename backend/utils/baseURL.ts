import * as Network from 'expo-network';

let cachedURL: string | null = null;

export async function getBaseURL(): Promise<string> {
  if (cachedURL) return cachedURL;

  try {
    const ipResult: any = await Network.getIpAddressAsync();
    const ip = typeof ipResult === 'string' ? ipResult : ipResult._j;
    cachedURL = `http://${ip}:3000`;
    return cachedURL;
  } catch (err) {
    console.error('Erro ao obter IP:', err);
    throw err; 
  }
}
