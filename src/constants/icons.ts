import chevronBottomIcon from '../assets/icons/chevron-bottom-icon.svg';
import chevronRightIcon from '../assets/icons/chevron-right-icon.svg';
import cloudBlueIcon from '../assets/icons/cloud-blue-icon.svg';
import cloudGrayIcon from '../assets/icons/cloud-gray-icon.svg';
import cloudGreenIcon from '../assets/icons/cloud-green-icon.svg';
import emailIcon from '../assets/icons/email-icon.svg';
import infoIcon from '../assets/icons/info-circle-icon.svg';
import lockIcon from '../assets/icons/lock-icon.svg';
import logoutIcon from '../assets/icons/log-out-icon.svg';
import userIcon from '../assets/icons/user-icon.svg';
import worldIcon from '../assets/icons/world-icon.svg';

export type IIcons =
  | 'chevronBottom'
  | 'chevronRight'
  | 'cloudBlue'
  | 'cloudGray'
  | 'cloudGreen'
  | 'email'
  | 'info'
  | 'lock'
  | 'logout'
  | 'user'
  | 'world';

const Icons = {
  chevronBottom: chevronBottomIcon,
  chevronRight: chevronRightIcon,
  cloudBlue: cloudBlueIcon,
  cloudGray: cloudGrayIcon,
  cloudGreen: cloudGreenIcon,
  email: emailIcon,
  info: infoIcon,
  lock: lockIcon,
  logout: logoutIcon,
  user: userIcon,
  world: worldIcon,
};

function getIcon(icons: IIcons) {
  return Icons[icons];
}

export default getIcon;
