import {PaginationItemValue} from "@get-ui/use-pagination";
import {useCallback} from "react";
import {forwardRef} from "@get-ui/system";
import {PaginationItemType} from "@get-ui/use-pagination";
import {ChevronIcon, EllipsisIcon, ForwardIcon} from "@get-ui/shared-icons";
import {clsx, dataAttr} from "@get-ui/shared-utils";

import {UsePaginationProps, usePagination} from "./use-pagination";
import PaginationItem from "./pagination-item";
import PaginationCursor from "./pagination-cursor";

export interface PaginationProps extends UsePaginationProps {}

const Pagination = forwardRef<"nav", PaginationProps>((props, ref) => {
  const {
    Component,
    dotsJump,
    slots,
    classNames,
    total,
    range,
    loop,
    activePage,
    disableCursorAnimation,
    disableAnimation,
    renderItem: renderItemProp,
    onNext,
    onPrevious,
    setPage,
    getItemAriaLabel,
    getItemRef,
    getBaseProps,
    getWrapperProps,
    getItemProps,
    getCursorProps,
  } = usePagination({...props, ref});

  const renderItem = useCallback(
    (value: PaginationItemValue, index: number) => {
      const isBefore = index < range.indexOf(activePage);

      if (renderItemProp && typeof renderItemProp === "function") {
        return renderItemProp({
          value,
          index,
          activePage,
          isActive: value === activePage,
          isPrevious: value === activePage - 1,
          isNext: value === activePage + 1,
          isFirst: value === 1,
          isLast: value === total,
          onNext,
          onPrevious,
          setPage,
          ref: typeof value === "number" ? (node) => getItemRef(node, value) : undefined,
          className: slots.item({class: classNames?.item}),
        });
      }

      if (value === PaginationItemType.PREV) {
        return (
          <PaginationItem
            key={PaginationItemType.PREV}
            className={slots.prev({
              class: classNames?.prev,
            })}
            data-slot="prev"
            getAriaLabel={getItemAriaLabel}
            isDisabled={!loop && activePage === 1}
            value={value}
            onPress={onPrevious}
          >
            <ChevronIcon />
          </PaginationItem>
        );
      }
      if (value === PaginationItemType.NEXT) {
        return (
          <PaginationItem
            key={PaginationItemType.NEXT}
            className={slots.next({
              class: clsx(classNames?.next),
            })}
            data-slot="next"
            getAriaLabel={getItemAriaLabel}
            isDisabled={!loop && activePage === total}
            value={value}
            onPress={onNext}
          >
            <ChevronIcon
              className={slots.chevronNext({
                class: classNames?.chevronNext,
              })}
            />
          </PaginationItem>
        );
      }

      if (value === PaginationItemType.DOTS) {
        return (
          <PaginationItem
            key={PaginationItemType.DOTS + isBefore}
            className={slots.item({
              class: clsx(classNames?.item, "group"),
            })}
            data-slot="item"
            getAriaLabel={getItemAriaLabel}
            value={value}
            onPress={() =>
              isBefore
                ? setPage(activePage - dotsJump >= 1 ? activePage - dotsJump : 1)
                : setPage(activePage + dotsJump <= total ? activePage + dotsJump : total)
            }
          >
            <EllipsisIcon className={slots?.ellipsis({class: classNames?.ellipsis})} />
            <ForwardIcon
              className={slots?.forwardIcon({class: classNames?.forwardIcon})}
              data-before={dataAttr(isBefore)}
            />
          </PaginationItem>
        );
      }

      return (
        <PaginationItem {...getItemProps({value})} key={value} getAriaLabel={getItemAriaLabel}>
          {value}
        </PaginationItem>
      );
    },
    [activePage, dotsJump, getItemProps, loop, range, renderItemProp, slots, classNames, total],
  );

  return (
    <Component {...getBaseProps()}>
      <ul {...getWrapperProps()}>
        {!disableCursorAnimation && !disableAnimation && <PaginationCursor {...getCursorProps()} />}
        {range.map(renderItem)}
      </ul>
    </Component>
  );
});

Pagination.displayName = "NextUI.Pagination";

export default Pagination;
