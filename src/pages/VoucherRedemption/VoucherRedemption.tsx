import React from 'react'
import styled from 'styled-components'
import StoreBanner from "./StoreBanner"
import Landing from "./Landing"
import Location from "./Location"

interface Props {
  menuOpen: boolean;
}

const VoucherRedemption = (props: Props) => {
  console.log("hello")
  return (
    <Container menuOpen={props.menuOpen}>
      <StoreBanner/>
      <Landing/>
      <Location/>      
    </Container>
  )
}

export default VoucherRedemption

const Container = styled.div`
  width: 100%%;
  margin: 0 auto;
  background-color: white;
  display: ${(props:Props) => props.menuOpen ? "none" : "flex"};
  flex-direction: column
`