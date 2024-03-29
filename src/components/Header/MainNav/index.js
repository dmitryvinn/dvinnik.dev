import React, { useState } from 'react';

import * as Styled from './styles';

const mainNavItems = [
  {
    title: 'About Me',
    slug: '/'
  },
  {
    title: 'Articles',
    slug: '/articles/'
  },
  {
    title: 'Videos',
    slug: '/videos/'
  },
  {
    title: 'Events',
    slug: '/events/'
  },
  {
    title: 'Courses',
    slug: '/courses/'
  },
  {
    title: 'Conversations',
    slug: '/conversations/'
  },
  {
    title: 'Presentations',
    slug: '/presentations/'
  },
  {
    title: 'DevRel Resources',
    slug: '/devrel-resources/'
  },
  {
    title: 'Contact Me',
    slug: '/contact/'
  }
];

const MainNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Styled.MainNav open={open}>
        {mainNavItems.map((item, index) => (
          <Styled.MainNavItem
            key={`nav-item-${index}`}
            to={item.slug}
            activeClassName="active"
            whileTap={{ scale: 0.9 }}
          >
            {item.title}
          </Styled.MainNavItem>
        ))}
      </Styled.MainNav>
      <Styled.ToogleMainNav open={open} onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </Styled.ToogleMainNav>
    </>
  );
};

export default MainNav;
