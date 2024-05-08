export type HttpMethod = 'Get' | 'Head' | 'Post' | 'Put' | 'Delete' | 'Connect' | 'Options' | 'Trace' | 'Patch';

export type FleekRequest = {
  readonly method: HttpMethod;
  readonly headers?: Record<string, string>;
  readonly path: string;
  readonly query?: Record<string, string>;
  readonly body: string;
};

export type FleekResponse = {
  readonly status: number;
  readonly headers: Record<string, string>;
  readonly body: string;
};
