import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { pick, shuffle, take } from 'lodash-es';
import { useParams } from 'react-router-dom';
import noLogo from 'assets/no-logo.svg';
import Category from 'components/Category';
import Completion from 'components/Completion';
import EmbeddedContent from 'components/EmbeddedContent';
import Layout from 'components/Layout';
import Loading from 'components/Loading';
import { Logo, LogoWrapper } from 'components/Logo';
import Meta from 'components/Meta';
import { usePReps } from 'components/PReps';
import ProjectFeedback from 'components/ProjectFeedback';
import ProjectStatus from 'components/ProjectStatus';
import { useProjects } from 'components/Projects';
import Rating from 'components/Rating';
import { H1, H2, H4, H5, H6, Text, UnstyledLink } from 'components/Typography';
import { DATE_FORMAT, DATE_FORMAT_SHORTER } from 'utils/constants';
import { getLogoProxy } from 'utils/getLogoProxy';
import { getProject } from 'utils/projectsApi';
import * as S from './ProjectDetail.styles';

function ProjectDetailPage() {
  const { projectSlug } = useParams();
  const { getPReps, hasPReps } = usePReps();
  const { getProjects, hasProjects } = useProjects();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [pRep, setPRep] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hasPReps && hasProjects) {
      setIsLoading(true);
      loadProject();
    }
  }, [hasPReps, hasProjects, projectSlug]); // eslint-disable-line

  async function loadProject() {
    let rawProject;
    const listProject = getProjects().find(project => project.slug === projectSlug);
    if (!listProject) return setIsLoading(false);

    try {
      rawProject = await getProject(listProject.id);
    } catch (error) {
      console.error(`Failed loading project ${projectSlug}.`, error.message);
      return setIsLoading(false);
    }
    setProject({
      ...rawProject,
      ...pick(listProject, ['category', 'progress', 'status', 'rating', 'rating_count']),
    });

    const pRep = getPReps().find(pRep => pRep.address === rawProject.prep_address);
    setPRep(pRep);

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

  return (
    <Layout>
      {isLoading ? (
        <Loading style={{ marginTop: '8rem' }} />
      ) : project ? (
        <>
          <Meta
            title={project.name}
            description={project.description}
            logo={pRep.logo ? getLogoProxy(pRep.logo) : null}
            twitterUrl={pRep.twitter ? pRep.twitter : null}
          />

          <S.Header>
            <H1>{project.name}</H1>
            <Category
              category={project.category}
              style={{ marginLeft: '5rem' }}
              className="md-show"
            />
          </S.Header>
          <Rating
            overall={project.rating}
            total={project.rating_count}
            style={{ marginTop: '1.5rem' }}
          />
          <Category
            category={project.category}
            style={{ marginTop: '1.5rem' }}
            className="lg-hide"
          />
          <S.Description>{project.description}</S.Description>

          <S.Container>
            <S.Main>
              <ProjectOverviewCard project={project} />
              <PRepTeamCard pRep={pRep} className="lg-hide" />
              <ProjectDescriptionCard project={project} />

              {(project.updates || project.final_update) && (
                <ProjectUpdatesCard project={project} />
              )}

              <S.Separator className="md-hide" />
              <ProjectFeedback
                project={project}
                onLoadProject={loadProject}
                className="project-feedback"
              />
              <S.Separator className="md-hide" />

              <RelatedProjectsCard
                project={project}
                relatedProjects={relatedProjects}
                className="md-hide"
              />
            </S.Main>

            <S.Sidebar className="lg-show">
              <PRepTeamCard pRep={pRep} />
              <RelatedProjectsCard project={project} relatedProjects={relatedProjects} />
            </S.Sidebar>
          </S.Container>
        </>
      ) : (
        <>
          <H1>Project not found</H1>
          <Text style={{ marginTop: '2rem' }}>The project '{projectSlug}' doesn't exist.</Text>
        </>
      )}
    </Layout>
  );
}

function ProjectOverviewCard({ project, ...props }) {
  return (
    <S.Card {...props}>
      <H2>Project overview</H2>
      <S.ProjectOverview>
        <S.ProjectOverviewItem>
          <H6>Status</H6>
          <ProjectStatus status={project.status} />
        </S.ProjectOverviewItem>
        <S.OverviewSeparator />
        <S.ProjectOverviewItem>
          <H6>Completed</H6>
          <Completion completed={project.progress} />
        </S.ProjectOverviewItem>
        <S.OverviewSeparator />
        <S.ProjectOverviewItem>
          <H6 className="no-wrap">Project timeline</H6>
          <Text small className="no-wrap">
            {format(new Date(project.start_date), DATE_FORMAT_SHORTER)}&nbsp;-&nbsp;
            {format(new Date(project.end_date), DATE_FORMAT_SHORTER)}
          </Text>
        </S.ProjectOverviewItem>
        <S.OverviewSeparator />
        <S.ProjectOverviewItem>
          <H6 className="no-wrap">Last updated</H6>
          <Text small className="no-wrap">
            {format(new Date(project.updated_date), DATE_FORMAT)}
          </Text>
        </S.ProjectOverviewItem>
      </S.ProjectOverview>
    </S.Card>
  );
}

function PRepTeamCard({ pRep, ...props }) {
  return (
    <S.Card {...props}>
      <H2>P-Rep team</H2>
      <S.RankBanner rank={pRep.rank} />
      <S.PRepDetail>
        <LogoWrapper>
          <Logo src={pRep.logo ? getLogoProxy(pRep.logo) : noLogo} alt={`${pRep.name} logo`} />
        </LogoWrapper>
        <div style={{ marginLeft: '1.5rem' }}>
          <H4>{pRep.name}</H4>
          <Text muted>
            {pRep.city}, {pRep.country}
          </Text>
        </div>
      </S.PRepDetail>
      <S.PRepLink to={`/preps/${pRep.slug}`}>View more of their projects</S.PRepLink>
    </S.Card>
  );
}

function ProjectDescriptionCard({ project, ...props }) {
  return (
    <S.Card {...props}>
      <H2 style={{ marginBottom: '2rem' }}>Description</H2>
      <EmbeddedContent content={project.details} collapsedLines={4} />
    </S.Card>
  );
}

function ProjectUpdatesCard({ project, ...props }) {
  return (
    <S.Card {...props}>
      <H2 style={{ marginBottom: '2rem' }}>Updates</H2>
      {project.updates && (
        <S.ProjectUpdate>
          <H4 style={{ marginBottom: '1rem' }}>Update</H4>
          <EmbeddedContent content={project.updates} collapsedLines={3} />
        </S.ProjectUpdate>
      )}
      {project.final_update && (
        <S.ProjectUpdate>
          <H4 style={{ marginBottom: '1rem' }}>Final update</H4>
          <EmbeddedContent content={project.final_update} collapsedLines={3} />
        </S.ProjectUpdate>
      )}
    </S.Card>
  );
}

function RelatedProjectsCard({ project, relatedProjects, ...props }) {
  return (
    <S.Card {...props}>
      <H2>More {project.category.toLowerCase()} projects</H2>
      {relatedProjects.map(project => (
        <S.RelatedProject key={project.id}>
          <H5 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <UnstyledLink to={`/projects/${project.slug}`}>{project.name}</UnstyledLink>
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
      <S.RelatedProjectsLinkWrapper>
        <S.RelatedProjectsLink to={`/projects?categories=${project.category}`}>
          View all {project.category.toLowerCase()} projects
        </S.RelatedProjectsLink>
      </S.RelatedProjectsLinkWrapper>
    </S.Card>
  );
}

export default ProjectDetailPage;
