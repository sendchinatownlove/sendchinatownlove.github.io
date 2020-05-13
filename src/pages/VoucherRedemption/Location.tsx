import React from 'react'
import styled from 'styled-components'

interface Props {
  
}

const Location = (props: Props) => {
  return (
    <Container>
      6221 Fort Hamilton Pkwy,
      Brooklyn, NY 11219
    </Container>
  )
}

export default Location;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  color: #AB192E;
`