#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs/promises";
import * as path from "path";
import {
  getAllTemplates,
  getTemplateById,
  searchTemplates,
  getStyleGuide,
  getWritingTips,
} from "./registry.js";

const server = new Server(
  {
    name: "docs-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register list of available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_templates",
        description:
          "List all available documentation templates from The Good Docs Project with IDs, names, and summaries.",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description:
                "Optional category/pack filter (e.g., 'misc', 'core')",
            },
          },
        },
      },
      {
        name: "search_templates",
        description:
          "Search for the best documentation template based on keywords, document type, or task description (e.g. 'rest api', 'quick onboarding', 'bug tracking', 'installation', 'changelog', 'how to run docker').",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description:
                "The search query or description of the document you want to create",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_template",
        description:
          "Get the raw Markdown template, official authoring guide, writing process instructions, and examples for a specific template ID.",
        inputSchema: {
          type: "object",
          properties: {
            template_id: {
              type: "string",
              description:
                "Template ID (e.g., 'quickstart', 'api-reference', 'readme', 'how-to', 'tutorial', 'installation-guide', 'changelog')",
            },
            include_guide: {
              type: "boolean",
              description:
                "Whether to include the comprehensive TGDP authoring guide explaining best practices for this template. Defaults to true.",
            },
            include_example: {
              type: "boolean",
              description:
                "Whether to include reference examples if available. Defaults to true.",
            },
          },
          required: ["template_id"],
        },
      },
      {
        name: "get_style_guide",
        description:
          "Get The Good Docs Project comprehensive style guide and writing tips (voice, tone, terminology, formatting, minimalism, and readability standards).",
        inputSchema: {
          type: "object",
          properties: {
            topic: {
              type: "string",
              description:
                "Optional filter: 'style-guide', 'writing-tips', or 'all'. Defaults to 'all'.",
            },
          },
        },
      },
      {
        name: "generate_document_skeleton",
        description:
          "Generate a tailored document skeleton based on a The Good Docs Project template, substituting project metadata (title, overview, prerequisites, author, etc.) into the structured template.",
        inputSchema: {
          type: "object",
          properties: {
            template_id: {
              type: "string",
              description:
                "The template ID to base the doc on (e.g., 'quickstart', 'api-reference', 'readme', 'how-to', 'tutorial')",
            },
            project_name: {
              type: "string",
              description: "The name of the project or tool",
            },
            project_description: {
              type: "string",
              description: "Brief description of the project and target audience",
            },
            custom_sections: {
              type: "array",
              items: { type: "string" },
              description: "Optional list of extra section headers to include",
            },
          },
          required: ["template_id", "project_name"],
        },
      },
      {
        name: "save_document",
        description:
          "Write the generated documentation directly to a file on the local filesystem (e.g. README.md, docs/quickstart.md, CONTRIBUTING.md).",
        inputSchema: {
          type: "object",
          properties: {
            file_path: {
              type: "string",
              description:
                "Relative or absolute destination file path (e.g. 'README.md' or 'docs/api-guide.md')",
            },
            content: {
              type: "string",
              description: "The complete markdown documentation content to save",
            },
            overwrite: {
              type: "boolean",
              description: "Whether to overwrite if the file already exists. Defaults to false.",
            },
          },
          required: ["file_path", "content"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_templates": {
        const templates = getAllTemplates();
        const category = args?.category as string | undefined;

        const filtered = category
          ? templates.filter((t) =>
              t.packs.some((p) => p.toLowerCase() === category.toLowerCase())
            )
          : templates;

        const list = filtered.map((t) => ({
          id: t.id,
          name: t.name,
          summary: t.summary,
          available_files: t.file_types,
        }));

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  total_templates: list.length,
                  templates: list,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "search_templates": {
        const query = (args?.query as string) || "";
        if (!query) {
          throw new McpError(
            ErrorCode.InvalidParams,
            "Query parameter is required."
          );
        }

        const results = searchTemplates(query);
        const mapped = results.map((t) => ({
          id: t.id,
          name: t.name,
          summary: t.summary,
          available_files: t.file_types,
        }));

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  query,
                  matches_found: mapped.length,
                  recommendations: mapped,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "get_template": {
        const templateId = args?.template_id as string;
        if (!templateId) {
          throw new McpError(
            ErrorCode.InvalidParams,
            "template_id is required."
          );
        }

        const template = getTemplateById(templateId);
        if (!template) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Template not found: '${templateId}'. Use 'list_templates' to see all available templates.`
          );
        }

        const includeGuide = args?.include_guide !== false;
        const includeExample = args?.include_example !== false;

        const responseObj: Record<string, any> = {
          id: template.id,
          name: template.name,
          summary: template.summary,
          template_markdown:
            template.contents["template"] || "No template markdown available.",
        };

        if (includeGuide && template.contents["guide"]) {
          responseObj.authoring_guide = template.contents["guide"];
        }

        if (includeExample && template.contents["example"]) {
          responseObj.example = template.contents["example"];
        }

        if (template.contents["process"]) {
          responseObj.writing_process = template.contents["process"];
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(responseObj, null, 2),
            },
          ],
        };
      }

      case "get_style_guide": {
        const topic = (args?.topic as string) || "all";
        const result: Record<string, string> = {};

        if (topic === "all" || topic === "style-guide") {
          result.style_guide = getStyleGuide();
        }

        if (topic === "all" || topic === "writing-tips") {
          result.writing_tips = getWritingTips();
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "generate_document_skeleton": {
        const templateId = args?.template_id as string;
        const projectName = args?.project_name as string;
        const projectDesc = (args?.project_description as string) || "";
        const customSections = (args?.custom_sections as string[]) || [];

        if (!templateId || !projectName) {
          throw new McpError(
            ErrorCode.InvalidParams,
            "template_id and project_name are required."
          );
        }

        const template = getTemplateById(templateId);
        if (!template) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Template not found: '${templateId}'.`
          );
        }

        let raw = template.contents["template"] || `# ${projectName}\n\n`;

        // Replace common TGDP template placeholders
        let populated = raw
          .replace(/# Title/gi, `# ${projectName}`)
          .replace(/{project_name}/gi, projectName)
          .replace(/{project-name}/gi, projectName)
          .replace(/{Project name}/gi, projectName)
          .replace(/{audience}/gi, "developers and software engineers");

        if (projectDesc) {
          populated = populated.replace(
            /{short description of the project[^}]*}/gi,
            projectDesc
          );
        }

        if (customSections.length > 0) {
          populated += "\n\n## Additional Sections\n";
          for (const sec of customSections) {
            populated += `\n### ${sec}\n\n<!-- Add ${sec} details here -->\n`;
          }
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message: `Generated document skeleton for '${projectName}' based on '${template.name}'.`,
                  template_used: template.name,
                  skeleton_markdown: populated,
                  authoring_tips:
                    "Follow The Good Docs Project guide to replace any remaining bracketed placeholders, and keep steps concise and actionable.",
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "save_document": {
        const filePath = args?.file_path as string;
        const content = args?.content as string;
        const overwrite = Boolean(args?.overwrite);

        if (!filePath || content === undefined) {
          throw new McpError(
            ErrorCode.InvalidParams,
            "file_path and content are required."
          );
        }

        const resolved = path.resolve(process.cwd(), filePath);

        try {
          if (!overwrite) {
            try {
              await fs.access(resolved);
              throw new McpError(
                ErrorCode.InvalidParams,
                `File '${filePath}' already exists. Set overwrite: true to replace it.`
              );
            } catch (err: any) {
              if (err.code !== "ENOENT") throw err;
            }
          }

          await fs.mkdir(path.dirname(resolved), { recursive: true });
          await fs.writeFile(resolved, content, "utf-8");

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    status: "success",
                    message: `Successfully saved documentation to ${filePath}`,
                    file_path: resolved,
                    size_bytes: Buffer.byteLength(content, "utf-8"),
                  },
                  null,
                  2
                ),
              },
            ],
          };
        } catch (error: any) {
          throw new McpError(
            ErrorCode.InternalError,
            `Failed to save document: ${error.message}`
          );
        }
      }

      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${name}`
        );
    }
  } catch (error: any) {
    if (error instanceof McpError) throw error;
    throw new McpError(ErrorCode.InternalError, error.message || String(error));
  }
});

// Run server over stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("The Good Docs Project MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error running docs-mcp:", err);
  process.exit(1);
});
