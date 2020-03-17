import React, { useEffect, useState } from 'react';
import { useParams } from '@reach/router';
import Layout from 'components/Layout';
import { usePReps } from 'components/PReps';
import ProjectList from 'components/ProjectList';
import { H1 } from 'components/Typography';
import * as S from './PRepDetail.styles';

function PRepDetailPage() {
  const { pRepAddress } = useParams();
  const { getPReps, hasPReps } = usePReps();
  const [pRep, setPRep] = useState(null);

  useEffect(() => {
    if (hasPReps) {
      const pRep = getPReps().find(pRep => pRep.address === pRepAddress);
      setPRep(pRep);
    }
  }, [hasPReps]); // eslint-disable-line

  function filterByPRep(project) {
    return project.prep_address === pRepAddress;
  }

  return (
    <Layout>
      <S.Header>
        <H1>P-Rep Details</H1>
      </S.Header>
      <S.Separator />

      {pRep && (
        <ProjectList
          title={`Projects by ${pRep.name}`}
          filtersToUse={{ query: true, category: true, status: true }}
          additionalFilter={filterByPRep}
        />
      )}
    </Layout>
  );
}

export default PRepDetailPage;
