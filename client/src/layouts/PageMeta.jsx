import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const PageMeta = ({ title, description = "" }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="react, helmet, meta tags" />
        <meta charset="UTF-8" />
      </Helmet>
    </HelmetProvider>
  );
};

PageMeta.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default PageMeta;
