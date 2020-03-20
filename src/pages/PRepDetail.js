import React, { useEffect, useState } from 'react';
import { useParams } from '@reach/router';
import githubIcon from 'assets/icons/github.svg';
import twitterIcon from 'assets/icons/twitter.svg';
import webIcon from 'assets/icons/web.svg';
import Badge from 'components/Badge';
import Layout from 'components/Layout';
import { Logo, LogoWrapper } from 'components/Logo';
import { usePReps } from 'components/PReps';
import ProjectList from 'components/ProjectList';
import RankBanner from 'components/RankBanner';
import { H1, Text } from 'components/Typography';
import { formatLargeNumber } from 'utils/formatNumber';
import * as S from './PRepDetail.styles';

function PRepDetailPage() {
  const { pRepAddress } = useParams();
  const { getPReps, hasPReps } = usePReps();
  const [pRep, setPRep] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hasPReps) {
      const pRep = getPReps().find(pRep => pRep.address === pRepAddress);
      setPRep(pRep);
      setIsLoading(false);
    }
  }, [hasPReps, pRepAddress]); // eslint-disable-line

  function filterByPRep(project) {
    return project.prep_address === pRepAddress;
  }

  return (
    <Layout>
      {pRep && (
        <>
          <S.Header>
            <div style={{ display: 'flex' }} className="lg-hide">
              <RankBanner
                rank={pRep.rank}
                style={{ position: 'absolute', top: '-8px', right: '2rem' }}
              />
              <Badge>{pRep.rank <= 22 ? 'Main' : 'Sub'} P-Rep</Badge>
            </div>

            <S.LogoAndDetails>
              <LogoWrapper>
                {pRep.logo && <Logo src={pRep.logo} alt={`${pRep.name} logo`} />}
              </LogoWrapper>

              <S.PRepDetails>
                <S.PRepName>{pRep.name}</S.PRepName>
                <Text muted>
                  {pRep.city}, {pRep.country}
                </Text>
              </S.PRepDetails>
            </S.LogoAndDetails>

            <S.PRepStats>
              <S.PRepStat>
                <Text heavy>{formatLargeNumber(pRep.votes)}</Text>
                <Text muted small>
                  Votes
                </Text>
              </S.PRepStat>
              <S.PRepStat>
                <Text heavy>{formatLargeNumber(pRep.voters)}</Text>
                <Text muted small>
                  Voters
                </Text>
              </S.PRepStat>
              <S.PRepStat>
                <Text heavy>{pRep.projects}</Text>
                <Text muted small>
                  Projects
                </Text>
              </S.PRepStat>
            </S.PRepStats>

            <S.PRepLinks>
              {pRep.twitter && (
                <S.PRepLink href={pRep.twitter} target="_blank" rel="noopener noreferrer">
                  <S.LinkIcon src={twitterIcon} alt="Twitter icon" />
                </S.PRepLink>
              )}
              {pRep.website && (
                <S.PRepLink href={pRep.website} target="_blank" rel="noopener noreferrer">
                  <S.LinkIcon src={webIcon} alt="Website icon" />
                </S.PRepLink>
              )}
              {pRep.github && (
                <S.PRepLink href={pRep.github} target="_blank" rel="noopener noreferrer">
                  <S.LinkIcon src={githubIcon} alt="GitHub icon" />
                </S.PRepLink>
              )}
            </S.PRepLinks>

            <S.PRepRank className="lg-show">
              <RankBanner rank={pRep.rank} style={{ marginTop: '-38px', marginLeft: '-10px' }} />
              <Badge>{pRep.rank <= 22 ? 'Main' : 'Sub'} P-Rep</Badge>
            </S.PRepRank>
          </S.Header>
          <S.Separator />

          <ProjectList
            title={`Projects by ${pRep.name}`}
            filtersToUse={{ query: true, category: true, status: true }}
            additionalFilter={filterByPRep}
          />
        </>
      )}

      {!(isLoading || pRep) && (
        <>
          <H1>P-Rep not found</H1>
          <Text style={{ marginTop: '2rem' }}>The P-Rep '{pRepAddress}' doesn't exist.</Text>
        </>
      )}
    </Layout>
  );
}

export default PRepDetailPage;
