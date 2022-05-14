const GOOGLE_API_KEYS = "AIzaSyCoUXl8Dg08Rn0WNl13HQb9Vm6Ie92jRZk";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x300&maptype=roadmap
&markers=color:red%7Clabel:M%7C${lat},${lng}
&key=${GOOGLE_API_KEYS}
  `;
  return imagePreviewUrl;
}

export async function getPlaces(lat, lng) {
  const getPlaceUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEYS}`;
  const getPlaces = await fetch(getPlaceUrl);
  if (!getPlaces.ok) {
    throw new Error("Something went wrong");
  }
  const places = await getPlaces.json();
  const address = places.results[0].formatted_address;
  // console.log("address...............", address);
  return address;
}
