import React from 'react';
import styles from './styles.module.scss';

export type Theme = 'dark' | 'none';

interface Props {
  theme?: Theme;
}

function applyThemeColor(className: string, theme: Theme) {
  if (theme === 'dark') {
    return [className, styles.colorWhite].join(' ');
  }
  return className;
}

function applyThemeBackgroundColor(className: string, theme: Theme) {
  if (theme === 'dark') {
    return [className, styles.bgColorDark].join(' ');
  }
  return className;
}

function imgLogo(theme: Theme) {
  if (theme === 'dark') {
    return require(`./image/logo.svg`);
  }
  return require(`./image/logo.svg`);
}

function Footer(props: Props) {
  const { theme = 'none' } = props;

  const envelopeClass = applyThemeColor('fa fa-envelope', theme);
  const instagramClass = applyThemeColor('fa fa-instagram', theme);
  const facebookClass = applyThemeColor('fa fa-facebook', theme);
  const iconClass = applyThemeColor(styles.icon, theme);
  const linkClass = applyThemeColor(styles.link, theme);
  const containerClass = applyThemeBackgroundColor(styles.container, theme);

  return (
    <footer>
      <div className={containerClass}>
        <a href="https://sendchinatownlove.com/">
          <img
            className={styles.logo}
            src={imgLogo(theme)}
            alt="send chinatown love"
          />
        </a>
        <ul className={styles.links}>
          <li>
            <a className={iconClass} href="mailto:hello@sendchinatownlove.com">
              <span className={envelopeClass} />
            </a>
            <a className={linkClass} href="mailto:hello@sendchinatownlove.com">
              Email
            </a>
          </li>
          <li>
            <a
              className={iconClass}
              href="https://instagram.com/sendchinatownlove"
            >
              <span className={instagramClass} />
            </a>
            <a
              className={linkClass}
              href="https://instagram.com/sendchinatownlove"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              className={iconClass}
              href="https://www.facebook.com/Send-Chinatown-Love-100872288240891/"
            >
              <span className={facebookClass} />
            </a>
            <a
              className={linkClass}
              href="https://www.facebook.com/Send-Chinatown-Love-100872288240891/"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
