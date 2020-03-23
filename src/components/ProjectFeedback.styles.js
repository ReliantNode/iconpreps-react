import styled from 'styled-components';
import goldfishIcon from 'assets/icons/goldfish.svg';
import marlinIcon from 'assets/icons/marlin.svg';
import octopusIcon from 'assets/icons/octopus.svg';
import stingrayIcon from 'assets/icons/stingray.svg';
import turtleIcon from 'assets/icons/turtle.svg';
import whaleIcon from 'assets/icons/whale.svg';
import { USER_LEVELS } from 'utils/constants';
import { breakpoints, palette } from 'utils/designTokens';

export const Header = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: ${breakpoints.max.sm}) {
    justify-content: space-between;
  }
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

  @media screen and (max-width: ${breakpoints.max.sm}) {
    margin-top: 3rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    margin-top: 4rem;
  }
`;

export const FeedbackList = styled.div`
  @media screen and (max-width: ${breakpoints.max.sm}) {
    margin: 3rem 0;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    margin-top: 4rem;
  }
`;

export const FeedbackItem = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-top: 2rem;
`;

function getUserIcon(userLevel) {
  switch (userLevel) {
    case USER_LEVELS.WHALE:
      return whaleIcon;
    case USER_LEVELS.MARLIN:
      return marlinIcon;
    case USER_LEVELS.STINGRAY:
      return stingrayIcon;
    case USER_LEVELS.OCTOPUS:
      return octopusIcon;
    case USER_LEVELS.TURTLE:
      return turtleIcon;
    case USER_LEVELS.GOLDFISH:
      return goldfishIcon;
    case USER_LEVELS.NON_ICONIST:
      return null;
    default:
      throw new Error(`Invalid user level ${userLevel}`);
  }
}

function getUserColor(userLevel) {
  switch (userLevel) {
    case USER_LEVELS.WHALE:
      return palette.users.whale;
    case USER_LEVELS.MARLIN:
      return palette.users.marlin;
    case USER_LEVELS.STINGRAY:
      return palette.users.stingray;
    case USER_LEVELS.OCTOPUS:
      return palette.users.octopus;
    case USER_LEVELS.TURTLE:
      return palette.users.turtle;
    case USER_LEVELS.GOLDFISH:
      return palette.users.goldfish;
    case USER_LEVELS.NON_ICONIST:
      return palette.gray.dark;
    default:
      throw new Error(`Invalid user level ${userLevel}`);
  }
}

export const UserIcon = styled.div`
  flex-shrink: 0;
  width: 6rem;
  height: 6rem;
  background: ${({ userLevel }) =>
    `no-repeat center/2.8rem url(${getUserIcon(userLevel)}) ${getUserColor(userLevel)}`};
  border-radius: 100%;

  @media screen and (min-width: ${breakpoints.min.md}) {
    position: absolute;
    left: 0;
    top: 1rem;
  }
`;

export const Separator = styled.hr`
  width: 100%;
  height: 1px;
  background: ${palette.gray.border};
  border: none;
  margin: 4rem 0;
`;

export const Feedback = styled.div`
  flex: 1;
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.6rem;
  box-shadow: 0 2px 5px 0 rgba(206, 210, 219, 0.5);

  @media screen and (max-width: ${breakpoints.max.sm}) {
    padding: 2rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    padding: 3rem 4rem;
    margin-left: 8rem;
  }
`;

export const LogoAndHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const FeedbackHeader = styled.div`
  @media screen and (max-width: ${breakpoints.max.sm}) {
    margin-left: 2rem;

    .feedback-date {
      margin-top: 0.8rem;
    }
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    display: flex;
    align-items: center;

    .feedback-date {
      margin-left: 0.5rem;
    }
  }
`;

export const FeedbackTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  height: 10rem;
  min-height: 5rem;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2.2rem;
  color: ${palette.black};
  background: ${palette.background};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.3rem;
  resize: vertical;
  padding: 1rem;
  margin-top: 2rem;

  &:focus {
    outline: none;
    border-color: ${palette.brand.primary};
  }
`;

export const RatingAndActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${breakpoints.max.sm}) {
    margin-top: 3rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    margin-top: 1.4rem;
  }
`;

export const EditActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (min-width: ${breakpoints.min.md}) {
    position: absolute;
    top: 3rem;
    right: 3rem;
  }
`;

export const FeedbackActions = styled.div`
  margin-top: 2rem;

  @media screen and (min-width: ${breakpoints.min.md}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.2rem;
  color: ${palette.white};
  background: ${palette.brand.primary};
  border: none;
  border-radius: 0.4rem;
  padding: 0;
  cursor: pointer;

  &[disabled] {
    background: ${palette.brand.dark};
  }

  &:focus {
    outline: none;
    border: 2px solid ${palette.gray.border};
  }

  @media screen and (max-width: ${breakpoints.max.sm}) {
    width: 100%;
    margin-top: 2rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    width: 23rem;
    margin-left: 2rem;
  }
`;

export const SecondaryButton = styled.button`
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.8rem;
  color: ${palette.black};
  background: none;
  border: none;
  border-bottom: 1px solid ${palette.black};
  padding: 0;
  cursor: pointer;

  &[disabled] {
    color: ${palette.gray.dark};
  }

  &:focus {
    outline: none;
    border-color: ${palette.brand.primary};
  }
`;
