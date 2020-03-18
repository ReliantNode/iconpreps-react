import React, { useEffect, useState } from 'react';
import { useParams } from '@reach/router';
import { format } from 'date-fns';
import { pick, shuffle, take } from 'lodash-es';
import Category from 'components/Category';
import Completion from 'components/Completion';
import Layout from 'components/Layout';
import { Logo, LogoWrapper } from 'components/Logo';
import { usePReps } from 'components/PReps';
import ProjectFeedback from 'components/ProjectFeedback';
import ProjectStatus from 'components/ProjectStatus';
import { useProjects } from 'components/Projects';
import RankBanner from 'components/RankBanner';
import Rating from 'components/Rating';
import { H1, H2, H4, H5, H6, Text, UnstyledLink } from 'components/Typography';
import { DATE_FORMAT } from 'utils/constants';
import { getProject } from 'utils/projectsApi';
import * as S from './ProjectDetail.styles';

function ProjectDetailPage() {
  const { projectId } = useParams();
  const { getPReps, hasPReps } = usePReps();
  const { getProjects, hasProjects } = useProjects();
  const [rawProject, setRawProject] = useState(null);
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
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

      const relatedProjects = take(
        shuffle(
          getProjects().filter(
            project => project.category === listProject.category && project.id !== listProject.id
          )
        ),
        3
      );
      setRelatedProjects(relatedProjects);

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
                <S.ProjectOverview>
                  <S.ProjectOverviewItem>
                    <H6>Status</H6>
                    <ProjectStatus status={project.status} />
                  </S.ProjectOverviewItem>
                  <S.ProjectOverviewItem>
                    <H6>Completed</H6>
                    <Completion completed={project.progress} />
                  </S.ProjectOverviewItem>
                  <S.ProjectOverviewItem style={{ flex: 1 }}>
                    <H6>Project timeline</H6>
                    <Text small>
                      {format(new Date(project.start_date), DATE_FORMAT)}&nbsp;-&nbsp;
                      {format(new Date(project.end_date), DATE_FORMAT)}
                    </Text>
                  </S.ProjectOverviewItem>
                  <S.ProjectOverviewItem>
                    <H6>Last updated</H6>
                    <Text small>{format(new Date(project.updated_date), DATE_FORMAT)}</Text>
                  </S.ProjectOverviewItem>
                </S.ProjectOverview>
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
                <RankBanner
                  rank={pRep.rank}
                  style={{ position: 'absolute', top: '-8px', right: '3rem' }}
                />
                <S.PRepDetail>
                  <LogoWrapper>
                    {pRep.logo && <Logo src={pRep.logo} alt={`${pRep.name} logo`} />}
                  </LogoWrapper>
                  <div style={{ marginLeft: '1.5rem' }}>
                    <H4>{pRep.name}</H4>
                    <Text muted style={{ marginTop: '0.5rem' }}>
                      {pRep.city}, {pRep.country}
                    </Text>
                  </div>
                </S.PRepDetail>
                <S.PRepLink to={`/preps/${pRep.address}`}>View more of their projects</S.PRepLink>
              </S.Card>

              <S.Card>
                <H2>More {project.category.toLowerCase()} projects</H2>
                {relatedProjects.map(project => (
                  <S.RelatedProject key={project.id}>
                    <H5>
                      <UnstyledLink to={`/projects/${project.id}`}>{project.name}</UnstyledLink>
                    </H5>
                    <Rating
                      overall={project.rating}
                      total={project.rating_count}
                      style={{ marginTop: '1rem' }}
                    />
                    <Text small style={{ marginTop: '1.5rem' }}>
                      {project.description}
                    </Text>
                  </S.RelatedProject>
                ))}
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
