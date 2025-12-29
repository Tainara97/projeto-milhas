import { faker } from "@faker-js/faker";
import { Trip, ServiceClass } from "../../../src/protocols";

export function createTrip(overrides?: Partial<Trip>): Trip {
  return {
    code: faker.string.uuid(),

    origin: {
      lat: faker.location.latitude(),
      long: faker.location.longitude()
    },

    destination: {
      lat: faker.location.latitude(),
      long: faker.location.longitude()
    },

    miles: false,

    plane: faker.string.alpha(5),

    service: faker.helpers.enumValue(ServiceClass),

    date: faker.date
      .between({ from: "2024-01-01", to: "2024-12-31" })
      .toISOString()
      .slice(0, 10),

    ...overrides
  };
}
