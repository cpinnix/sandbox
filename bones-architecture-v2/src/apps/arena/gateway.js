export async function fetchVillains() {
  return [
    {
      attributes: {
        earth: Math.round(Math.random() * 100),
        wind: Math.round(Math.random() * 100),
        fire: Math.round(Math.random() * 100)
      }
    },
    {
      attributes: {
        earth: Math.round(Math.random() * 100),
        wind: Math.round(Math.random() * 100),
        fire: Math.round(Math.random() * 100)
      }
    },
    {
      attributes: {
        earth: Math.round(Math.random() * 100),
        wind: Math.round(Math.random() * 100),
        fire: Math.round(Math.random() * 100)
      }
    }
  ];
}
