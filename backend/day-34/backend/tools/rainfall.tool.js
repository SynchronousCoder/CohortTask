import { tool } from "langchain";
import * as z from "zod";

import {
  getHistoricalRainfall,
} from "../service/rainfall.service.js";

export const rainfallTool = tool(
  async ({
    latitude,
    longitude,
    startDate,
    endDate,
  }) => {
    return await getHistoricalRainfall(
      latitude,
      longitude,
      startDate,
      endDate
    );
  },

  {
    name: "rainfallTool",

    description: `
Get historical rainfall data for an agricultural
location.

Use this tool when the user asks about:

- historical rainfall
- rainfall trends
- rainfall patterns
- drought analysis
- precipitation history
- agricultural rainfall analysis
`,

    schema: z.object({
      latitude: z.number(),

      longitude: z.number(),

      startDate: z
        .string()
        .describe("YYYYMMDD"),

      endDate: z
        .string()
        .describe("YYYYMMDD"),
    }),
  }
);