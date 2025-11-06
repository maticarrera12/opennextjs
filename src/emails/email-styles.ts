import * as React from "react";

/**
 * Helper type for email styles that allows string values for CSS properties
 * This is needed because React Email accepts string values that TypeScript's CSSProperties doesn't allow
 */
export type EmailStyle = React.CSSProperties & {
  [key: string]: string | number | undefined;
};

/**
 * Helper function to create email styles with proper typing
 * This allows us to use string values for CSS properties without type errors
 */
export function emailStyle(style: Record<string, string | number | undefined>): EmailStyle {
  return style as EmailStyle;
}

