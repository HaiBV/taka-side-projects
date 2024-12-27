import env from "src/utils/env";

export default async function request<TResponse>(url: string, config: RequestInit = {}): Promise<TResponse> {
  try {
    const baseConfigs = {
      method: "GET",
      headers: {
        "x-rapidapi-key": env("JOKE_API_KEY"),
        "x-rapidapi-host": env("JOKE_API_HOST"),
      },
    };
    const response = await fetch(`${env("JOKE_API_BASE_URL")}${url}`, { ...baseConfigs, ...config });
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch data: ${(error as Error).message}`);
  }
}
