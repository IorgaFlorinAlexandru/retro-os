import styles from './Icon.module.css';

const ICON_PATH = '/icons/';

export default function Icon({ src, alt, size = 'sm' }: IconProps) {
    return <img src={ICON_PATH.concat(src)}
                className={styles[size]}
                alt={alt}/>
}

interface IconProps {
    src: string;
    size: 'sm' | 'md' | 'lg';
    alt?: string;
}