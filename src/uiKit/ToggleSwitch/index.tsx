import useDarkMode from '@hooks/useDarkMode';
import clsx from 'clsx';
import { ChangeEvent } from 'react';
import styles from './ToggleSwitch.module.scss';

type ToggleSwitchPropsType = {
     label?: string;
     checked: boolean;
     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
     disabled?: boolean;
};

const ToggleSwitch = ({ onChange, checked, label = '', disabled = false }: ToggleSwitchPropsType) => {
     const isDarkMode = useDarkMode();

     return (
          <div className={clsx(styles.root, isDarkMode && styles.dark, disabled && styles.disabled)}>
               <label className={styles.toggle}>
                    <input
                         checked={checked}
                         onChange={e => onChange(e)}
                         className={clsx(styles.toggleCheckbox)}
                         type="checkbox"
                         disabled={disabled}
                    />
                    <div className={clsx(styles.toggleSwitch, checked && styles.checked)}></div>
                    {label && <span className={styles.toggleLabel}>{label}</span>}
               </label>
          </div>
     );
};

export default ToggleSwitch;
