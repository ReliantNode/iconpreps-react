import styled from 'styled-components';
import goldfishIcon from 'assets/icons/goldfish.svg';
import marlinIcon from 'assets/icons/marlin.svg';
import octopusIcon from 'assets/icons/octopus.svg';
import stingrayIcon from 'assets/icons/stingray.svg';
import turtleIcon from 'assets/icons/turtle.svg';
import whaleIcon from 'assets/icons/whale.svg';
import { palette } from 'utils/designTokens';

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const LoginButton = styled.button`
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.8rem;
  color: ${palette.black};
  background: none;
  border: 1px solid ${palette.black};
  border-radius: 0.3rem;
  padding: 0.6rem 1rem;
  margin-left: 2rem;
  cursor: pointer;
`;

export const AverageRating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4rem;
`;

export const FeedbackList = styled.div`
  margin-top: 4rem;
`;

export const FeedbackItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 2rem;
`;

export const Feedback = styled.div`
  flex: 1;
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.6rem;
  box-shadow: 0 2px 5px 0 rgba(206, 210, 219, 0.5);
  padding: 3rem 4rem;
  margin-left: 2rem;
`;

export const FeedbackHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const Comment = styled.div`
  margin-top: 2rem;
  /* TODO: handle styling HTML elements? */
`;

function getUserIcon(userLevel) {
  switch (userLevel) {
    case 'Whale':
      return whaleIcon;
    case 'Marlin':
      return marlinIcon;
    case 'Stingray':
      return stingrayIcon;
    case 'Octopus':
      return octopusIcon;
    case 'Turtle':
      return turtleIcon;
    case 'Goldfish':
    default:
      return goldfishIcon;
  }
}

function getUserColor(userLevel) {
  switch (userLevel) {
    case 'Whale':
      return palette.users.whale;
    case 'Marlin':
      return palette.users.marlin;
    case 'Stingray':
      return palette.users.stingray;
    case 'Octopus':
      return palette.users.octopus;
    case 'Turtle':
      return palette.users.turtle;
    case 'Goldfish':
    default:
      return palette.users.goldfish;
  }
}

export const UserIcon = styled.div`
  width: 6rem;
  height: 6rem;
  background: ${({ userLevel }) =>
    `no-repeat center/2.8rem url(${getUserIcon(userLevel)}) ${getUserColor(userLevel)}`};
  border-radius: 100%;
  margin-top: 1rem;
`;
