import {
  calculateDistance,
  toRadius,
  applyHaversineFormula
} from "../../../src/services/distances-calculator-service";

describe("calculateDistance", () => {
  it("should calculate the distance between two coordinates in kilometers", () => {
    const origin = { lat: 0, long: 0 };
    const destination = { lat: 0, long: 1 };

    const result = calculateDistance(origin, destination);

    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThan(0);
  });

  it("should return a rounded integer value", () => {
    const origin = { lat: -23.55052, long: -46.633308 };
    const destination = { lat: -22.906847, long: -43.172897 };

    const result = calculateDistance(origin, destination);

    expect(Number.isInteger(result)).toBe(true);
  });

  it("should calculate distance in miles when isMiles is true", () => {
    const origin = { lat: 0, long: 0 };
    const destination = { lat: 0, long: 1 };

    const km = calculateDistance(origin, destination);
    const miles = calculateDistance(origin, destination, true);

    expect(miles).toBeLessThan(km);
  });
});

describe("toRadius", () => {
  it("should convert degrees to radians", () => {
    const result = toRadius(180);

    expect(result).toBeCloseTo(Math.PI);
  });
});

describe("applyHaversineFormula", () => {
  it("should return a number greater than zero", () => {
    const lat1 = toRadius(0);
    const lat2 = toRadius(0);
    const dLat = toRadius(0);
    const dLon = toRadius(1);
    const radius = 6371;

    const result = applyHaversineFormula(lat1, lat2, dLat, dLon, radius);

    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThan(0);
  });
});
