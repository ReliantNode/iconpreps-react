import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'components/Auth';
import Rating from 'components/Rating';
import { H2, Text } from 'components/Typography';
import { getFeedback } from 'utils/feedbackApi';
import * as S from './ProjectFeedback.styles';

function ProjectFeedback({ project, ...props }) {
  const { isAuthenticated, showLoginModal } = useAuth();
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    getFeedback(project.id).then(feedback => setFeedback(feedback));
  }, [project.id]);

  return (
    <>
      <S.Header {...props}>
        <H2>Ratings and feedback</H2>
        {!isAuthenticated && (
          <S.LoginButton type="button" onClick={showLoginModal}>
            Add your feedback
          </S.LoginButton>
        )}
      </S.Header>

      <S.AverageRating>
        <Text style={{ fontWeight: 500 }}>Average rating</Text>
        <Rating
          overall={project.rating}
          total={project.rating_count}
          style={{ marginLeft: '1.5rem' }}
          terse
        />
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
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    rating_count: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProjectFeedback;
