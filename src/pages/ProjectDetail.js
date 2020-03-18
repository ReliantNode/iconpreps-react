import React, { useEffect, useState } from 'react';
import { useParams } from '@reach/router';
import { pick } from 'lodash-es';
import Category from 'components/Category';
import Layout from 'components/Layout';
import { usePReps } from 'components/PReps';
import ProjectFeedback from 'components/ProjectFeedback';
import { useProjects } from 'components/Projects';
import Rating from 'components/Rating';
import { H1, H2, Text } from 'components/Typography';
import { getProject } from 'utils/projectsApi';
import * as S from './ProjectDetail.styles';

function ProjectDetailPage() {
  const { projectId } = useParams();
  const { getPReps, hasPReps } = usePReps();
  const { getProjects, hasProjects } = useProjects();
  const [rawProject, setRawProject] = useState(null);
  const [project, setProject] = useState(null);
  const [pRep, setPRep] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getProject(projectId)
      .then(project => setRawProject(project))
      .catch(() => setRawProject(null));
  }, [projectId]); // eslint-disable-line

  useEffect(() => {
    if (hasPReps && hasProjects && rawProject) {
      const pRep = getPReps().find(pRep => pRep.address === rawProject.prep_address);
      setPRep(pRep);

      const listProject = getProjects().find(project => String(project.id) === projectId);
      setProject({
        ...rawProject,
        ...pick(listProject, ['category', 'progress', 'status', 'rating', 'rating_count']),
      });

      setIsLoading(false);
    }
  }, [hasPReps, hasProjects, rawProject]); // eslint-disable-line

  return (
    <Layout>
      {project && (
        <>
          <S.Header>
            <H1>{project.name}</H1>
            <Category category={project.category} style={{ marginLeft: '5rem' }} />
          </S.Header>
          <Rating
            overall={project.rating}
            total={project.rating_count}
            style={{ marginTop: '1.5rem' }}
          />
          <Text style={{ marginTop: '2rem' }}>{project.description}</Text>

          <S.Container>
            <S.Main>
              <S.Card>
                <H2>Project overview</H2>
              </S.Card>

              <S.Card>
                <H2 style={{ marginBottom: '2rem' }}>Description</H2>
                <S.ProjectDescription dangerouslySetInnerHTML={{ __html: project.details }} />
              </S.Card>

              <S.Card>
                <H2>Updates</H2>
              </S.Card>

              <ProjectFeedback project={project} style={{ marginTop: '5rem' }} />
            </S.Main>

            <S.Sidebar>
              <S.Card>
                <H2>P-Rep team</H2>
              </S.Card>

              <S.Card>
                <H2>More development projects</H2>
              </S.Card>
            </S.Sidebar>
          </S.Container>
        </>
      )}

      {!(isLoading || rawProject) && (
        <>
          <H1>Project not found</H1>
          <Text style={{ marginTop: '2rem' }}>The project '{projectId}' doesn't exist.</Text>
        </>
      )}
    </Layout>
  );
}

export default ProjectDetailPage;
