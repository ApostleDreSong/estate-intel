import fetchFromApi from '../../src/services/fetchFromApi';

describe("Fetch asynchronous data", () => {
  it("should fetch async data when called", () => {
    let response = fetchFromApi();
    expect(typeof response).toEqual("object");
  });
});
