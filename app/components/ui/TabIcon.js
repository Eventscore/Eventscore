//<TabIcon icon={'search'} selected={false} />
import React, { PropTypes } from 'react';
import { Icon } from 'react-native-elements';

import { AppColors } from '@theme/';

const TabIcon = ({ icon, selected }) => (
  <Icon
    name={icon}
    size={26}
    color={selected ? AppColors.tabbar.iconSelected : AppColors.tabbar.iconDefault}
  />
);

TabIcon.propTypes = { icon: PropTypes.string.isRequired, selected: PropTypes.bool };
TabIcon.defaultProps = { icon: 'search', selected: false };

export default TabIcon;
