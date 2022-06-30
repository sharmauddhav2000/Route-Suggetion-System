import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from '../Loading';
import { Newbox, NewText } from '../SmallComponents';
import { celsius, greetingMessage } from '../../helpers/extraFunctions';

import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { getWeatherDest, getWeatherSource } from '../weather.slice';
import { useSpeechSynthesis } from 'react-speech-kit';
const WeatherData = () => {
  const {
    sourceInput,
    destInput,
    sourceWeatherData,
    destWeatherData,
    isLoading,
  } = useSelector((state) => state.weatherInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { speak } = useSpeechSynthesis();
  useEffect(() => {
    dispatch(getWeatherSource(sourceInput?.geometry?.coordinates));
    dispatch(getWeatherDest(destInput?.geometry.coordinates));
  }, []);
  const handleSourcePlayClick = () => {
    let greeting = greetingMessage();

    let speechText = ` ${greeting}! Current temperature in ${
      sourceWeatherData?.data?.name
    } is ${Math.round(
      sourceWeatherData?.data.main.temp - 273
    )} degree Celcius, and the weather is a bit ${
      sourceWeatherData?.data.weather[0].main
    }y`;

    speak({
      text: speechText,
      voice: window.speechSynthesis.getVoices()[10],
    });
  };
  const handleDestPlayClick = () => {
    let greeting = greetingMessage();

    let speechText = ` ${greeting}! Current temperature in ${
      destWeatherData?.data.name
    } is ${Math.round(
      destWeatherData?.data.main.temp - 273
    )} degree Celcius, and the weather is a bit ${
      destWeatherData?.data.weather[0].main
    }y`;

    speak({
      text: speechText,
      voice: window.speechSynthesis.getVoices()[10],
    });
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <button onClick={() => navigate('/')}>Go Back</button>
      <Box maxW={'1400px'} m={'20px auto 5px'} p={'20px'} minH={'550px'}>
        <Heading fontSize={'20px'} marginBottom={'15px'}>
          ORIGIN DATA
        </Heading>

        <Grid
          gridTemplateColumns={['100%', 'repeat(2, 1fr)', 'repeat(2, 1fr)']}
          gap={'30px'}
        >
          <Newbox>
            <Box color={'#3b8231'} p={'20px'} textAlign={'center'}>
              <Flex justify={'end'}></Flex>

              <Heading>{sourceWeatherData?.data?.name}</Heading>
              <Heading fontSize={['100px', '120px', '120px', '100px', '120px']}>
                {Math.round(sourceWeatherData?.data?.main.temp - 273)}
                <sup>o</sup>C
              </Heading>
              <Heading>{sourceWeatherData?.data?.weather[0].main}</Heading>
              <PlayButton onClick={handleSourcePlayClick}>
                <FaPlay />
              </PlayButton>
            </Box>
          </Newbox>

          <Newbox>
            <Grid templateColumns={'50% 50%'} h={'100%'} p={'8px'}>
              <Box py={'10px'} pl={'15%'}>
                {[
                  'Felt Temp.',
                  'Humidity',
                  'Wind',
                  'Visibility',
                  'Max Temp.',
                  'Min Temp.',
                ].map((e, i) => (
                  <Text
                    key={i}
                    color={'#3b8231'}
                    fontWeight={500}
                    mt={'15px'}
                    fontSize={'18px'}
                  >
                    {e}
                  </Text>
                ))}
              </Box>
              <Box borderRadius={'30px'} bg={'#3b8231'} py={'10px'} pl={'15%'}>
                <NewText>
                  {celsius(sourceWeatherData?.data.main.feels_like)}
                  <sup>o</sup> C
                </NewText>
                <NewText>{sourceWeatherData?.data.main.humidity}%</NewText>
                <NewText>
                  {(sourceWeatherData?.data.wind.speed * 3.6).toFixed(2)} Km/h
                </NewText>
                <NewText>
                  {(sourceWeatherData?.data.visibility * 0.001).toFixed(2)} Km
                </NewText>
                <NewText>
                  {celsius(sourceWeatherData?.data.main.temp_max)}
                  <sup>o</sup> C
                </NewText>
                <NewText>
                  {celsius(sourceWeatherData?.data.main.temp_min)}
                  <sup>o</sup> C
                </NewText>
              </Box>
            </Grid>
          </Newbox>
        </Grid>
        <Heading fontSize={'20px'} marginBottom={'15px'}>
          DESTINATION DATA
        </Heading>
        <Grid
          gridTemplateColumns={['100%', 'repeat(2, 1fr)', 'repeat(2, 1fr)']}
          gap={'30px'}
        >
          <Newbox>
            <Box color={'#3b8231'} p={'20px'} textAlign={'center'}>
              <Flex justify={'end'}></Flex>

              <Heading>{destWeatherData?.data.name}</Heading>
              <Heading fontSize={['100px', '120px', '120px', '100px', '120px']}>
                {Math.round(destWeatherData?.data.main.temp - 273)}
                <sup>o</sup>C
              </Heading>
              <Heading>{destWeatherData?.data.weather[0].main}</Heading>
              <PlayButton onClick={handleDestPlayClick}>
                <FaPlay />
              </PlayButton>
            </Box>
          </Newbox>

          <Newbox>
            <Grid templateColumns={'50% 50%'} h={'100%'} p={'8px'}>
              <Box py={'10px'} pl={'15%'}>
                {[
                  'Felt Temp.',
                  'Humidity',
                  'Wind',
                  'Visibility',
                  'Max Temp.',
                  'Min Temp.',
                ].map((e, i) => (
                  <Text
                    key={i}
                    color={'#3b8231'}
                    fontWeight={500}
                    mt={'15px'}
                    fontSize={'18px'}
                  >
                    {e}
                  </Text>
                ))}
              </Box>
              <Box borderRadius={'30px'} bg={'#3b8231'} py={'10px'} pl={'15%'}>
                <NewText>
                  {celsius(destWeatherData?.data.main.feels_like)}
                  <sup>o</sup> C
                </NewText>
                <NewText>{destWeatherData?.data.main.humidity}%</NewText>
                <NewText>
                  {(destWeatherData?.data.wind.speed * 3.6).toFixed(2)} Km/h
                </NewText>
                <NewText>
                  {(destWeatherData?.data.visibility * 0.001).toFixed(2)} Km
                </NewText>
                <NewText>
                  {celsius(destWeatherData?.data.main.temp_max)}
                  <sup>o</sup> C
                </NewText>
                <NewText>
                  {celsius(destWeatherData?.data.main.temp_min)}
                  <sup>o</sup> C
                </NewText>
              </Box>
            </Grid>
          </Newbox>
        </Grid>
      </Box>
    </>
  );
};

export default WeatherData;

export const PlayButton = styled.button`
  background: #fff;
  color: #3b8231;
  padding: 10px;

  border: 3px solid #3b8231;
  border-radius: 50%;
  &:hover {
    color: #fff;
    background: #3b8231;
  }
`;
