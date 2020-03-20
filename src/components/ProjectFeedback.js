import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { orderBy } from 'lodash-es';
import PropTypes from 'prop-types';
import { useAuth } from 'components/Auth';
import EmbeddedContent from 'components/EmbeddedContent';
import Rating from 'components/Rating';
import SetRating from 'components/SetRating';
import { H2, Text } from 'components/Typography';
import { DATE_FORMAT } from 'utils/constants';
import * as feedbackApi from 'utils/feedbackApi';
import { formatAddress } from 'utils/formatAddress';
import * as S from './ProjectFeedback.styles';

function ProjectFeedback({ project, ...props }) {
  const { authUser, isAuthenticated, showLoginModal } = useAuth();
  const [feedback, setFeedback] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isWorking, setIsWorking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    loadFeedback(project.id);
    setRating(0);
    setComment('');
    setError('');
  }, [project.id]);

  async function loadFeedback(projectId) {
    const feedback = await feedbackApi.getFeedback(projectId);
    setFeedback(orderBy(feedback, ['updated_date'], ['desc']));
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
      await feedbackApi.addFeedback(project.id, rating, comment);
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
    if (!authUser.can_submit_feedback) {
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

  async function handleDeleteFeedback(feedbackId) {
    setIsDeleting(feedbackId);
    await feedbackApi.deleteFeedback(feedbackId);
    await loadFeedback(project.id);
    setIsDeleting(null);
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
            <S.Feedback>
              <S.LogoAndHeader>
                <S.UserIcon userLevel={authUser.level} />
                <S.FeedbackHeader>
                  <S.FeedbackTitle>
                    <Text heavy>{authUser.level}</Text>
                    <Text small muted style={{ marginLeft: '0.5rem' }}>
                      ({formatAddress(authUser.username)})
                    </Text>
                  </S.FeedbackTitle>
                  <Text small muted className="feedback-date">
                    <span className="md-show">on </span>
                    {format(new Date(), DATE_FORMAT)}
                  </Text>
                </S.FeedbackHeader>
              </S.LogoAndHeader>
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
                <Text small error className="error-message">
                  {error}
                </Text>
                <S.PrimaryButton type="button" onClick={handleLeaveFeedback} disabled={isWorking}>
                  Leav{isWorking ? 'ing' : 'e'} feedback
                </S.PrimaryButton>
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
        {feedback.map(feedback => {
          const isMyFeedback = isAuthenticated && feedback.username === authUser.username;
          return (
            <S.FeedbackItem key={feedback.id}>
              <S.Feedback>
                <S.LogoAndHeader>
                  <S.UserIcon userLevel={feedback.level} />
                  <S.FeedbackHeader>
                    <S.FeedbackTitle>
                      <Text heavy>{feedback.level}</Text>
                      <Text small muted style={{ marginLeft: '0.5rem' }}>
                        ({formatAddress(feedback.username)})
                      </Text>
                    </S.FeedbackTitle>
                    <Text small muted className="feedback-date">
                      <span className="md-show">on </span>
                      {format(new Date(feedback.updated_date), DATE_FORMAT)}
                    </Text>
                  </S.FeedbackHeader>
                </S.LogoAndHeader>
                <S.RatingAndActions>
                  <Rating overall={feedback.rating} />
                  {isMyFeedback && (
                    <S.EditActions>
                      <S.SecondaryButton
                        type="button"
                        onClick={() => handleDeleteFeedback(feedback.id)}
                        disabled={isDeleting !== null}
                      >
                        Delet{isDeleting === feedback.id ? 'ing' : 'e'}
                      </S.SecondaryButton>
                    </S.EditActions>
                  )}
                </S.RatingAndActions>
                <EmbeddedContent content={feedback.comment} style={{ marginTop: '2rem' }} />
              </S.Feedback>
            </S.FeedbackItem>
          );
        })}
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
