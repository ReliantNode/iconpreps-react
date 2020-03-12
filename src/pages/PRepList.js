import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import banner from 'assets/banner.svg';
import Badge from 'components/Badge';
import { Card, CardList } from 'components/CardList';
import Layout from 'components/Layout';
import { usePReps } from 'components/PReps';
import SearchHeader from 'components/SearchHeader';
import { H2, Text } from 'components/Typography';
import { palette } from 'utils/designTokens';

const LogoWrapper = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  background: ${({ children }) => (!children ? palette.brand.primary : 'none')};
  border: 2px solid ${palette.gray.border};
  border-radius: 7.5rem;
  overflow: hidden;
`;

const Logo = styled.img`
  width: 7.5rem;
  height: 7.5rem;
`;

const PRepDetails = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 2.5rem 0 1.5rem;
`;

const PRepRank = styled.div`
  flex: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-left: 2.5rem;
  border-left: 1px solid ${palette.gray.border};
`;

const RankBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${banner});
  background-size: cover;
  width: 49px;
  height: 72px;
  margin-top: -33px;
  margin-left: -10px;

  ${Text} {
    margin-top: -1.2rem;
    margin-left: 0.8rem;
  }
`;

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
              <PRepDetails>
                <H2>{pRep.name}</H2>
                <Text muted style={{ marginTop: '1rem' }}>
                  {pRep.city}, {pRep.country}
                </Text>
              </PRepDetails>
              <PRepRank>
                <RankBanner>
                  <Text style={{ color: palette.white }}>
                    <b>{pRep.rank}</b>
                  </Text>
                </RankBanner>
                <Badge>{pRep.rank <= 20 ? 'Main' : 'Sub'} P-Rep</Badge>
              </PRepRank>
            </Card>
          ))}
        </CardList>
      )}
      {!hasPReps && isLoading && <div style={{ marginTop: '2rem' }}>Loading...</div>}
    </Layout>
  );
}

export default PRepListPage;
