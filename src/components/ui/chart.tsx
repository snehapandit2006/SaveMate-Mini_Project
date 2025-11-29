"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "./utils";

// Theme selectors
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
    theme?: Record<keyof typeof THEMES, string>;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used within <ChartContainer />");
  return ctx;
}

export function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs overflow-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config);

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, selector]) => {
            const vars = colorConfig
              .map(([key, item]) => {
                const color =
                  item.theme?.[theme as keyof typeof item.theme] ||
                  item.color;
                return color ? `--color-${key}: ${color};` : "";
              })
              .join("\n");

            return `
${selector} [data-chart="${id}"] {
  ${vars}
}`;
          })
          .join("\n"),
      }}
    />
  );
};

// ========== TOOLTIP ==========

export const ChartTooltip = RechartsPrimitive.Tooltip;

export function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  nameKey,
  labelKey,
  color,
}: any) {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  const tooltipLabel = !hideLabel ? (
    <div className={cn("font-medium", labelClassName)}>
      {labelFormatter ? labelFormatter(label) : label}
    </div>
  ) : null;

  return (
    <div
      className={cn(
        "border border-border/50 bg-background rounded-lg px-2.5 py-1.5 shadow-xl text-xs grid gap-1.5",
        className
      )}
    >
      {tooltipLabel}

      <div className="grid gap-1.5">
        {payload.map((item: any, i: number) => {
          const key = nameKey || item.name || item.dataKey;
          const cfg = config[key];

          const indicatorColor =
            color || item.payload?.fill || item.color || "var(--foreground)";

          return (
            <div
              key={i}
              className="flex justify-between items-center gap-2 text-xs"
            >
              {!hideIndicator && (
                <div
                  className="h-2.5 w-2.5 rounded-sm shrink-0"
                  style={{ backgroundColor: indicatorColor }}
                />
              )}
              <span className="text-muted-foreground">
                {cfg?.label || item.name}
              </span>

              {item.value !== undefined && (
                <span className="font-mono font-medium">
                  {item.value.toLocaleString()}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ========== LEGEND ==========

export const ChartLegend = RechartsPrimitive.Legend;

export function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  nameKey,
  verticalAlign = "bottom",
}: any) {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item: any) => {
        const key = nameKey || item.dataKey;
        const cfg = config[key];

        return (
          <div
            key={item.value}
            className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
          >
            {!hideIcon ? (
              cfg?.icon ? (
                <cfg.icon />
              ) : (
                <div
                  className="h-2 w-2 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
              )
            ) : null}

            {cfg?.label || item.value}
          </div>
        );
      })}
    </div>
  );
}
