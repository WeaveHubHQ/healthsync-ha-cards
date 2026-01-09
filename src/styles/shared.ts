import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    padding: var(--ha-card-padding, 16px);
    background: var(
      --ha-card-background,
      var(--card-background-color, var(--primary-background-color))
    );
    color: var(--primary-text-color);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    gap: 8px;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 700;
  }

  .metric-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
  }

  .metric {
    border-radius: 12px;
    padding: 12px;
    background: var(
      --ha-card-section-background,
      color-mix(
        in srgb,
        var(--card-background-color, var(--ha-card-background, #1e1e1e)) 70%,
        var(--secondary-background-color, rgba(0, 0, 0, 0.04))
      )
    );
    box-shadow: var(--ha-card-box-shadow, none);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .metric.compact {
    padding: 10px;
  }

  .metric .label {
    display: flex;
    gap: 6px;
    align-items: center;
    color: var(--secondary-text-color);
    font-size: 0.9rem;
    text-transform: none;
  }

  .metric .value {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .metric .subtle {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
  }

  .progress {
    height: 6px;
    border-radius: 999px;
    background: var(--divider-color, rgba(128, 128, 128, 0.25));
    overflow: hidden;
  }

  .progress .bar {
    height: 100%;
    border-radius: 999px;
    background: var(--accent-color, var(--primary-color));
    width: 0%;
    transition: width 0.3s ease;
  }

  .status-low {
    color: var(--warning-color, #f9a825);
  }

  .status-high {
    color: var(--error-color, #ef5350);
  }

  .status-normal {
    color: var(--success-color, var(--primary-color));
  }

  .pill {
    padding: 3px 8px;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--primary-color)) 15%,
      transparent
    );
    color: var(--accent-color, var(--primary-color));
    font-size: 0.75rem;
    font-weight: 600;
  }
`;
