import React, { useEffect, useState } from 'react';
import Badge from 'components/Badge';
import { Card, CardList } from 'components/Cards';
import Category from 'components/Category';
import Layout from 'components/Layout';
import { Logo, LogoWrapper } from 'components/Logo';
import { usePReps } from 'components/PReps';
import SearchHeader from 'components/SearchHeader';
import { H2, Text } from 'components/Typography';
import { palette } from 'utils/designTokens';
import * as S from './PRepList.styles';

function PRepListPage() {
  const { getPReps, hasPReps, isLoading } = usePReps();
  const [pReps, setPReps] = useState([]);

  useEffect(() => {
    if (hasPReps) {
      setPReps(getPReps());
    }
  }, [getPReps, hasPReps]);

  return (
    <Layout>
      <SearchHeader title="P-Reps" />

      {hasPReps && (
        <CardList style={{ marginTop: '2rem' }}>
          {pReps.map(pRep => (
            <Card key={pRep.address}>
              <LogoWrapper>
                {pRep.logo && <Logo src={pRep.logo} alt={`${pRep.name} logo`} />}
              </LogoWrapper>
              <S.PRepDetails>
                <H2>{pRep.name}</H2>
                <Text muted style={{ marginTop: '1rem' }}>
                  {pRep.city}, {pRep.country}
                </Text>
              </S.PRepDetails>
              {pRep.main_category ? (
                <S.PRepCategories>
                  <Category category={pRep.main_category} />
                  {pRep.sub_category && (
                    <Category category={pRep.sub_category} style={{ marginLeft: '1.5rem' }} />
                  )}
                </S.PRepCategories>
              ) : (
                <div style={{ flex: 1 }} />
              )}
              <S.PRepRank>
                <S.RankBanner>
                  <Text style={{ color: palette.white }}>
                    <b>{pRep.rank}</b>
                  </Text>
                </S.RankBanner>
                <Badge>{pRep.rank <= 22 ? 'Main' : 'Sub'} P-Rep</Badge>
              </S.PRepRank>
            </Card>
          ))}
        </CardList>
      )}
      {!hasPReps && isLoading && <div style={{ marginTop: '2rem' }}>Loading...</div>}
    </Layout>
  );
}

export default PRepListPage;
