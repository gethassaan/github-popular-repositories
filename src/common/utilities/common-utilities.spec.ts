import * as util from './common.utilities';

describe('COMMON UTILITIES:', () => {
  const formatedLanguages = 'language:react+language:javascript';
  jest.mock('./common.utilities.ts', () => {
    return {
      formatLanguages: jest.fn().mockReturnValue(formatedLanguages),
      formatDateComparison: jest.fn().mockReturnValue('<'),
    };
  });
  describe('formatLanguages()', () => {
    it('should return array of string passed ', () => {
      let languages = 'react,javascript';
      expect(util.formatLanguages(languages)).toBe(formatedLanguages);
    });
  });
  describe('formatDateComparison()', () => {
    it('should return array of string passed ', () => {
      let dateComparison = 'less';
      expect(util.formatDateComparison(dateComparison)).toBe<string>('<');
    });
  });
});
