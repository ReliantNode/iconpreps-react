import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useAuth } from 'components/Auth';
import Rating from 'components/Rating';
import SetRating from 'components/SetRating';
import { H2, Text } from 'components/Typography';
import { DATE_FORMAT, USER_LEVELS } from 'utils/constants';
import { addFeedback, getFeedback } from 'utils/feedbackApi';
import { formatAddress } from 'utils/formatAddress';
import * as S from './ProjectFeedback.styles';

function ProjectFeedback({ project, ...props }) {
  const { authUser, isAuthenticated, showLoginModal } = useAuth();
  const [feedback, setFeedback] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    loadFeedback(project.id);
    setRating(0);
    setComment('');
    setError('');
  }, [project.id]);

  async function loadFeedback(projectId) {
    const feedback = await getFeedback(projectId);
    setFeedback(feedback);
  }

  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  async function handleLeaveFeedback(event) {
    event.preventDefault();
    setIsWorking(true);

    const errorMessage = getValidationError();
    if (errorMessage) {
      setError(errorMessage);
      setIsWorking(false);
      return;
    } else {
      setError('');
    }

    try {
      const result = await addFeedback(project.id, rating, comment);
      console.log({ result });
      setRating(0);
      setComment('');
      loadFeedback(project.id);
    } catch (error) {
      console.error(`Failed adding feedback. ${error.message}`);
      setError('Failed adding feedback.');
    }

    setIsWorking(false);
  }

  function getValidationError() {
    if (authUser.level === USER_LEVELS.NON_ICONIST) {
      return 'You must delegate more ICX to leave feedback.';
    }
    if (!rating) {
      return 'You must choose a rating.';
    }
    if (!comment) {
      return 'You must enter a feedback comment.';
    }

    return false;
  }

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

      {isAuthenticated && (
        <>
          <S.FeedbackItem style={{ marginTop: '4rem' }}>
            <S.UserIcon userLevel={authUser.level} />
            <S.Feedback>
              <S.FeedbackHeader>
                <Text heavy>{authUser.level}</Text>
                <Text small muted style={{ textDecoration: 'underline', marginLeft: '0.5rem' }}>
                  ({formatAddress(authUser.username)})
                </Text>
                <Text small muted style={{ marginLeft: '0.5rem' }}>
                  on {format(new Date(), DATE_FORMAT)}
                </Text>
              </S.FeedbackHeader>
              <SetRating
                value={rating}
                onChange={rating => setRating(rating)}
                style={{ marginTop: '1.4rem' }}
              />
              <S.CommentInput
                value={comment}
                onChange={handleCommentChange}
                placeholder="What do you think of this project?"
              />
              <S.FeedbackActions>
                <Text small error>
                  {error}
                </Text>
                <S.FeedbackButton type="button" onClick={handleLeaveFeedback} disabled={isWorking}>
                  Leav{isWorking ? 'ing' : 'e'} feedback
                </S.FeedbackButton>
              </S.FeedbackActions>
            </S.Feedback>
          </S.FeedbackItem>
          <S.Separator />
        </>
      )}

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
            <S.Feedback>
              <S.LogoAndHeader>
                <S.UserIcon userLevel={feedback.level} />
                <S.FeedbackHeader>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Text heavy>{feedback.level}</Text>
                    <Text small muted style={{ textDecoration: 'underline', marginLeft: '0.5rem' }}>
                      ({formatAddress(feedback.username)})
                    </Text>
                  </div>
                  <Text small muted className="feedback-date">
                    <span className="md-show">on </span>
                    {format(new Date(feedback.updated_date), DATE_FORMAT)}
                  </Text>
                </S.FeedbackHeader>
              </S.LogoAndHeader>
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
