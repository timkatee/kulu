export interface InMemCache {
  set: (key: string, value: any, options?: any) => Promise<any>;
  get: (key: string) => Promise<any>;
  del: (key: string) => Promise<any>;
  reset: () => Promise<any>;
  store: () => any;
}
