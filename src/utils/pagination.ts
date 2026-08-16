import { MAX_VISIBLE_PAGES } from "@/constants";

/** Placeholder token used in the pagination window for collapsed ranges. */
export const ELLIPSIS = "ellipsis" as const;

/** A page number or an ellipsis placeholder. */
export type PageToken = number | typeof ELLIPSIS;

/**
 * Returns a windowed list of page numbers (with ellipsis) for the pagination
 * bar, collapsing long ranges around the current page.
 */
export function getVisiblePages(
  page: number,
  totalPages: number,
  maxVisiblePages: number = MAX_VISIBLE_PAGES
): PageToken[] {
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  const pages: PageToken[] = [1];

  if (start > 2) pages.push(ELLIPSIS);
  for (let i = start; i <= end; i += 1) pages.push(i);
  if (end < totalPages - 1) pages.push(ELLIPSIS);
  pages.push(totalPages);

  return pages;
}
