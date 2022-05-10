class Place {
  constructor(name, image, address, location) {
    this.name = name;
    this.image = image;
    this.address = address;
    this.location = location;
    id: new Date().toString() + Math.random().toString();
  }
}
