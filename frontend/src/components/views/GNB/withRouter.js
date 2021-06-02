import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header``;
const Item = styled.li`
  border-bottom: 3px solid ${(props) => (props.current ? '#black' : '#hotpink')};
`;

export default withRouter(({ location: { pathname } }) => (
  <>
    <Header>
      <ul>
        <Item current={pathname === '/main'}>Main</Item>
        <Item current={pathname === '/productList'}>ProductList</Item>
        <Item current={pathname === '/intro'}>Intro</Item>
      </ul>
    </Header>
  </>
));
