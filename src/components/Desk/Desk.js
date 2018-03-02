import React from 'react';

import Section from '../Section';
import './style.css';

const Desk = ({
  sections,
  onChangeSection,
  draggedCardInfo,
  setDraggedCardInfo,
  changeCardSection,
}) => (
  <div className="board" tabIndex="0" onKeyDown={changeCardSection}>
    <div className="wrapper">
      {sections.map(section => (
        <Section
          onChange={onChangeSection}
          setDraggedCardInfo={setDraggedCardInfo}
          draggedCardInfo={draggedCardInfo}
          key={section.id}
          {...section}
        />
      ))}
    </div>
  </div>
);

Desk.defaultProps = {
  sections: [],
};

export default Desk;
