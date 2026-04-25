export class APIError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const API_BASE_URL = "https://zmrd.ondrejpetera.cz/api/v1";

interface FetchOptions extends RequestInit {
  query?: Record<string, string | number | boolean | undefined>;
}

/**
 * Centrální fetch wrapper pro veškerou komunikaci s API.
 * Automaticky přidává `x-api-key` a řeší serializaci queries a error handling.
 */
export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { query, headers, ...restOptions } = options;
  
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not defined in environment variables!");
  }

  // Sestavení URL včetně query parametrů
  let url = `${API_BASE_URL}${endpoint}`;
  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(apiKey ? { "x-api-key": apiKey } : {}),
        ...headers,
      },
    });

    if (!response.ok) {
      let errorMessage = `API Error: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData?.detail) {
          errorMessage = errorData.detail;
        }
      } catch (e) {
        // Body might not be JSON
      }
      throw new APIError(errorMessage, response.status);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof APIError) throw error;
    
    console.error(`Network Error [${options.method || 'GET'}] ${url}:`, error);
    throw new Error("Network connection failed. Please check your internet or API status.");
  }
}
