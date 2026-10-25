export type ToolId = "rustmail" | "mailpit" | "mailhog" | "maildev" | "mailcrab";

export type Competitor = Exclude<ToolId, "rustmail">;

export type MetricValue = number | string;

export interface Metric {
  id: string;
  label: string;
  unit: string;
  higherIsBetter: boolean;
  advantage: string;
  values: Record<ToolId, MetricValue>;
}

export interface Verdict {
  text: string;
  rustmailAhead: boolean;
}

export interface Bar {
  name: string;
  isRustmail: boolean;
  text: string;
  widthPercent: number;
}

export const BENCHMARKS_URL = "https://docs.rustmail.app/benchmarks";

export const toolNames: Record<ToolId, string> = {
  rustmail: "RustMail",
  mailpit: "Mailpit",
  mailhog: "MailHog",
  maildev: "MailDev",
  mailcrab: "MailCrab",
};

export const competitors: Competitor[] = ["mailpit", "mailhog", "maildev", "mailcrab"];

const LANDING_TOOLS: ToolId[] = ["rustmail", "mailpit", "mailhog"];
const NOT_IN_API = "Not in the API";

const SAME_WITHIN = 1.15;
const MIN_BAR_PERCENT = 1.5;

export const metrics: Metric[] = [
  {
    id: "search-rare",
    label: "Search, rare term",
    unit: "ms",
    higherIsBetter: false,
    advantage: "faster",
    values: { rustmail: 0.66, mailpit: 203, mailhog: 1265, maildev: 81, mailcrab: NOT_IN_API },
  },
  {
    id: "search-common",
    label: "Search, 100,000 hits",
    unit: "ms",
    higherIsBetter: false,
    advantage: "faster",
    values: { rustmail: 2.9, mailpit: 536, mailhog: 358, maildev: 63, mailcrab: NOT_IN_API },
  },
  {
    id: "list-first",
    label: "Inbox list, first page",
    unit: "ms",
    higherIsBetter: false,
    advantage: "faster",
    values: { rustmail: 0.94, mailpit: 8.3, mailhog: 2.2, maildev: 38, mailcrab: NOT_IN_API },
  },
  {
    id: "list-deep",
    label: "Inbox list, offset 90,000",
    unit: "ms",
    higherIsBetter: false,
    advantage: "faster",
    values: { rustmail: 1.5, mailpit: 12.8, mailhog: 2.4, maildev: 39, mailcrab: NOT_IN_API },
  },
  {
    id: "get-one",
    label: "Open one message",
    unit: "ms",
    higherIsBetter: false,
    advantage: "faster",
    values: { rustmail: 0.46, mailpit: 0.38, mailhog: 0.41, maildev: 0.38, mailcrab: 0.27 },
  },
  {
    id: "ingest",
    label: "Ingest, client in the same VM",
    unit: "msg/s",
    higherIsBetter: true,
    advantage: "faster",
    values: { rustmail: 6025, mailpit: 3698, mailhog: "Not measured", maildev: "Not measured", mailcrab: "Not measured" },
  },
  {
    id: "disk",
    label: "Disk, 100,000 messages",
    unit: "MB",
    higherIsBetter: false,
    advantage: "smaller",
    values: { rustmail: 110, mailpit: 210, mailhog: "Memory only", maildev: 393, mailcrab: "Memory only" },
  },
  {
    id: "idle-memory",
    label: "Idle memory",
    unit: "MB",
    higherIsBetter: false,
    advantage: "less",
    values: { rustmail: 9.4, mailpit: 19.6, mailhog: 22.7, maildev: 106.5, mailcrab: 6.6 },
  },
  {
    id: "restart",
    label: "Restart to full inbox",
    unit: "s",
    higherIsBetter: false,
    advantage: "faster",
    values: { rustmail: 0.3, mailpit: 0.64, mailhog: "Inbox empty", maildev: 24, mailcrab: "Inbox empty" },
  },
];

export function formatValue(value: MetricValue, unit: string): string {
  return typeof value === "number" ? `${value.toLocaleString("en-US")} ${unit}` : value;
}

function ratioAgainst(metric: Metric, competitor: Competitor): number | null {
  const ours = metric.values.rustmail;
  const theirs = metric.values[competitor];
  if (typeof ours !== "number" || typeof theirs !== "number") return null;
  return metric.higherIsBetter ? ours / theirs : theirs / ours;
}

function formatRatio(ratio: number): string {
  return ratio >= 10 ? `${Math.round(ratio).toLocaleString("en-US")}x` : `${ratio.toFixed(1)}x`;
}

/** Plain-words verdict for RustMail against one competitor; empty text when either value is not a number. */
export function difference(metric: Metric, competitor: Competitor): Verdict {
  const ratio = ratioAgainst(metric, competitor);
  if (ratio === null) return { text: "", rustmailAhead: false };
  if (ratio >= SAME_WITHIN) return { text: `${formatRatio(ratio)} ${metric.advantage}`, rustmailAhead: true };
  if (ratio <= 1 / SAME_WITHIN) {
    return { text: `${toolNames[competitor]} ${formatRatio(1 / ratio)} ${metric.advantage}`, rustmailAhead: false };
  }
  return { text: "About the same", rustmailAhead: false };
}

/** Landing bars for a lower-is-better metric, each as a share of the largest value shown. */
export function bars(metric: Metric): Bar[] {
  const numbers = LANDING_TOOLS.map((id) => metric.values[id]).filter((v): v is number => typeof v === "number");
  const max = Math.max(...numbers);
  return LANDING_TOOLS.map((id) => {
    const value = metric.values[id];
    return {
      name: toolNames[id],
      isRustmail: id === "rustmail",
      text: formatValue(value, metric.unit),
      widthPercent: typeof value === "number" ? Math.max(MIN_BAR_PERCENT, (value / max) * 100) : 0,
    };
  });
}

const LANDING_METRIC_IDS = ["search-rare", "list-first", "disk", "idle-memory"];

export const landingMetrics = metrics.filter((m) => LANDING_METRIC_IDS.includes(m.id));
