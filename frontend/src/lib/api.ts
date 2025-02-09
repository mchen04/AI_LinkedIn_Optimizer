const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface ApiResponse<T> {
  status: 'success' | 'fail' | 'error';
  data?: T;
  message?: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    settings: {
      preferredAIProvider: string;
      emailNotifications: boolean;
    };
  };
  token: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  private getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  async register(email: string, password: string, name: string): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  async uploadPDF(file: File): Promise<ApiResponse<{ url: string; id: string }>> {
    const formData = new FormData();
    formData.append('pdf', file);

    return this.request('/api/pdf/upload', {
      method: 'POST',
      headers: {
        // Remove Content-Type to let browser set it with boundary
        'Content-Type': undefined as any,
      },
      body: formData,
    });
  }

  async analyzePDF(pdfId: string): Promise<ApiResponse<{ suggestions: string[]; provider: string }>> {
    return this.request(`/api/pdf/${pdfId}/analyze`, {
      method: 'POST',
    });
  }
}

export const api = new ApiClient();
