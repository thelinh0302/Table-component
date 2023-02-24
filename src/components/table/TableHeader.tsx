import React from 'react';
import classname from 'classnames';
import Node from './Node';
import TableSortButton from './TableSortButton';

interface Props {
  data: any;
  sortables: any;
  sensitives: any;
  id: string;
  resolver: any;
  options: any;
  sortHandler: any;
  primaryKey: string;
  sortBy: any;
}

const TableHeader: React.FC<Partial<Props>> = ({
  data,
  sortables,
  sensitives,
  resolver,
  options,
  sortHandler,
  id,
  sortBy
}) => {
  const isSortable = (key: string) => {
    if (!key) return false;
    if (sortables) {
      return Boolean(sortables[key]);
    } else if (sortables === false) {
      return false;
    } else {
      return true;
    }
  };
  const isSensitive = (key: string) => {
    if (!key) return false;
    if (sensitives) {
      return Boolean(sensitives[key]);
    } else {
      return false;
    }
  };
  const renderItems = () => {
    const headerItems = data.map((hd: any, idx: string) => {
      const _headerItems = classname('core-list__header_item', {
        'has-icon': isSortable(hd.key) || isSensitive(hd.key)
      });
      const headerData = {
        ...hd,
        ...resolver(hd)
      };
      const styles = {
        ...((options?.styles && options?.styles[hd.key]) || {}),
        '--itemWidth':
          (options?.styles &&
            options?.styles[hd.key] &&
            options?.styles[hd.key]['--itemWidth']) ||
          `${100 / data.length}%`
      };
      const renderSortBtn = (key: any) => {
        if (!isSortable(key)) return null;
        const fieldSortBy = sortBy.find((s: any) => s.field === key);
        return (
          <TableSortButton
            onClickHandler={sortHandler(key)}
            id={`${key}-sortbtn`}
            order={fieldSortBy?.order}
          />
        );
      };
      const renderShieldIcon = (key: any) => {
        if (!isSensitive(key)) return null;
        return (
          <i className="core-list__shield-icon">
            <svg width={16} height={16}>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.3333 3.73301L8 2.73301L3.66667 3.73301C3.46667 3.73301 3.33333 3.86634 3.33333 4.06634V5.99967C3.33333 9.33301 5.13333 11.6663 8 13.333C10.8667 11.6663 12.6667 9.33301 12.6667 5.99967V4.06634C12.6667 3.86634 12.5333 3.73301 12.3333 3.73301ZM7.73333 1.39967L8 1.33301L8.26667 1.39967L12.5333 2.39967C13.3333 2.53301 14 3.19967 14 4.06634V5.99967C14 9.59968 12.2 12.4663 8.66667 14.4663L8 14.8663L7.33333 14.4663C3.8 12.4663 2 9.59968 2 5.99967V4.06634C2 3.19967 2.66667 2.46634 3.46667 2.39967L7.73333 1.39967ZM4 5.39968C4 5.79968 4.26667 6.06635 4.66667 6.06635H11.3333C11.7333 6.06635 12 5.79968 12 5.39968C12 4.99968 11.7333 4.73301 11.3333 4.73301H4.66667C4.26667 4.73301 4 4.99968 4 5.39968Z"
              />
            </svg>
          </i>
        );
      };
      return (
        <div
          style={styles}
          className={_headerItems}
          key={`core-list__header-${id}-${idx}`}
        >
          <Node>
            {renderSortBtn(hd.key)}
            {renderShieldIcon(hd.key)}
            {headerData.node}
          </Node>
        </div>
      );
    });
    return headerItems;
  };
  return <div className="core-list__header">{renderItems()}</div>;
};
export default TableHeader;
