import styles from './Icon.module.css';

const ICON_PATH = '/src/assets/icons/';

// This might be needed only in dev build.
const icons = import.meta.glob(
    "/src/assets/icons/*.ico",
    {
        eager: true,
        query: "?inline",
        import: "default",
    }
) as Record<string, string>;

export default function Icon({ src, alt, size = 'sm' }: IconProps) {
    return <img src={icons[ICON_PATH.concat(src)]}
                className={styles[size]}
                alt={alt}/>
}

interface IconProps {
    src: string;
    size: 'sm' | 'md' | 'lg';
    alt?: string;
}