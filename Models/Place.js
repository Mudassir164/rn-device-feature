class Place {
  constructor(name, image, location, id) {
    this.name = name;
    this.image = image;
    this.address = location.address;
    this.location = { lat: location.latitude, lng: location.longitude };
    this.id = id;
  }
}
export default Place;
