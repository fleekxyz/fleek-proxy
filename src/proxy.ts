import { Router } from './router';
import { FleekRequest, FleekResponse } from './types';

export interface Proxy {
  proxyRequest(req: FleekRequest): Promise<FleekResponse>;
}

export class DefaultProxy implements Proxy {
  constructor(private readonly router: Router) {}

  public async proxyRequest(req: FleekRequest): Promise<FleekResponse> {
    const route = this.router.match(req);

    if (!route) {
      return {
        status: 404,
        headers: {},
        body: 'Not found.',
      };
    }

    try {
      const url = new URL(route);
      Object.entries(req.query ?? {}).forEach(([key, value]) => url.searchParams.append(key, value));

      const response = await fetch(url.toString(), {
        method: req.method,
        headers: this.convertFleekHeaders(req.headers ?? {}),
        body: req.body,
        redirect: 'follow',
      });

      return {
        status: response.status,
        headers: this.convertFetchHeaders(response.headers),
        body: await response.text(),
      };
    } catch (error) {
      console.error('Error proxying request:', error);
      return {
        status: 500,
        headers: {},
        body: 'Internal server error.',
      };
    }
  }

  private convertFleekHeaders(headers: Record<string, string>): Record<string, string> {
    return Object.entries(headers).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {} as Record<string, string>,
    );
  }

  private convertFetchHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => (result[key] = value));
    return result;
  }
}
