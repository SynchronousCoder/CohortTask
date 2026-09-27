import { MistralAIEmbeddings } from "@langchain/mistralai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFParse } from "pdf-parse";
import { Pinecone } from "@pinecone-database/pinecone";

import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.index("cohort-2-rag");

// const dataBuffer = fs.readFileSync("./story.pdf");
// console.log("dataBuffer: ", dataBuffer);

// const parser = new PDFParse({ data: dataBuffer });
// const data = await parser.getText();

// console.log("data :", data.text);

const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
});

// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 500,
//   chunkOverlap: 0,
// });
// const chunks = await splitter.splitText(data.text);

// const docs = await Promise.all(
//   chunks.map(async (chunk) => {
//     const embedding = await embeddings.embedQuery(chunk);
//     return { text: chunk, embedding };
//   }),
// );
// let result;
// try {
//   result = await index.upsert({
//     records: docs.map((doc, i) => ({
//       id: `doc-${i}`,
//       values: doc.embedding,
//       metadata: { text: doc.text },
//     })),
//   });
// } catch (error) {
//   throw error;
//   console.log(error);
// }

const queryEmbedding = await embeddings.embedQuery(
  "how was the internship experience?",
);
console.log(queryEmbedding);

const res = await index.query({
  vector: queryEmbedding,
  topK: 2,
  includeMetadata: true,
});

console.log(JSON.stringify(res));