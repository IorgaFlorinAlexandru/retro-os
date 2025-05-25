import styles from './Icon.module.css';

const ICON_PATH = '/icons/';

export default function Icon(props: IconProps) {
    return <img src={ICON_PATH.concat(props.src)}
                className={`${styles.win95Icon} ${styles[props.size ?? 'sm']}`}
                alt={props.alt}/>
}

interface IconProps {
    src: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg';
}