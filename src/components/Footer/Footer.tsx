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
  const linkClass = applyThemeColor(styles.link, theme);
  const containerClass = applyThemeBackgroundColor(styles.container, theme);

  return (
    <footer>
      <div className={containerClass}>
        <img
          className={styles.logo}
          src={imgLogo(theme)}
          alt="send chinatown love"
        />
        <ul className={styles.links}>
          <li>
            <span className={envelopeClass} />
            <a className={linkClass} href="mailto:sendchinatownlove@gmail.com">
              Email
            </a>
          </li>
          {false && <li>
            <span className={instagramClass} />
            <a
              className={linkClass}
              href="https://instagram.com/sendchinatownlove"
            >
              Instagram
            </a>
          </li>}
          {false && <li>
            <span className={facebookClass} />
            <a
              className={linkClass}
              href="https://www.facebook.com/Send-Chinatown-Love-100872288240891/"
            >
              Facebook
            </a>
          </li>}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
