import { DefaultProxy, Proxy } from './proxy';
import { DefaultRouter, RouterConfig } from './router';

export { RouterConfig, Rules as Routes, Router } from './router';
export { Proxy } from './proxy';
export { HttpMethod, FleekRequest, FleekResponse } from './types';

export function createProxy(config: RouterConfig): Proxy {
  return new DefaultProxy(new DefaultRouter(config));
}
