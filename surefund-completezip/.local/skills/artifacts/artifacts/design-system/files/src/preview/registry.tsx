import type { ComponentType } from 'react';
import { ButtonDemo } from './demos/button';
import { SelectDemo } from './demos/select';
import {
  ColorsPage,
  FontsPage,
  LayoutPage,
  OverviewPage,
} from './foundations';

export type PreviewEntry = {
  // Globally unique across every group — it is the deep-link slug (`#page=<id>`)
  // and the active-page key. Group-qualify names that repeat across groups
  // (e.g. `brand-icons` vs `components-icons`).
  id: string;
  name: string;
  description: string;
  Page: ComponentType;
};

export type NavGroup = {
  name: string;
  entries: PreviewEntry[];
};

export const DESIGN_SYSTEM = {
  title: 'Design System',
  description:
    'A reusable system of foundations, components, and patterns for product surfaces.',
} as const;

export const OVERVIEW_ENTRY: PreviewEntry = {
  id: 'overview',
  name: 'Overview',
  description: 'The visual foundations and principles that shape this system.',
  Page: OverviewPage,
};

// The creation skill expands this seed to mirror the generated system; empty
// optional groups are intentional and stay hidden until they have pages.
export const NAV_GROUPS: NavGroup[] = [
  { name: 'Brand', entries: [] },
  {
    name: 'Colors',
    entries: [
      {
        id: 'color-roles',
        name: 'Color roles',
        description: 'Brand, semantic, text, background, and border colors.',
        Page: ColorsPage,
      },
    ],
  },
  {
    name: 'Fonts',
    entries: [
      {
        id: 'type-scale',
        name: 'Type scale',
        description: 'Font families, headings, body text, labels, and captions.',
        Page: FontsPage,
      },
    ],
  },
  {
    name: 'Layout',
    entries: [
      {
        id: 'spacing-radius',
        name: 'Spacing and radius',
        description: 'The spacing rhythm and corner treatments used by the system.',
        Page: LayoutPage,
      },
    ],
  },
  {
    name: 'Components',
    entries: [
      {
        id: 'button',
        name: 'Buttons',
        description: 'Button variants, sizes, icon treatments, and states.',
        Page: ButtonDemo,
      },
      {
        id: 'select',
        name: 'Selects',
        description: 'Selection controls, grouped options, and disabled states.',
        Page: SelectDemo,
      },
    ],
  },
  { name: 'Content', entries: [] },
  { name: 'Charts', entries: [] },
  { name: 'Motion', entries: [] },
  { name: 'Applied examples', entries: [] },
];

export const ALL_ENTRIES: PreviewEntry[] = [
  OVERVIEW_ENTRY,
  ...NAV_GROUPS.flatMap((group) => group.entries),
];

// A duplicate id would make one page unreachable (its deep link and highlight
// resolve to the first match), so fail loudly instead of shipping a dead page.
const duplicateIds = ALL_ENTRIES.map((entry) => entry.id).filter(
  (id, index, ids) => ids.indexOf(id) !== index,
);
if (duplicateIds.length > 0) {
  throw new Error(
    `Duplicate preview page id(s): ${[...new Set(duplicateIds)].join(
      ', ',
    )}. Every page id must be unique across all nav groups.`,
  );
}
