// API service for retail backend communication
import type {
  Zone,
  Product,
  Metrics,
  MoveRequestBody,
  ZoneStateResponse,
} from "../types/retail";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  async request<T>(path: string, opts: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = {};

    if (opts.headers) {
      Object.entries(opts.headers).forEach(([key, value]) => {
        headers[key] = String(value);
      });
    }

    if (opts.body && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    const options: RequestInit = {
      ...opts,
      headers,
    };

    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        const text = await res.text();
        throw new ApiError(`${res.status} ${res.statusText}: ${text}`);
      }
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        return res.json() as Promise<T>;
      }
      return res.text() as Promise<T>;
    } catch (err) {
      console.error("API Error:", err);
      throw err instanceof ApiError ? err : new ApiError(String(err));
    }
  }

  // Zone endpoints
  async getZones() {
    return this.request<Zone[]>("/zones");
  }

  async getZoneLayout(zoneId: string) {
    return this.request<{ layout: string[] }>(`/zones/${zoneId}/layout`);
  }

  async getZoneMetrics(zoneId: string) {
    return this.request<Metrics>(`/zones/${zoneId}/metrics`);
  }

  async predictBestPlacement(zoneId: string) {
    return this.request<ZoneStateResponse>(`/zones/${zoneId}/predict`, {
      method: "POST",
    });
  }

  async clearZone(zoneId: string) {
    return this.request<ZoneStateResponse>(`/zones/${zoneId}/clear`, {
      method: "POST",
    });
  }

  async moveProduct(zoneId: string, body: MoveRequestBody) {
    return this.request<ZoneStateResponse>(`/zones/${zoneId}/move`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  // Product endpoints
  async getProducts(params: {
    zone_id?: string;
    q?: string;
    cat?: string;
    sort?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params.zone_id) searchParams.set("zone_id", params.zone_id);
    if (params.q) searchParams.set("q", params.q);
    if (params.cat) searchParams.set("cat", params.cat);
    if (params.sort) searchParams.set("sort", params.sort);
    return this.request<Product[]>(`/products?${searchParams.toString()}`);
  }
}
