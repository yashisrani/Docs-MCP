import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import * as path from "path";
import * as fs from "fs/promises";

async function testServer() {
  console.log("Testing Docs MCP Server...");

  const serverPath = path.resolve("./dist/index.js");
  const transport = new StdioClientTransport({
    command: "node",
    args: [serverPath],
  });

  const client = new Client(
    { name: "test-client", version: "1.0.0" },
    { capabilities: {} }
  );

  await client.connect(transport);
  console.log("✓ Connected to server via stdio");

  // 1. List tools
  const { tools } = await client.listTools();
  console.log(`✓ Found ${tools.length} tools: ${tools.map((t) => t.name).join(", ")}`);

  // 2. Test list_templates
  const listRes = await client.callTool({
    name: "list_templates",
    arguments: {},
  });
  const listData = JSON.parse(listRes.content[0].text);
  console.log(`✓ list_templates returned ${listData.total_templates} templates`);

  // 3. Test search_templates
  const searchRes = await client.callTool({
    name: "search_templates",
    arguments: { query: "api reference endpoints" },
  });
  const searchData = JSON.parse(searchRes.content[0].text);
  console.log(`✓ search_templates matched: ${searchData.recommendations.map((r) => r.name).join(", ")}`);

  // 4. Test get_template
  const getRes = await client.callTool({
    name: "get_template",
    arguments: { template_id: "quickstart" },
  });
  const getData = JSON.parse(getRes.content[0].text);
  console.log(`✓ get_template('quickstart') retrieved template (${getData.template_markdown.length} chars)`);

  // 5. Test generate_document_skeleton
  const genRes = await client.callTool({
    name: "generate_document_skeleton",
    arguments: {
      template_id: "quickstart",
      project_name: "SuperFast-CLI",
      project_description: "A lightning-fast command-line interface for cloud backups",
      custom_sections: ["Troubleshooting tips"],
    },
  });
  const genData = JSON.parse(genRes.content[0].text);
  console.log(`✓ generate_document_skeleton generated preview (${genData.skeleton_markdown.length} chars)`);

  // 6. Test save_document
  const testOutputPath = "./test-output/QUICKSTART_TEST.md";
  const saveRes = await client.callTool({
    name: "save_document",
    arguments: {
      file_path: testOutputPath,
      content: genData.skeleton_markdown,
      overwrite: true,
    },
  });
  const saveData = JSON.parse(saveRes.content[0].text);
  console.log(`✓ save_document wrote file: ${saveData.file_path}`);

  // Clean up test file
  await fs.rm("./test-output", { recursive: true, force: true });
  console.log("✓ Cleaned up test output files");

  await client.close();
  console.log("\nAll Docs-MCP tests passed successfully! 🎉");
}

testServer().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
