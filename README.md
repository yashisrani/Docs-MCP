# Docs MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io/) server for generating professional, structured documentation using [The Good Docs Project](https://www.thegooddocsproject.dev/) templates and authoring guidelines.

## Description

The Docs [Model Context Protocol](https://modelcontextprotocol.io/) server offers tools to improve the developer experience when creating technical documentation with agentic AI tools. Developers no longer need to worry about documentation formatting, missing sections, or inconsistent style. Simply prompt your agent, and the Docs MCP server locates the appropriate template, retrieves official authoring guidelines, and scaffolds or writes the document directly to your project.

## Key Features

- Scaffolds 25+ industry-standard documentation types developed by The Good Docs Project (API reference, quickstarts, concepts, how-to guides, changelogs, architecture guides, and more)
- Provides access to official authoring guides, writing processes, and real-world reference examples
- Delivers the comprehensive Good Docs Project Style Guide and writing tips (voice, tone, terminology, and readability standards)
- Integrates directly with agentic AI tools (Claude Desktop, VS Code, Cursor, Cline, Claude Code, Antigravity) with zero local setup required via `npx`
- Enables safe writing of generated markdown documentation directly to project files

> [!TIP]
> The template bundle is pre-compiled into the package, keeping the download size under 180 KB with fast startup times.

## How It Works (Intelligent Template Selection)

You do **not** need to memorize or specify any template names. When you give a prompt such as *"Create documentation for this feature"* or *"Document our Redis caching system"*:

1. **Codebase Understanding**: The AI agent inspects your code to understand what the feature, API, or system does.
2. **Semantic Template Matching**: The agent invokes the `search_templates` tool. The server applies semantic intent scoring across template names, tags, and summaries (for example, mapping "feature" to architecture/concepts, "endpoints" to API references, or "install/setup" to quickstarts and installation guides).
3. **Guideline & Template Retrieval**: The agent fetches the matched template and its official Good Docs Project authoring guide.
4. **Drafting & Saving**: The agent populates the template with real details from your codebase and writes the completed markdown document directly into your project.

If you *do* want a specific document type (e.g. "Create a quickstart guide" or "Write an API reference"), the agent will honor your specific choice.

## Available Tools

- `list_templates`: Lists all available documentation templates from The Good Docs Project with IDs, names, and summaries.
- `search_templates`: Searches for the best documentation template based on keywords, document type, or task description.
- `get_template`: Retrieves the raw Markdown template, official authoring guide, writing process instructions, and examples for a specific template ID.
- `get_style_guide`: Provides access to The Good Docs Project style guide and technical writing guidelines (voice, tone, terminology, formatting, and readability).
- `generate_document_skeleton`: Generates a tailored document skeleton based on a template, substituting project metadata into the structured template.
- `save_document`: Writes the generated documentation directly to a file on the local filesystem.

## Requirements

- [Node.js](https://nodejs.org/) Version v18.0.0, v20.0.0, v22.0.0 or higher
- [npm](https://www.npmjs.com/) Version v8.0.0 or higher
- An MCP client, such as VS Code (GitHub Copilot), Claude Desktop, Cursor, Cline, Claude Code, or Antigravity

## Setup & Installation

### Option 1: Run directly from GitHub via npx (Zero local install)

Users can run the server directly from GitHub without cloning:

```json
{
  "mcpServers": {
    "docs-mcp-server": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "github:yashisrani/Docs-MCP"
      ]
    }
  }
}
```

### Option 2: Clone and Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yashisrani/Docs-MCP.git
   cd Docs-MCP
   npm install
   npm run build
   ```

2. Configure your MCP client:
   ```json
   {
     "mcpServers": {
      "docs-mcp-server": {
        "type": "stdio",
        "command": "node",
        "args": [
          "/path/to/Docs-MCP/dist/index.js"
        ]
      }
    }
   }
   ```

### Specific MCP Clients (via GitHub npx)

#### VS Code (GitHub Copilot / Chat)

```bash
code --add-mcp '{"name":"docs-mcp-server","type":"stdio","command":"npx","args":["-y","github:yashisrani/Docs-MCP"]}'
```

#### Claude Desktop

Add to `claude_desktop_config.json`:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "docs-mcp-server": {
      "command": "npx",
      "args": ["-y", "github:yashisrani/Docs-MCP"]
    }
  }
}
```

#### Cline

1. Open the Cline panel in VS Code.
2. Click on the "MCP Servers" icon at the top, next to the plus symbol.
3. Switch to the "Configure" tab, then click "Configure MCP servers".
4. Insert the configuration:

```json
{
  "mcpServers": {
    "docs-mcp-server": {
      "command": "npx",
      "args": ["-y", "github:yashisrani/Docs-MCP"]
    }
  }
}
```

#### Claude Code

```bash
claude mcp add --transport stdio --scope user docs-mcp-server -- npx -y github:yashisrani/Docs-MCP
```

#### Codex

```bash
codex mcp add --transport stdio docs-mcp-server -- npx -y github:yashisrani/Docs-MCP
```

#### Cursor / Windsurf / Antigravity

In your MCP settings panel or config file, add:
- **Name**: `docs-mcp-server`
- **Transport**: `stdio`
- **Command**: `npx`
- **Args**: `["-y", "github:yashisrani/Docs-MCP"]`

---

## Adding Rules to your Project

The following rules guide large language models (LLMs) in using the Docs MCP server correctly. Add these rules to your global or project-specific `AGENTS.md` (or `CLAUDE.md` for Claude Code):

```markdown
## Guidelines for Documentation

- When creating or updating documentation, use the `search_templates` or `list_templates` tools from the Docs MCP server to select the matching template from The Good Docs Project.
- Consult `get_style_guide` and `get_template` with `include_guide: true` to align with professional documentation standards (voice, tone, structure, and readability).
- Use `generate_document_skeleton` or `save_document` to produce complete, structured markdown files.
```

---

## Example Prompts for Agents

Once connected, you can prompt your agent:

1. **Quickstart Guide:**
   > "Using docs-mcp, find the right template and write a quickstart guide for running our Postgres database with Docker Compose."

2. **API Reference:**
   > "Search docs-mcp for API reference templates, inspect the authoring guide, and generate an API reference for our user authentication service."

3. **Feature Overview / Concept Document:**
   > "Using docs-mcp, find the appropriate template for a new feature overview (e.g. Concept template) and write an architecture and feature guide for our Real-Time Collaboration feature."

4. **Contributing Guide:**
   > "Generate a CONTRIBUTING.md file for our open-source TypeScript library following The Good Docs Project standards."

5. **Troubleshooting Guide:**
   > "We have several common connection timeout errors. Pull the troubleshooting guide template from docs-mcp and draft a troubleshooting document."

---

## Support, Feedback, Contributing

This project is open to feature requests, suggestions, and bug reports. Contributions and feedback are welcome.

For guidelines on writing and template structure, refer to [The Good Docs Project](https://www.thegooddocsproject.dev/).

---

## Code of Conduct

Members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone. By participating in this project, you agree to abide by standard community conduct guidelines at all times.

---

## Author & Creator

Created and maintained by **Yash Israni**.

- GitHub: [@yashisrani](https://github.com/yashisrani)
- LinkedIn: [Yash Israni](https://www.linkedin.com/in/yashisrani/)
- X (Twitter): [@yashh_twt](https://x.com/yashh_twt)

---

## Licensing

The MCP server codebase is created by [Yash Israni](https://github.com/yashisrani) and licensed under the [MIT License](./LICENSE).

Documentation templates and authoring guides are developed by and credited to [The Good Docs Project](https://www.thegooddocsproject.dev/).
