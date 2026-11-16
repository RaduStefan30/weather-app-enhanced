import { existsSync } from 'fs';
import { getIconPathByCode } from './codeToIcon';
import { WEATHER_CODES } from './weatherBackground';

describe('weather icon assets', () => {
  it.each([true, false])('resolves every supported condition and unknown codes to an existing asset (day=%s)', (isDay) => {
    for (const code of [...Object.values(WEATHER_CODES).flat(), -1, 9999]) {
      const path = getIconPathByCode(code, isDay);
      expect(path).toMatch(/\.svg$/);
      expect(existsSync(`public${path}`)).toBe(true);
    }
  });

  it('uses the existing clear SVG for an unknown nighttime condition', () => {
    expect(getIconPathByCode(9999, false)).toBe('/night/clear.svg');
  });

  it.each(WEATHER_CODES.haze)('represents atmospheric condition %s with mist instead of clear sky', (code) => {
    expect(getIconPathByCode(code, false)).toBe('/night/mist.svg');
    expect(getIconPathByCode(code, true)).toBe('/day/mist.svg');
  });
});
