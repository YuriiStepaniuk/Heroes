import { apiConfig } from '../config/configuration';
import { HttpMethod } from '../enums/HttpMethods';

class ApiService {
  private static async request<T>(
    endpoint: string,
    method: HttpMethod,
    body?: object
  ): Promise<T> {
    try {
      const response = await fetch(`${apiConfig.BASE_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error('API request error:', error);
      throw new Error(error instanceof Error ? error.message : 'Network error');
    }
  }

  static async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, HttpMethod.GET);
  }

  static async post<T>(endpoint: string, body: object): Promise<T> {
    return this.request<T>(endpoint, HttpMethod.POST, body);
  }

  static async put<T>(endpoint: string, body: object): Promise<T> {
    return this.request<T>(endpoint, HttpMethod.PUT, body);
  }

  static async patch<T>(endpoint: string, body: object): Promise<T> {
    return this.request<T>(endpoint, HttpMethod.PATCH, body);
  }

  static async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, HttpMethod.DELETE);
  }

  static async uploadImage(endpoint: string, formData: FormData) {
    try {
      const response = await fetch(`${apiConfig.BASE_URL}${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API image upload error:', error);
      throw error;
    }
  }
}

export default ApiService;
