import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer = () => {
  const intl = useIntl();
  return (
    <DefaultFooter
      links={[
        {
          title: 'TSC Breeder Farm',
          href: 'https://visitour.app',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
