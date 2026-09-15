import { tool } from "langchain";
import * as z from "zod";

import {
  getClimateData,
} from "../service/climate.service.js";

export const climateTool = tool(
  async ({
    latitude,
    longitude,
    startDate,
    endDate,
  }) => {
    return await getClimateData(
      latitude,
      longitude,
      startDate,
      endDate
    );
  },

  {
    name: "climateTool",

    description: `
Get historical climate data for an agricultural
location using NASA POWER.

Use this tool when the user asks about:

- historical climate
- historical temperature
- historical rainfall
- climate patterns
- average temperature
- humidity trends
- wind conditions
- agricultural climate analysis
`,

    schema: z.object({
      latitude: z
        .number()
        .describe("Latitude of the location"),

      longitude: z
        .number()
        .describe("Longitude of the location"),

      startDate: z
        .string()
        .describe(
          "Start date in YYYYMMDD format"
        ),

      endDate: z
        .string()
        .describe(
          "End date in YYYYMMDD format"
        ),
    }),
  }
);