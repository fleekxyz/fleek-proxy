import { FleekRequest } from './types';

export type Rules = Record<string, string>;

export interface RouterConfig {
  readonly rules: Rules;
  readonly default?: string;
}

export interface Router {
  match(req: FleekRequest): string | null;
}

export class DefaultRouter implements Router {
  private readonly rules: Rules;
  private readonly default: string | null;

  constructor(readonly config: RouterConfig) {
    this.rules = config.rules;
    this.default = config.default || null;
  }

  match(req: FleekRequest): string | null {
    const path = req.path;

    for (const pattern in this.rules) {
      let regex: RegExp;
      if (pattern.endsWith('/')) {
        regex = new RegExp(`^${pattern}($|.*)`);
      } else {
        regex = new RegExp(`^${pattern}(/?$|/.*)`);
      }

      if (regex.test(path)) {
        const exec = regex.exec(path);
        const tail = exec ? `$${exec.length - 1}` : '';
        let replacedPath = path.replace(regex, this.rules[pattern] + tail);
        replacedPath = replacedPath.replace(/\$(\d+)/g, (match, number) => {
          const matchGroup = regex.exec(path);
          return matchGroup ? matchGroup[number] : match;
        });

        if (path.endsWith('/') && !replacedPath.endsWith('/')) {
          replacedPath += '/';
        } else if (!path.endsWith('/') && replacedPath.endsWith('/')) {
          replacedPath = replacedPath.slice(0, -1);
        }

        return replacedPath;
      }
    }

    if (this.default) {
      const defaultUrl = this.default.endsWith('/') ? this.default : this.default + '/';
      return defaultUrl + (path.startsWith('/') ? path.slice(1) : path);
    }

    return null;
  }
}
