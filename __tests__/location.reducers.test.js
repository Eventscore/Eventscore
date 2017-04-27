import locationReducer from '../app/reducers/location';

describe(locationReducer, () => {
  it('should set geolocation to given geolocation when action type is "GET_LOCATION"', () => {
    expect(
      locationReducer({}, { type: 'GET_LOCATION', geolocation: { lon: 3, lat: 3} })
    ).toEqual({
      geolocation: { lon: 3, lat: 3}
    });
  });

  it('should set geolocation to null when action type is "GET_LOCATION_FAILED"', () => {
    expect(
      locationReducer({}, { type: 'GET_LOCATION_FAILED', geolocation: null })
    ).toEqual({
      geolocation: null
    });
  });
});