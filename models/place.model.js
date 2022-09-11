export class Place {
  constructor(title, imageUri, location) {
    this.id = Date.now().toString() + Math.random().toString();
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }
}
