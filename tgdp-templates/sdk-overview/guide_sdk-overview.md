# SDK overview template guide

> Thank you for downloading this template from The Good Docs Project! Before using the template, read this template guide for information about how to complete each section. Want to explore more templates? Check them out in our [templates GitLab repository](https://gitlab.com/tgdp/templates).

## Introduction

An SDK overview is a high-level introduction that explains what the SDK does, who it’s for, and how to use it. It provides readers with a clear understanding of the SDK’s purpose, requirements, and key features.

The SDK overview sets the context for the rest of the SDK documentation and helps users quickly assess whether the SDK meets their needs.

Target audience:

* Software developers and technical architects interested in integrating or building applications using the SDK.
* Technical writers and managers who want to ensure consistency across SDK documentation.

Take a look at the following accompanying resources:

* To structure your content using a ready-made format, explore the [Software development kit overview template](template_sdk-overview.md) document.
* For step-by-step guidance on creating an SDK overview, explore the [Software development kit overview process](process_sdk-overview.md) document.
* To review the reference materials and best practices that informed this document, explore the [SDK overview resources](resources_sdk-overview.md) document.

## Why do I need an SDK overview?

An SDK overview is important because it helps developers and technical teams quickly understand the SDK's value. It makes the SDK easier to use and reduces onboarding time. By highlighting its purpose, key features, and main use cases, the SDK allows developers to quickly determine whether it fits their project requirements. This approach leads to a better overall developer experience.

The following table describes the differences between the SDK overview and the generic overview:

| SDK overview | Generic overview |
| ----- | ----- |
| Developer focused: mobile, backend, frontend, DevOps. | Broad audience: customers, stakeholders, and general users. |
| Uses technical language and platform-specific terminology. | Uses plain, high-level language. |
| Gives a high-level overview of how to integrate, use, and implement the SDK. | Explains what the product, service, or platform does and its value. |
| Focuses on APIs, features, dependencies, and developer workflows. | Focuses on benefits, use cases, and positioning. |

## SDK overview best practices

* Keep the overview concise and focused on developer needs.
* Use bullet points to highlight key features and use cases for easy scanning.
* Clearly state supported platforms and compatibility.
* Provide links to additional resources, such as guides, code samples, and changelogs.
* Update the overview with each SDK release to reflect new features and fixes.

## Content of the SDK template

* [Title](#about-the-title-section): Identifies the SDK and, if applicable, its platform or version.
* [High-level summary](#about-the-high-level-summary-section): Briefly explains what the SDK is and why it exists.
* [What’s in this SDK](#about-the-whats-in-this-sdk-section): Describes supported platforms, languages, and primary use cases.
* [Key features](#about-the-key-features-section): Summarizes the main capabilities of the SDK.
* [Changelog reference](#about-the-changelog-reference-section): Indicates where to find version history and updates.
* [Next steps](#about-the-next-steps-section): Guides readers to set up guides, samples, and additional resources.

### About the Title section

The title should clearly identify the SDK and its scope.

Use a naming convention that helps readers immediately understand:

* The product or service name.
* The platform, language, or environment (if applicable).
* A version number only if it matters for compatibility.

Keep it short, clear, and consistent with other SDK documentation.

Possible formulas:

* {Product name} SDK
* {Product name} SDK for {platform}
* {Product name} SDK {version X.Y.Z}
* {Product name} SDK for {platform} {version X.Y.Z}
* {Product name} SDK {version X.Y.Z} for {platform} {version X.Y.Z}

Examples:

* Windows SDK
* Payments SDK for Android
* Windows SDK 2.0
* Payments SDK for Android v2.1.0
* Cloud SDK v2.0.0 for Java v11

### About the high-level summary section

The high-level summary introduces the SDK and explains its purpose.

It should answer the following questions:

* What is this SDK?
* Who is it for?
* What problems does it solve?

Keep this section short; include one or two paragraphs.

The goal of this section is to help readers quickly decide whether this SDK is relevant to their needs.

Formula:

{SDK name} provides {primary capability}.

It is designed for {target audience} and helps {solve a specific problem or enable workflow}.

Examples:

* Clarity SDK for mobile apps captures user interactions across your app, enabling session replays, heatmaps, and monitoring of key signals via a metrics dashboard. Integration requires minimal development effort.
* Docutain SDK allows mobile apps to scan, process, and store documents quickly. It supports Android devices with rear-facing cameras and provides optimized session handling for document processing workflows.

### About the What's in this SDK section

Explain the purpose of the SDK. Make sure that the purpose answers the user question “Can I use this SDK in my environment, and what exactly does it cover?”

Include:

* Supported platforms and operating systems.
* Supported programming languages.
* Key use cases or scenarios.
* High-level requirements, if relevant.

Use short bullet points or clearly labeled subsections to make the information easy to scan.

Formula:

**SDK purpose**

The {Product Name} SDK provides {libraries/components/tools} for {specific functionality}.

It supports {core capabilities}.

**Requirements**

Supported languages:

* {Language 1 + minimum version}
* {Language 2 + minimum version}

Supported platforms:

* {Platform + minimum version}

Environment requirements:

* {Runtime / framework}

Hardware requirements (if applicable):

* {Required hardware}

Optional dependencies:

* {Optional tools or services}

**Key use cases**

* Build custom integrations with {API}.
* Embed {UI components} into applications.
* Automate {workflow type}.
* Process {data type}.
* Enable {security/authentication feature}.

Example:

**SDK purpose**

The Payments SDK provides client libraries and prebuilt UI components for integrating payment functionality into mobile and web applications. It supports transaction processing, subscription management, and refund handling.

**Requirements**

Supported languages:

* Java 11+
* Swift 5+
* JavaScript (ES6+)

Supported platforms:

* Android 12+
* iOS 14+
* Web (only modern browsers)

Optional dependencies:

* OAuth 2.0 provider
* Backend server for webhook handling

**Key use cases**

* Embed secure checkout screens into mobile apps.
* Process card and digital wallet payments.
* Automate recurring subscription billing.
* Sync transaction data with backend accounting systems.

### About the Key features section

List each major feature of the SDK along with a concise description explaining its function and benefits.

The goal of this section is to help developers quickly understand:

* What the SDK enables.
* Why those capabilities matter.
* Whether the SDK fits their use case.

This section provides an overview — not full feature documentation.

When describing key features, follow these guidelines:

* List the most important features first.
* Use plain language.
* Describe what the feature does.
* Explain the developer benefit.
* Avoid implementation details: APIs, architecture, configuration.
* Link to detailed documentation when needed.
* Keep descriptions short: 1–3 sentences per feature.

Formula:

Feature: {Feature Name}

Description: {What it does}

Benefit: {How it helps the developer}

Link: {Optional link to detailed docs}

Examples:

* Use a table when the SDK includes multiple features. A table improves readability and allows developers to quickly compare capabilities.

| Feature | Description | Benefit |
| :---- | :---- | :---- |
| Video Calls | Enables real-time video communication | Integrates video without building backend infrastructure |
| Messaging | Provides chat functionality | Allows apps to support in-app conversations |
| Screen Sharing | Supports live screen sharing | Improves collaboration within your app |

* Use structured paragraphs when the SDK includes only a few features. This format provides slightly more narrative context while keeping the content concise and scannable.

  **Video calls**

  Enables real-time video communication between users.

  Reduces the need to build custom streaming infrastructure.

  **Messaging**

  Provides built-in chat functionality with message history.

  Simplifies user communication features.

### About the Changelog reference section

State which SDK version the overview describes and provide a link or direction to the changelog for developers who want to see detailed version history, fixes, and updates.

The Changelog reference section informs users where they can find a detailed history of SDK updates.

This section helps developers decide whether to upgrade. This section does not repeat the changelog content — it points to it.

Include:

* A link to the official changelog.
* The current SDK version (optional).
* The date of the latest release (optional).
* A short explanation of what the changelog contains.

When adding a changelog reference, follow these guidelines:

* Keep this section short (1–3 sentences).
* Do not duplicate release notes.
* Clearly indicate if breaking changes are documented there.
* Ensure the link points to the canonical source, for example, GitHub releases, version history page.

Keep version formatting consistent with the SDK title pattern.

Formula:

Current version: {Version X.Y.Z}. For a full list of updates, see {Changelog link}.

Examples:

* The latest SDK version is 2.3.1. For a complete list of updates, bug fixes, and new features, see the SDK Changelog.
* Current version: 2.3.1. For a full list of updates, bug fixes, and breaking changes, see SDK Changelog.

### About the Next steps section

Guide developers on what to do after reading the overview. This section should make the SDK actionable by clearly directing users to the appropriate resources through links.

Include links to:

* Getting Started guides to begin integrating the SDK.
* Code samples and quickstarts.
* Advanced tutorials for deeper use cases.
* FAQs and troubleshooting documentation.
* GitHub issues for bug reports and feature requests.
* A contact form or support email.
* Community channels, such as Discord or Slack.

This section helps developers:

* Start integrating the SDK.
* Explore advanced capabilities.
* Troubleshoot issues.
* Contact support when needed.

When adding next steps, follow these guidelines:

* Order links from basic to advanced.
* Include all essential resources to prevent confusion.
* Keep descriptions short (one line) but informative.
* Use consistent formatting across SDK overviews.
* Make support and feedback easy to find, especially for new users.

Formula:

* {Resource name} — {Brief description of what it provides} [{Link text}]({URL})

Example:

* [Getting started guide](https://example.com/sdk/getting-started)
* [Code samples](https://example.com/sdk/code-samples)
* [Advanced tutorials](https://example.com/sdk/advanced-tutorials)
* [Troubleshooting](https://example.com/sdk/troubleshooting)
* [Support](https://example.com/sdk/support)
* [GitHub issues](https://example.com/sdk/github-issues)
* [Community (Discord)](https://example.com/sdk/community)

---

> Explore other templates from [The Good Docs Project](https://thegooddocsproject.dev/). Use our [feedback form](https://thegooddocsproject.dev/feedback/?template=<template>) to give feedback on this template.

