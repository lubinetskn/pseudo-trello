import { compose, withHandlers, withState } from 'recompose';

import Desk from './Desk';

const LEFT_KEY = 37;

const RIGHT_KEY = 39;

export default compose(
  withState('draggedCardInfo', 'setDraggedCardInfo', null),
  withHandlers({
    onChangeSection: ({ sections, onChange }) => editedSection => {
      const editedSectionIndex = sections.findIndex(
        section => section.id === editedSection.id
      );
      if (editedSectionIndex === -1) {
        return;
      }
      const newSections = [
        ...sections.slice(0, editedSectionIndex),
        { ...sections[editedSectionIndex], ...editedSection },
        ...sections.slice(editedSectionIndex + 1),
      ];
      onChange(newSections);
    },
  }),
  withHandlers({
    changeCardSection: props => ({ keyCode }) => {
      if (!props.draggedCardInfo) {
        return;
      }
      const currentSectionIndex = props.sections.findIndex(
        section => section.id === props.draggedCardInfo.sectionId
      );
      const cardIndex = props.sections[currentSectionIndex].cards.findIndex(
        card => card.id === props.draggedCardInfo.cardId
      );
      let nextSectionIndex = 0;
      if (keyCode === LEFT_KEY && currentSectionIndex !== 0) {
        nextSectionIndex = currentSectionIndex - 1;
      }
      if (
        keyCode === RIGHT_KEY &&
        currentSectionIndex !== props.sections.length - 1
      ) {
        nextSectionIndex = currentSectionIndex + 1;
      }
      if (currentSectionIndex === nextSectionIndex) {
        return;
      }
      let nextSection = props.sections[nextSectionIndex];
      let currentSection = props.sections[currentSectionIndex];
      nextSection = {
        ...nextSection,
        cards: [...nextSection.cards, currentSection.cards[cardIndex]],
      };
      currentSection = {
        ...currentSection,
        cards: currentSection.cards.filter((_, index) => index !== cardIndex),
      };
      const newSections =
        nextSectionIndex > currentSectionIndex
          ? [
              ...props.sections.slice(0, currentSectionIndex),
              currentSection,
              ...props.sections.slice(
                currentSectionIndex + 1,
                nextSectionIndex
              ),
              nextSection,
              ...props.sections.slice(nextSectionIndex + 1),
            ]
          : [
              ...props.sections.slice(0, nextSectionIndex),
              nextSection,
              ...props.sections.slice(
                nextSectionIndex + 1,
                currentSectionIndex
              ),
              currentSection,
              ...props.sections.slice(currentSectionIndex + 1),
            ];
      props.setDraggedCardInfo({
        cardId: props.draggedCardInfo.cardId,
        sectionId: nextSectionIndex,
      });
      props.onChange(newSections);
    },
  })
)(Desk);
