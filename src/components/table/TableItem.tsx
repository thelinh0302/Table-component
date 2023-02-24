import React from 'react';
import classnames from 'classnames';
import Node from './Node';
import CheckBox from './checkbox/checkbox';

interface Props {
  content: any;
  options: any;
  primaryKey: string;
  checkbox: boolean;
  handleChangeCheckBox: (value: string) => void;
}

const TableItem: React.FC<Partial<Props>> = ({
  content,
  options,
  primaryKey,
  checkbox = true,
  handleChangeCheckBox
}) => {
  const handleChange = (value: any) => {
    handleChangeCheckBox(value);
  };
  const renderNodes = () => {
    const dataKeys = Object.keys(content);
    if (dataKeys.length > 0) {
      const items = dataKeys.map((d: any, idx: any) => {
        const styles = {
          ...((options?.styles && options?.styles[d]) || {}),
          '--itemWidth':
            (options?.styles &&
              options?.styles[d] &&
              options?.styles[d]['--itemWidth']) ||
            `${100 / dataKeys.length}%`
        };
        const _ItemNode = classnames({
          'is-primary-key': primaryKey === d
        });
        if (d !== 'innerContent' && d !== 'error') {
          if (options?.items && options?.items.length > 0) {
            if (options?.items.some((i: string) => i === d)) {
              return (
                <Node
                  key={`cui-node--${idx}`}
                  id={`node-${d}`}
                  data-key={`${d}`}
                  styles={styles}
                >
                  {content[d]}
                </Node>
              );
            }
            return null;
          }
          return (
            <Node
              key={`core-node--${idx}`}
              id={`core-${d}`}
              data-key={`${d}`}
              styles={styles}
              className={_ItemNode}
            >
              {content[d]}
            </Node>
          );
        }
        return null;
      });
      if (checkbox) {
        items.push(
          <Node
            className="toggle"
            key={`core-node--${content.id}-toggle`}
            id={`node-${content.id}`}
            data-key={`${content.id}`}
          >
            <CheckBox handleChange={() => handleChange(content)} />
          </Node>
        );
      }
      return items;
    }
    return null;
  };
  return (
    <div className="core-list__item">
      <div className="core-list__item-container">{renderNodes()}</div>
    </div>
  );
};
export default TableItem;
