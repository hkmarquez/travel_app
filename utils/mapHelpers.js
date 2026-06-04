export const fetchRoute = async (from, to) => {
  const res = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson`
  );
  const data = await res.json();
  return data.routes?.[0]?.geometry || null;
};

export const searchPlaces = async (text) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      text
    )}&format=json&limit=5`,
    { headers: { 'User-Agent': 'trip-planner-demo' } }
  );
  return await res.json();
};

export const handleUserLocationUpdate = (loc) => {
  if (!loc?.coords) return null;
  return {
    lat: loc.coords.latitude,
    lon: loc.coords.longitude,
  };
};
