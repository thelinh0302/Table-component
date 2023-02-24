import React, { CSSProperties } from 'react';
import classnames from 'classnames';

interface Props {
  className: string;
  id: string;
  styles: CSSProperties;
}

const Node: React.FC<Partial<Props>> = ({
  children,
  className,
  id,
  styles
}) => {
  const _Node = classnames('core-node', className);
  return (
    <div className={_Node} id={id} style={styles}>
      {' '}
      {children}{' '}
    </div>
  );
};

export default Node;
