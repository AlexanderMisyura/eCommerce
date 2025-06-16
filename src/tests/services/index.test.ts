import { anonymousIdService, apiRoot, InMemoryTokenCache, LocalStorageTokenCache } from '@services';

describe('services', () => {
  it('exports anonymousIdService', () => {
    expect(anonymousIdService).toBeDefined();
  });

  it('exports apiRoot', () => {
    expect(apiRoot).toBeDefined();
  });

  it('exports InMemoryTokenCache', () => {
    expect(InMemoryTokenCache).toBeDefined();
  });

  it('exports LocalStorageTokenCache', () => {
    expect(LocalStorageTokenCache).toBeDefined();
  });
});
