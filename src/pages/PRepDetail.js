import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import noLogo from 'assets/no-logo.svg';
import githubIcon from 'assets/icons/github.svg';
import twitterIcon from 'assets/icons/twitter.svg';
import webIcon from 'assets/icons/web.svg';
import Badge from 'components/Badge';
import Layout from 'components/Layout';
import Loading from 'components/Loading';
import { Logo, LogoWrapper } from 'components/Logo';
import { usePReps } from 'components/PReps';
import ProjectList from 'components/ProjectList';
import RankBanner from 'components/RankBanner';
import { H1, Text } from 'components/Typography';
import { formatLargeNumber } from 'utils/formatNumber';
import { getLogoProxy } from 'utils/getLogoProxy';
import * as S from './PRepDetail.styles';

function PRepDetailPage() {
  const { pRepSlug } = useParams();
  const { getPReps, hasPReps } = usePReps();
  const [pRep, setPRep] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hasPReps) {
      setIsLoading(true);
      const pRep = getPReps().find(pRep => pRep.slug === pRepSlug);
      setPRep(pRep);
      setIsLoading(false);
    }
  }, [hasPReps, pRepSlug]); // eslint-disable-line

  const filterByPRep = useCallback(project => project.prep_address === pRep.address, [pRep]);

  return (
    <Layout>
      {pRep && (
        <>
          <S.Header>
            <div style={{ display: 'flex' }} className="lg-hide">
              <RankBanner
                rank={pRep.rank}
                style={{ position: 'absolute', top: '-8px', right: '1.9rem' }}
              />
              <Badge>{pRep.rank <= 22 ? 'Main' : 'Sub'} P-Rep</Badge>
            </div>

            <S.LogoAndDetails>
              <LogoWrapper>
                <Logo
                  src={pRep.logo ? getLogoProxy(pRep.logo) : noLogo}
                  alt={`${pRep.name} logo`}
                />
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
              <S.StatSeparator />
              <S.PRepStat>
                <Text heavy>{formatLargeNumber(pRep.voters)}</Text>
                <Text muted small>
                  Voters
                </Text>
              </S.PRepStat>
              <S.StatSeparator />
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
            showFilterCounts={false}
          />
        </>
      )}

      {!pRep && isLoading && <Loading style={{ marginTop: '8rem' }} />}
      {!(isLoading || pRep) && (
        <>
          <H1>P-Rep not found</H1>
          <Text style={{ marginTop: '2rem' }}>The P-Rep '{pRepSlug}' doesn't exist.</Text>
        </>
      )}
    </Layout>
  );
}

export default PRepDetailPage;
