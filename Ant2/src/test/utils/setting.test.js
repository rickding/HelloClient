import { getValue, setValue } from '@/utils/setting';

describe('test setting', () => {
  it('set and get value', () => {
    const key = 'test_set_get_value';
    const value = getValue(key);
    console.log('current value: ' + value);

    // Set the new value
    const v = 'accessToken';
    setValue(key, v);
    expect(getValue(key)).toBe(v);

    // Restore the original value
    setValue(key, value);
    expect(getValue(key)).toBe(value);
  });
});