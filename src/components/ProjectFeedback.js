import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'components/Auth';
import Rating from 'components/Rating';
import { H2, Text } from 'components/Typography';
import { getFeedback } from 'utils/feedbackApi';
import * as S from './ProjectFeedback.styles';

const mockProjectRatings = {
  overall: 4,
  total: 12,
};

function ProjectFeedback({ projectId, ...props }) {
  const { isAuthenticated } = useAuth();
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    getFeedback(projectId).then(feedback => setFeedback(feedback));
  }, [projectId]);

  function handleSignIn() {
    console.log('Sign in!');
  }

  return (
    <>
      <S.Header {...props}>
        <H2>Ratings and feedback</H2>
        {!isAuthenticated && (
          <S.LoginButton type="button" onClick={handleSignIn}>
            Add your feedback
          </S.LoginButton>
        )}
      </S.Header>

      <S.AverageRating>
        <Text style={{ fontWeight: 500 }}>Average rating</Text>
        <Rating {...mockProjectRatings} terse style={{ marginLeft: '1.5rem' }} />
      </S.AverageRating>

      <S.FeedbackList>
        {feedback.map(feedback => (
          <S.FeedbackItem key={feedback.id}>
            <S.UserIcon userLevel={feedback.user_level} />
            <S.Feedback>
              <S.FeedbackHeader>
                <Text heavy>{feedback.user_level}</Text>
                <Text small muted style={{ textDecoration: 'underline', marginLeft: '0.5rem' }}>
                  ({feedback.username})
                </Text>
                <Text small muted style={{ marginLeft: '0.5rem' }}>
                  on Mar 5, 2020
                </Text>
              </S.FeedbackHeader>
              <Rating overall={feedback.rating} style={{ marginTop: '1.4rem' }} />
              <S.Comment>{feedback.comment}</S.Comment>
            </S.Feedback>
          </S.FeedbackItem>
        ))}
      </S.FeedbackList>
    </>
  );
}

ProjectFeedback.propTypes = {
  projectId: PropTypes.number.isRequired,
};

export default ProjectFeedback;
