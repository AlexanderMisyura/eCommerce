import { anonymousIdService } from '@services';

const ANONYMOUS_ID_KEY = 'the-team-e-commerce-anonymous-id';

const idRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

describe('AnonymousIdService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should generate a new anonymous ID when not set in local storage', () => {
    const id = anonymousIdService.getAnonymousId();
    expect(id).toMatch(idRegex);
    expect(localStorage.getItem(ANONYMOUS_ID_KEY)).toBe(id);
  });

  it('should return the existing anonymous ID when set in local storage', () => {
    const existingId = '123e4567-e89b-12d3-a456-426655440000';
    localStorage.setItem(ANONYMOUS_ID_KEY, existingId);
    const id = anonymousIdService.getAnonymousId();
    expect(id).toBe(existingId);
  });

  it('should return a valid UUID', () => {
    const id = anonymousIdService.getAnonymousId();
    expect(id).toMatch(idRegex);
  });

  it('should remove the anonymous ID from local storage', () => {
    anonymousIdService.resetAnonymousId();
    expect(localStorage.getItem(ANONYMOUS_ID_KEY)).toBeNull();
  });

  it('should check if the anonymous ID exists in local storage', () => {
    expect(anonymousIdService.isAnonymousIdExist()).toBe(false);
    localStorage.setItem(ANONYMOUS_ID_KEY, '123e4567-e89b-12d3-a456-426655440000');
    expect(anonymousIdService.isAnonymousIdExist()).toBe(true);
  });
});
