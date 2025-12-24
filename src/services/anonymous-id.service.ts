const ANONYMOUS_ID_KEY = 'the-team-e-commerce-anonymous-id';

class AnonymousIdService {
  public getAnonymousId(): string {
    let anonymousId = localStorage.getItem(ANONYMOUS_ID_KEY);

    if (!anonymousId) {
      anonymousId = crypto.randomUUID();
      localStorage.setItem(ANONYMOUS_ID_KEY, anonymousId);
    }

    return anonymousId;
  }

  public resetAnonymousId(): void {
    localStorage.removeItem(ANONYMOUS_ID_KEY);
  }

  public isAnonymousIdExist(): boolean {
    return Boolean(localStorage.getItem(ANONYMOUS_ID_KEY));
  }
}

export const anonymousIdService = new AnonymousIdService();
