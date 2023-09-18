import styled from "styled-components";
import { Container } from "react-bootstrap";
import Modal from "./../Modal/Modal";

const HeaderComponent = styled.header`
  padding: 5rem 0;
  height: 80vh;
  background-image: url("https://images.unsplash.com/photo-1694675042062-f73713a6a122?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60");
`;

const HeaderContainer = styled.div`
  background-color: rgba(5, 148, 112, 0.85);
  padding: 3rem;
  color: #fff;
  width: 35rem;
  border-radius: 10px;
`;

const Heading = styled.h1`
  font-size: 3.8rem;
`;

const SubHeading = styled.h3`
  margin: 1rem 0;
  font-weight: 400;
`;

export default function Hero() {
  return (
    <HeaderComponent>
      <Container>
        <HeaderContainer>
          <Heading>Feed your mind with the best</Heading>
          <SubHeading>
            Grow, learn, and become more sucessfull by reading some of the top
            articles by highly reputable individuals
          </SubHeading>
          <Modal text="Sign up" variant="primary" />
          <Modal text="Sign in" variant="primary" />
        </HeaderContainer>
      </Container>
    </HeaderComponent>
  );
}
