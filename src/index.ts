import "./cards/fitness-activity-summary-card";
import "./cards/fitness-vitals-card";
import "./cards/fitness-sleep-card";
import "./cards/fitness-body-metrics-card";
import "./cards/fitness-workouts-card";
import "./cards/fitness-overview-card";

import "./editors/fitness-activity-summary-card-editor";
import "./editors/fitness-vitals-card-editor";
import "./editors/fitness-sleep-card-editor";
import "./editors/fitness-body-metrics-card-editor";
import "./editors/fitness-workouts-card-editor";
import "./editors/fitness-overview-card-editor";

export * from "./utils/metric-catalog";

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
    }>;
  }
}

function registerCard(type: string, name: string, description: string) {
  if (!window.customCards) window.customCards = [];
  if (!window.customCards.some((card) => card.type === type)) {
    window.customCards.push({ type, name, description });
  }
}

registerCard(
  "fitness-activity-summary-card",
  "Fitness Activity Summary",
  "Shows configurable activity totals with goals."
);

registerCard(
  "fitness-vitals-card",
  "Fitness Vitals",
  "Displays heart metrics with optional thresholds."
);

registerCard(
  "fitness-sleep-card",
  "Fitness Sleep",
  "Summarises sleep totals and stage breakdown."
);

registerCard(
  "fitness-body-metrics-card",
  "Fitness Body Metrics",
  "Shows body metrics with trend indicators."
);

registerCard("fitness-workouts-card", "Fitness Workouts", "Summarises workout energy/duration.");

registerCard("fitness-overview-card", "Fitness Overview", "Highlights primary and secondary metrics.");
