import React from 'react'
import styled from 'styled-components'

interface Props {
  
}

const StoreBanner = (props: Props) => {  
  return (
    <Container>
      <Header>Welcome to Shunfa Bakery</Header>
    </Container>
  )
}

export default StoreBanner;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;  
  color: black;
`
const Header = styled.h1``