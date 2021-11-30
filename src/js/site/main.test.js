import '../../../jest/global';

describe('Main', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('URLSearchParams', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('True to be true', () => {
      expect(true).toBe(true);
    });
  });
});
