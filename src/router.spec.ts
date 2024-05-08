import { DefaultRouter } from './router';

describe('Proxy Routes', function () {
  const proxyRules = new DefaultRouter({
    rules: {
      '.*/test': 'http://localhost:8080/cool',
      '.*/test2/': 'http://localhost:8080/cool2/',
      '/posts/([0-9]+)/comments/([0-9]+)': 'http://localhost:8080/p/$1/c/$2',
      '/author/([0-9]+)/posts/([0-9]+)/': 'http://localhost:8080/a/$1/p/$2/',
      '^/$': 'http://example.com/services/1/ipfs/default-cid/',
      '^/ssr$': 'http://example.com/services/1/ipfs/ssr-cid/ssr',
      '^/parallel$': 'http://example.com/services/1/ipfs/parallel-cid/parallel',
      '^/parallel/a\\-page$': 'http://example.com/services/1/ipfs/parallel-a-cid/parallel/a-page',
      '^/parallel/b\\-page$': 'http://example.com/services/1/ipfs/parallel-b-cid/parallel/b-page',
      '^/(_next|static|BUILD_ID|favicon.ico)': 'http://example.com/services/1/ipfs/asset-cid/$1',
    },
    default: 'http://localhost:4000',
  });

  it.each([
    {
      visitedPath: '/test',
      newUrlTarget: `http://localhost:8080/cool`,
    },
    {
      visitedPath: '/test/',
      newUrlTarget: `http://localhost:8080/cool/`,
    },
    {
      visitedPath: '/test',
      newUrlTarget: `http://localhost:8080/cool`,
    },
    {
      visitedPath: '/test2/yo',
      newUrlTarget: `http://localhost:8080/cool2/yo`,
    },
    {
      visitedPath: '/fuzzyshoe/test',
      newUrlTarget: `http://localhost:8080/cool`,
    },
    {
      visitedPath: '/test/seven',
      newUrlTarget: `http://localhost:8080/cool/seven`,
    },
    {
      visitedPath: '/testalmost',
      newUrlTarget: `http://localhost:4000/testalmost`,
    },
    {
      visitedPath: '/testalmost/5',
      newUrlTarget: `http://localhost:4000/testalmost/5`,
    },
    {
      visitedPath: '/posts/11/comments/12',
      newUrlTarget: `http://localhost:8080/p/11/c/12`,
    },
    {
      visitedPath: '/posts/11/comments/12/',
      newUrlTarget: `http://localhost:8080/p/11/c/12/`,
    },
    {
      visitedPath: '/posts/11/comments/12',
      newUrlTarget: `http://localhost:8080/p/11/c/12`,
    },
    {
      visitedPath: '/author/11/posts/12/',
      newUrlTarget: `http://localhost:8080/a/11/p/12/`,
    },
    {
      visitedPath: '/ssr',
      newUrlTarget: `http://example.com/services/1/ipfs/ssr-cid/ssr`,
    },
    {
      visitedPath: '/',
      newUrlTarget: `http://example.com/services/1/ipfs/default-cid/`,
    },
    {
      visitedPath: '/_next/data/favicon.ico',
      newUrlTarget: `http://example.com/services/1/ipfs/asset-cid/_next/data/favicon.ico`,
    },
    {
      visitedPath: '/favicon.ico',
      newUrlTarget: `http://example.com/services/1/ipfs/asset-cid/favicon.ico`,
    },
    {
      visitedPath: '/static/image.svg',
      newUrlTarget: `http://example.com/services/1/ipfs/asset-cid/static/image.svg`,
    },
  ])('should match $visitedPath to target $newUrlTarget', ({ visitedPath, newUrlTarget }) => {
    const target = proxyRules.match({
      path: visitedPath,
      method: 'Get',
      headers: {},
      query: {},
      body: '',
    });
    expect(target).toBe(newUrlTarget);
  });
});
