import {
  calculateDistance,
  toRadius,
  applyHaversineFormula
} from "../../../src/services/distances-calculator-service";

describe("Distances Calculator Service Unit Tests", () => {
  describe("toRadius", () => {
    it("should convert degrees to radians", () => {
      const degrees = 180;

      const result = toRadius(degrees);

      expect(result).toBe(Math.PI);
    });
  });

  describe("applyHaversineFormula", () => {
    it("should calculate distance based on haversine formula", () => {
      const lat1 = 0;
      const lat2 = 0;
      const dLat = 0;
      const dLon = toRadius(1);
      const radius = 6371;

      const result = applyHaversineFormula(lat1, lat2, dLat, dLon, radius);
      
      expect(result).toBeCloseTo(111.19, 2);
    });
  });

  describe("calculateDistance", () => {
    it("should calculate distance in kilometers by default", () => {
      const origin = { lat: 0, long: 0 };
      const destination = { lat: 0, long: 1 };

      const result = calculateDistance(origin, destination);

      expect(result).toBeCloseTo(111, 0);
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

      const result = calculateDistance(origin, destination, true);

      expect(result).toBeCloseTo(69, 0);
    });
  });
});
