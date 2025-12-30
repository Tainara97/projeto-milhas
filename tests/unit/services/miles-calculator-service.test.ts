import { AffiliateStatus, ServiceClass } from "protocols";
import * as distanceCalculator from "../../../src/services/distances-calculator-service";
import * as milesCalculator from "../../../src/services/miles-calculator-service";
import { createTrip } from "../factories/trip-factory";

describe("Miles Calculator Service Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not calculate miles when trip is using miles", () => {
    jest.spyOn(distanceCalculator, "calculateDistance");

    const trip = createTrip({miles: true});

    const result = milesCalculator.calculateMiles(trip);

    expect(distanceCalculator.calculateDistance).not.toHaveBeenCalled();
    expect(result).toBe(0);
  });

  it("should calculate miles when trip is not using miles", () => {
    jest.spyOn(distanceCalculator, "calculateDistance").mockReturnValueOnce(100);

    const trip = createTrip({
      miles: false,
      service: ServiceClass.ECONOMIC,
      affiliate: AffiliateStatus.BRONZE,
      date: "2024-01-01"
    });

    const result = milesCalculator.calculateMiles(trip);

    expect(distanceCalculator.calculateDistance).toHaveBeenCalled();
    expect(result).toBe(100);
  });

   it("should apply service class multiplier when calculating miles", () => {
    jest.spyOn(distanceCalculator, "calculateDistance").mockReturnValueOnce(100);

    const trip = createTrip({
      miles: false,
      service: ServiceClass.EXECUTIVE,
      affiliate: AffiliateStatus.BRONZE,
      date: "2024-01-01"
    });

    const result = milesCalculator.calculateMiles(trip);

    expect(distanceCalculator.calculateDistance).toHaveBeenCalled();
    expect(result).toBe(150);
  });

  it("should apply affiliate bonus when calculating miles", () => {
    jest.spyOn(distanceCalculator, "calculateDistance").mockReturnValueOnce(100);

    const trip = createTrip({
      miles: false,
      service: ServiceClass.ECONOMIC,
      affiliate: AffiliateStatus.SILVER,
      date: "2024-01-01"
    });

    const result = milesCalculator.calculateMiles(trip);

    expect(distanceCalculator.calculateDistance).toHaveBeenCalled();
    expect(result).toBe(110);
  });

  it("should apply birthday month bonus when calculating miles", () => {
    jest.spyOn(distanceCalculator, "calculateDistance").mockReturnValueOnce(100);

    const trip = createTrip({
      miles: false,
      service: ServiceClass.ECONOMIC,
      affiliate: AffiliateStatus.BRONZE,
      date: "2024-05-10"
    });

    const result = milesCalculator.calculateMiles(trip);

    expect(distanceCalculator.calculateDistance).toHaveBeenCalled();
    expect(result).toBe(110);
  });

})