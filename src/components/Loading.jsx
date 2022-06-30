import { Container } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <Container mt={['200px', '100px']}>
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </Container>
  );
};
