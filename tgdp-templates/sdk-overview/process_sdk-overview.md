# SDK overview process

> Thank you for downloading this template from The Good Docs Project! Before using the template, read this document for best practices about how to research, write, and maintain this type of content. Want to explore more templates? Check them out in our [templates](https://gitlab.com/tgdp/templates) GitLab repository.

The SDK overview provides a clear, structured introduction to a software development kit, helping developers quickly understand what the SDK does, its key features, and how to integrate it. This document serves as an essential guide for getting started, exploring capabilities, and adopting the SDK effectively. SDK overviews are especially valuable for new SDKs, major updates, or significant changes that affect integration or usage.

## How to research an SDK overview

When preparing to write an SDK overview, it’s important to gather the right context and content:

* **Understand the SDK’s purpose**. Start by clarifying what the SDK enables developers to do. Ask the product team:

  * What core problems does it solve?
  * What integrations is it designed for?
  * Are there specific use cases or workflows where the SDK provides the most value?
  * How does the SDK fit within the broader product ecosystem?
  * Are there any common misconceptions about the SDK we should address?

* **Identify the audience**. Define the audience for this SDK overview. Ask the product team: Who is the primary target audience for this SDK, and what are their biggest pain points? Knowing whether readers are external developers, internal engineers, or cross-functional teams guides how you write the overview:

  * **Tone**: External developers may prefer a friendly, approachable style; internal engineers expect concise, technical language; cross-functional teams need a neutral, high-level tone.
  * **Terminology**: Avoid jargon for external developers; internal teams can handle acronyms and internal terms.
  * **Level of detail**: External developers need a clear summary of what the SDK does; internal engineers may want key references and technical points; cross-functional teams usually need business context.

  Clearly defining the audience ensures the overview is clear, relevant, and easy to understand.

* **Collect reference materials**. Collecting reference materials is needed to ensure the document is accurate, clear, and useful for developers. It helps you:
  * Explain the SDK’s purpose and value clearly.
  * Highlight key use cases and workflows.
  * Provide accurate technical details, such as supported platforms and dependencies.
  * Align with industry standards and competitor expectations.

  Collect the following reference materials:

  * **Product briefs or launch specs:** Help you understand the SDK’s goals, target audience, positioning, and core value proposition. They clarify why the SDK exists and what problems it solves.
  * **Code samples or quickstart guides:** Show how the SDK is used in practice. They help you identify common workflows, best practices, and the simplest path to getting started.
  * **API references:** Provide authoritative technical details, including methods, parameters, return values, and error handling. They ensure technical accuracy.
  * **Auth/license requirements:** Clarify setup steps, access limitations, and compliance needs. This prevents gaps in onboarding documentation.
  * **Platform compatibility notes:** Define supported environments, dependencies, version constraints, and limitations. This ensures developers know where and how the SDK works.
  * **Competitor SDK docs (for benchmarking):** Help you evaluate structure, depth, terminology, and developer experience expectations. They reveal industry standards and highlight opportunities to differentiate.

* **Talk to developers or maintainers**. Interview the SDK’s engineers or maintainers. Understand how users are expected to get started and what issues typically arise. Avoid relying solely on engineers — they may sometimes focus on implementation details rather than the high-level purpose. Ask product owners or other product team members for context and the user perspective.
* **Look for user goals**. What’s the fastest path to value for a developer? That first successful call, a working UI component, or a complete integration? Your overview should point to that.
* **Avoid some typical traps:**

  * Using outdated requirements.
  * Assuming too much prior knowledge about the platform or SDK.
  * Overloading the overview with technical details.
  * Forgetting to highlight purpose, key features, and main use cases.

## How to write an SDK overview

An SDK overview is the entry point to your entire developer experience. It should give readers the “what, why, and how” in under five minutes.

### Style tips

* Keep it brief and action-oriented.
* Use headings and tables for scannability.
* Link out instead of duplicating details.
* Avoid using a marketing tone — be clear and useful. In SDK documentation, a marketing tone means using promotional language instead of practical information. Documentation should inform, not persuade.

  Example:

  * Marketing tone: “Our powerful SDK makes integration effortless.”
  * Documentation tone: “The SDK provides APIs for authentication and data retrieval.”

  Focus on what the SDK does, how it works, and any requirements or limitations. Avoid vague adjectives, such as powerful, seamless, best-in-class, and unsupported claims. Developers use documentation to understand implementation details and solve problems. Clear, specific, and actionable information builds trust more effectively than promotional language.

### Optional additions

* A diagram showing architecture or a product overview.
* Real-world use cases or customer stories.

## How to maintain the SDK overview

SDK overviews need frequent updates, especially in fast-moving developer platforms. Set expectations for upkeep:

* **Track SDK updates**. Align doc releases with SDK releases. Subscribe to internal changelogs or pull requests.
* **Version awareness**. Show which SDK version the overview refers to, especially if breaking changes are introduced.
* **Check external links**. Routinely verify that the quickstart, API, and support links still work.
* **Feedback loop**. Add links to GitHub Issues, contact forms, or Discord channels so developers can report problems.
* **Benchmark quality**. Revisit other SDKs (Google Maps, AWS, Meta) periodically to assess whether your overview still feels competitive and developer-friendly.
* **Update your SDK overview**. Recommended review frequency:
  * Minor updates: Every 1–2 months, or whenever small changes occur. For example, new features, bug fixes, or updated code samples.
  * Major updates: With each SDK release. For example, new versions, platform compatibility changes, or significant API changes.
  * Periodic audit: Every 6–12 months, review the overview for clarity, relevance, and alignment with current developer needs.

---

> Explore other templates from [The Good Docs Project](https://thegooddocsproject.dev/). Use our [feedback form](https://thegooddocsproject.dev/feedback/?template=<template>) to give feedback on this template.

