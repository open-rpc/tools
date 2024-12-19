// Test file to check if getDocumentExtendedMetaSchema works correctly
import { getDocumentExtendedMetaSchema } from "@open-rpc/schema-utils-js";

/* global console */

// Sample OpenRPC document
const sampleDocument = {
  openrpc: "1.2.6",
  info: {
    title: "Test API",
    version: "1.0.0"
  },
  methods: []
};

try {
  console.log("Testing getDocumentExtendedMetaSchema function");
  const result = getDocumentExtendedMetaSchema(sampleDocument);
  console.log("Function executed successfully");
  console.log("Result type:", typeof result);
} catch (error) {
  console.error("Error executing getDocumentExtendedMetaSchema:", error);
} 