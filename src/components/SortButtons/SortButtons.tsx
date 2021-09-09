import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {
  CheckBox,
  CheckBoxOutlineBlank,
  PlaylistAddCheck,
} from '@material-ui/icons';
import { ISortButtonsProps } from '../../interfaces/Todo.interface';
import styles from './SortButtons.module.scss';

const SortButtons: React.FC<ISortButtonsProps> = ({
  todosItems,
  onClickBySort,
}) => {
  const [alignment, setAlignment] = React.useState<string | null>('all');

  const {
    allTodosQuantity,
    completedTodosQuantity,
    notCompletedTodosQuantity,
  } = todosItems;

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
    onClickBySort(newAlignment);
  };
  return (
    <div className={styles.buttonsWrapper}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="button group"
      >
        <ToggleButton
          value="all"
          aria-label="all todos button"
          className={
            alignment === 'all'
              ? `${styles.checked} ${styles.selected}`
              : undefined
          }
        >
          <PlaylistAddCheck />
          All todos: {allTodosQuantity}
        </ToggleButton>
        <ToggleButton
          value="completed"
          aria-label="completed todos button"
          className={
            alignment === 'completed'
              ? `${styles.checked} ${styles.selected}`
              : undefined
          }
        >
          <CheckBox /> Completed: {completedTodosQuantity}
        </ToggleButton>
        <ToggleButton
          value="notCompleted"
          aria-label="not completed todos button"
          className={
            alignment === 'notCompleted'
              ? `${styles.checked} ${styles.selected}`
              : undefined
          }
        >
          <CheckBoxOutlineBlank /> Not completed: {notCompletedTodosQuantity}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default SortButtons;
