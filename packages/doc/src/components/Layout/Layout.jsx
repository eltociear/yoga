import React, { useState } from 'react';
import { arrayOf, object, shape } from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Helmet from 'react-helmet';
import { ThemeProvider, themes } from '@gympass/yoga';
import tokens from '@gympass/yoga-tokens';

import { Navigation, Documentation, Header, Dropdown } from '..';

const GlobalStyle = createGlobalStyle`
  #gatsby-focus-wrapper, #___gatsby {
    height: 100%;
  }

  html, body  {
    color: #666;
    font-family: 'Muli';
    height: 100%;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #333;
    font-weight: 300;
    margin: 45px 0 20px;
  }

  p {
    font-size: 18px;
    font-weight: 300;
    line-height: 1.8;
  }

  h1 {
    font-size: 48px;
    font-weight: 300;
    margin: 0;

    + p {
      color: #6b6b78;
      font-size: 18px;
      font-weight: 300;
      margin: 10px 0 50px;
    }
  }

  h2 {
    font-size: 30px;
  }

  h3 {
    font-size: 22px;
  }

  * {
    box-sizing: border-box;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const MainWrapper = styled.div`
  ${({
    theme: {
      colors: {
        primary: { length: len, [len - 1]: primaryColor },
      },
    },
  }) => `
    code {
      color: ${primaryColor};
      font-family: monospace;
      font-size: 14px;
    }

    a[target] {
      color: ${primaryColor};
      text-decoration: none;
    }
  `}
`;

const Grid = styled.div`
  ${({
    theme: {
      colors: { gray: grayPallete },
    },
  }) => `
    background-color: ${grayPallete[1]};
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
    'Header Header Header'
    'Navigation Documentation Summary';
  `};
`;

const Layout = ({
  data: {
    siteMetadata: { title, favicon },
  },
  nav,
  doc: { body, frontmatter },
}) => {
  const { metaTitle, metaDescription } = frontmatter;

  const allThemes = Object.keys(themes);
  const allLocales = Object.keys(tokens);

  const [theme, setTheme] = useState(allThemes.find(tm => tm === 'default'));
  const [locale, setLocale] = useState(allLocales.find(lc => lc === 'default'));

  return (
    <ThemeProvider theme={theme} locale={locale}>
      <Helmet>
        <script async src="https://snack.expo.io/embed.js" />
        <link rel="icon" type="image/png" href={favicon} sizes="32x32" />
        {metaTitle ? <title>{metaTitle}</title> : <title>{title}</title>}
        {metaTitle ? <meta name="title" content={metaTitle} /> : null}
        {metaDescription ? (
          <meta name="description" content={metaDescription} />
        ) : null}
        {metaTitle ? <meta property="og:title" content={metaTitle} /> : null}
        {metaDescription ? (
          <meta property="og:description" content={metaDescription} />
        ) : null}
        {metaTitle ? (
          <meta property="twitter:title" content={metaTitle} />
        ) : null}
        {metaDescription ? (
          <meta property="twitter:description" content={metaDescription} />
        ) : null}
      </Helmet>
      <GlobalStyle />

      <MainWrapper>
        <Grid>
          <Header>
            <Dropdown
              label="Theme:"
              value={theme}
              options={allThemes}
              onSelect={tm => setTheme(tm)}
            />
            <Dropdown
              label="Locale:"
              value={locale}
              options={allLocales}
              onSelect={lc => setLocale(lc)}
            />
          </Header>
          <Navigation items={nav} />
          <Documentation mdx={body} />
        </Grid>
      </MainWrapper>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  nav: arrayOf(object).isRequired,
  doc: shape({}).isRequired,
};

export default Layout;
