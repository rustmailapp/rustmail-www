export interface Row {
  label: string;
  rustmail: string;
  mailpit: string;
  mailhog: string;
}

export const SOURCES_CHECKED = "October 2026";

export const featureRows: Row[] = [
  { label: "Language", rustmail: "Rust", mailpit: "Go", mailhog: "Go" },
  { label: "License", rustmail: "MIT or Apache 2.0", mailpit: "MIT", mailhog: "MIT" },
  { label: "Storage", rustmail: "SQLite, or in memory", mailpit: "SQLite", mailhog: "In memory, MongoDB or files" },
  { label: "Search", rustmail: "Full-text", mailpit: "Search with filters", mailhog: "By sender, recipient or text" },
  { label: "Mobile preview", rustmail: "Yes", mailpit: "Yes", mailhog: "Not listed" },
  { label: "HTML client compatibility check", rustmail: "No", mailpit: "Yes", mailhog: "Not listed" },
  { label: "Spam score", rustmail: "No", mailpit: "With SpamAssassin", mailhog: "Not listed" },
  { label: "DKIM, SPF, DMARC and ARC results", rustmail: "Yes", mailpit: "Not listed", mailhog: "Not listed" },
  { label: "POP3 server", rustmail: "No", mailpit: "Yes", mailhog: "Not listed" },
  { label: "SMTP failure injection", rustmail: "No", mailpit: "Yes", mailhog: "Yes" },
  { label: "Release to a real SMTP server", rustmail: "Yes", mailpit: "Yes", mailhog: "Yes" },
  { label: "Webhooks", rustmail: "Yes", mailpit: "Yes", mailhog: "Not listed" },
  { label: "CI assertion endpoint", rustmail: "Yes", mailpit: "General REST API", mailhog: "General HTTP API" },
  { label: "CLI assert mode", rustmail: "Yes", mailpit: "Not listed", mailhog: "Not listed" },
  { label: "Official GitHub Action", rustmail: "Yes", mailpit: "Not listed", mailhog: "Not listed" },
  { label: "Terminal UI", rustmail: "Yes, plus a Neovim plugin", mailpit: "Not listed", mailhog: "Not listed" },
];
