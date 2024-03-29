import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Container from 'components/ui/Container';
import Button from 'components/ui/Button';
import TitleSection from 'components/ui/TitleSection';
import FormatHtml from 'components/utils/FormatHtml';

import * as Styled from './styles';

const Banner = ({ title, subtitle, content, linkTo, linkText }) => (
  <Styled.Banner>
    <Container section>
      <TitleSection title={title} subtitle={subtitle} />
      <FormatHtml content={content} />
      <Link to={linkTo}>
        <br></br>
        <Button primary>{linkText}</Button>
      </Link>
    </Container>
  </Styled.Banner>
);

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  content: PropTypes.any.isRequired,
  linkTo: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired
};

export default Banner;
