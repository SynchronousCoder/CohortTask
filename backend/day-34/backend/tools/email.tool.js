import { tool } from "langchain";
import * as z from "zod";
import { sendEmail } from "../service/mail.service.js";

export const emailTool = tool(sendEmail, {
  name: "emailTool",

  description:
    "Used to send an email to a specified recipient.",

  schema: z.object({
    to: z
      .string()
      .describe("The recipient's email address"),

    html: z
      .string()
      .describe("The HTML content of the email"),

    subject: z
      .string()
      .describe("The subject of the email"),
  }),
});