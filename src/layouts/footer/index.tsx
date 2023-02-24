import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectDisplayLayout } from '@/store/slices/layoutSlice';
// import Github from '@/static/images/icon/github.svg';
// import LinkedIn from '@/static/images/icon/linkedin.svg';
// import StackOverflow from '@/static/images/icon/stack-overflow.svg';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { footer } = useSelector(selectDisplayLayout);
  if (!footer) {
    return null;
  }
  return (
    <div id="footer">
      <div className="socials"></div>
      <h3>{t('footer.copy_right')}</h3>
    </div>
  );
};

export default Footer;
