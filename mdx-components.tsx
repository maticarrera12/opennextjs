import type { MDXComponents } from "mdx/types";
import { useMDXComponents as getDocsComponents } from "nextra-theme-docs";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...getDocsComponents(components),
    ...components,
  };
}
