import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useNavigate } from 'react-router';

import styled from 'styled-components/macro';
import { Newbox } from './SmallComponents';

import { useSelector } from 'react-redux';
import { greetingMessage } from '../helpers/extraFunctions';
const ModalComp = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { speak } = useSpeechSynthesis();
  const {
    weatherData: data,
    sourceInput,
    destInput,
  } = useSelector((state) => state.weatherInfo);

  const handleOpenClick = (e) => {
    e.preventDefault();
    onOpen();
    let greeting = greetingMessage();

    let speechText = ` ${greeting}! Current temperature in ${
      data.name
    } is ${Math.round(
      data.main.temp - 273
    )} degree Celcius, and the weather is a bit ${data.weather[0].main}y`;

    speak({
      text: speechText,
      voice: window.speechSynthesis.getVoices()[10],
    });
  };

  const handleWeatherNavigate = () => {
    if (!Object.keys(sourceInput).length || !Object.keys(destInput).length) {
      alert('Please select Source and Destination');
    } else navigate('/weather');
  };

  return (
    <>
      <div
        css={`
          display: flex;
          gap: 5px;
        `}
      >
        <NavButton onClick={handleOpenClick}>My Location Weather</NavButton>
        <NavButton
          title="Check Detailed Weather Forecast of Source and Destination"
          onClick={handleWeatherNavigate}
        >
          Check Details
        </NavButton>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Current Location Weather Data </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Newbox>
              <Box color={'#3b8231'} p={'20px'} textAlign={'center'}>
                <Flex justify={'end'}></Flex>

                <Heading>{data?.name}</Heading>
                <Heading
                  fontSize={['100px', '120px', '120px', '100px', '120px']}
                >
                  {Math.round(data?.main.temp - 273)}
                  <sup>o</sup>C
                </Heading>
                <Heading>{data?.weather[0].main}</Heading>
              </Box>
            </Newbox>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;

const NavButton = styled.button`
  background: #fff;
  color: #000;
  border: 2px solid #3b8231;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 5px;

  &:hover {
    background: #3b8231;
    color: #fff;
    opacity: 1;
  }
`;
