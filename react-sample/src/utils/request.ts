import env from "./env";

async function request<TResponse>(fullUrl: string, config: RequestInit = {}): Promise<TResponse> {
  try {
    const response = await fetch(fullUrl, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${(error as Error).message}`);
  }
}

export async function fetchJoke<TResponse>(endpoint: string, config: RequestInit = {}): Promise<TResponse> {
  const fullUrl = `${env("JOKE_API_BASE_URL")}${endpoint}`;
  const baseConfigs = {
    method: "GET",
    headers: {
      "x-rapidapi-key": env("JOKE_API_KEY"),
      "x-rapidapi-host": env("JOKE_API_HOST"),
    },
  };
  return await request(fullUrl, { ...baseConfigs, ...config });
}
