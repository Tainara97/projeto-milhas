import { faker } from "@faker-js/faker";
import * as milesService from "../../../src/services/miles-service";
import * as milesRepository from "../../../src/repositories/miles-repository";
import * as milesCalculator from "../../../src/services/miles-calculator-service";
import { createTrip } from "../factories/trip-factory";

describe("Miles Service Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("generateMilesForTrip", () => {
    it("should calculate and save miles for a new trip", async () => {
      const trip = createTrip();

      jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(null);
      jest.spyOn(milesCalculator, "calculateMiles").mockReturnValueOnce(1000);
      const saveSpy = jest
        .spyOn(milesRepository, "saveMiles")
        .mockResolvedValueOnce(undefined as any);

      const result = await milesService.generateMilesForTrip(trip);

      expect(milesRepository.findMiles).toHaveBeenCalledWith(trip.code);
      expect(milesCalculator.calculateMiles).toHaveBeenCalledWith(trip);
      expect(saveSpy).toHaveBeenCalledWith(trip.code, 1000);
      expect(result).toBe(1000);
    });

    it("should throw conflict error when miles already exist for the code", async () => {
      const trip = createTrip();

      jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce({
        id: 1,
        code: trip.code,
        miles: 500
      });

      const promise = milesService.generateMilesForTrip(trip);

      await expect(promise).rejects.toEqual({
        type: "conflict",
        message: `Miles already registered for code ${trip.code}`
      });
    });
  });

  describe("getMilesFromCode", () => {
    it("should return miles when code exists", async () => {
      const code = faker.string.uuid();

      jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce({
        id: 1,
        code,
        miles: 1200
      });

      const result = await milesService.getMilesFromCode(code);

      expect(milesRepository.findMiles).toHaveBeenCalledWith(code);
      expect(result.miles).toBe(1200);
    });

    it("should throw not_found error when code does not exist", async () => {
      const code = faker.string.uuid();

      jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(null);

      const promise = milesService.getMilesFromCode(code);

      await expect(promise).rejects.toEqual({
        type: "not_found",
        message: `Miles not found for code ${code}`
      });
    });
  });
});