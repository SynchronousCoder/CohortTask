import { tool } from "langchain";
import { z } from "zod";

import { sendEmail } from "../service/mail.service.js";

export const emailTool = tool(sendEmail, {
  name: "emailTool",

  description:
    "Use this tool when the user explicitly asks you to send an email. " +
    "You need the recipient email address, subject, and email content.",

  schema: z.object({
    to: z.string().email().describe("The recipient's email address"),

    subject: z.string().describe("The subject of the email"),

    text: z.string().describe("The plain text content of the email"),

    html: z
      .string()
      .optional()
      .describe("Optional HTML version of the email"),
  }),
});