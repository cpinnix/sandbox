export function getPreference(preferences, name) {
  const preference = preferences.find((preference) => preference.name === name);
  return preference.value;
}
