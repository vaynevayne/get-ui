import type {DropdownSectionSlots, SlotsToClasses} from "@get-ui/theme";

import {BaseSection, SectionProps} from "@get-ui/aria-utils";
import {DividerProps} from "@get-ui/divider";

import {DropdownItemProps} from "../dropdown-item";

export interface DropdownSectionBaseProps<T extends object = {}> extends SectionProps<"ul", T> {
  /**
   * The dropdown section classNames.
   */
  classNames?: SlotsToClasses<DropdownSectionSlots>;
  /**
   * The dropdown items classNames.
   */
  itemClasses?: DropdownItemProps["classNames"];
  /**
   * Shows a divider between sections
   * @default false
   */
  showDivider?: boolean;
  /**
   * The divider props
   */
  dividerProps?: DividerProps;
}

const DropdownSectionBase = BaseSection as (props: DropdownSectionBaseProps) => JSX.Element;

export default DropdownSectionBase;
