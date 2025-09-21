import styles from './Icon.module.css';

const ICON_PATH = '/icons/';
const SHORTCUT_PATH = '/icons/shortcut.ico';

export default function Icon({ src, alt, size = 'sm', isShortcut = false }: IconProps) {
    return <div className={styles.win95Icon}>
        <img src={ICON_PATH.concat(src)}
             className={styles[size]}
             alt={alt}/>
        {isShortcut ?
            <img src={SHORTCUT_PATH}
                 className={`${styles.shortcutIcon} ${styles[size]}`}
                 alt={alt}/>
            : null
        }
    </div>
}

interface IconProps {
    src: string;
    size: 'sm' | 'md' | 'lg';
    alt?: string;
    isShortcut?: boolean;
}