import React, { useEffect, useReducer, useState } from 'react';
import { take } from 'lodash-es';
import Badge from 'components/Badge';
import { Card, CardList } from 'components/Cards';
import Category from 'components/Category';
import Layout from 'components/Layout';
import { Logo, LogoWrapper } from 'components/Logo';
import { usePReps } from 'components/PReps';
import SearchHeader from 'components/SearchHeader';
import { H2, Text, UnstyledLink } from 'components/Typography';
import { palette } from 'utils/designTokens';
import { FILTER_ACTIONS, PREP_FILTERS, PREP_ORDERINGS, pRepFilterReducer } from 'utils/filters';
import * as S from './PRepList.styles';
import PRepSearch from 'components/PRepSearch';

function PRepListPage() {
  const { getPReps, hasPReps, isLoading } = usePReps();
  const [pReps, setPReps] = useState([]);
  const [filteredPReps, setFilteredPReps] = useState([]);
  const [filters, filtersDispatch] = useReducer(pRepFilterReducer, PREP_FILTERS);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (hasPReps) setPReps(getPReps());
  }, [hasPReps]); // eslint-disable-line

  useEffect(() => {
    const filtered = pReps.filter(pRep => {
      if (filters.query) {
        const query = filters.query.toLowerCase();
        if (
          !(
            pRep.name.toLowerCase().includes(query) ||
            pRep.city.toLowerCase().includes(query) ||
            pRep.country.toLowerCase().includes(query)
          )
        ) {
          return false;
        }
      }

      if (
        filters.categories.length &&
        !(
          filters.categories.includes(pRep.main_category) ||
          filters.categories.includes(pRep.sub_category)
        )
      )
        return false;

      return true;
    });

    const ordered = filters.order.fn(filtered);

    setFilteredPReps(take(ordered, filters.limit));
  }, [filters, pReps]);

  useEffect(() => {
    const tags = [];
    if (filters.query) {
      tags.push({
        label: filters.query,
        rm: () => filtersDispatch({ type: FILTER_ACTIONS.SET_QUERY, payload: '' }),
      });
    }
    if (filters.categories) {
      tags.push(
        ...filters.categories.map(category => ({
          label: category,
          rm: () => filtersDispatch({ type: FILTER_ACTIONS.REMOVE_CATEGORY, payload: category }),
        }))
      );
    }
    setTags(tags);
  }, [filters]);

  function handleChangeOrdering(orderValue) {
    const order = Object.values(PREP_ORDERINGS).find(({ value }) => value === orderValue);
    filtersDispatch({ type: FILTER_ACTIONS.SET_ORDER, payload: order });
  }

  return (
    <Layout>
      <S.Container>
        <PRepSearch filters={filters} dispatch={filtersDispatch} />

        <S.Listing>
          <SearchHeader
            title="P-Reps"
            tags={tags}
            order={filters.order.value}
            orderings={Object.values(PREP_ORDERINGS)}
            onChangeOrdering={handleChangeOrdering}
          />

          {hasPReps && (
            <CardList style={{ marginTop: '2rem' }}>
              {filteredPReps.map(pRep => (
                <Card key={pRep.address}>
                  <LogoWrapper>
                    {pRep.logo && <Logo src={pRep.logo} alt={`${pRep.name} logo`} />}
                  </LogoWrapper>

                  <S.PRepDetails>
                    <H2>
                      <UnstyledLink to={pRep.address}>{pRep.name}</UnstyledLink>
                    </H2>
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
                      <Text style={{ color: palette.white, fontWeight: 600 }}>{pRep.rank}</Text>
                    </S.RankBanner>
                    <Badge>{pRep.rank <= 22 ? 'Main' : 'Sub'} P-Rep</Badge>
                  </S.PRepRank>
                </Card>
              ))}
            </CardList>
          )}

          {!hasPReps && isLoading && <div style={{ marginTop: '2rem' }}>Loading...</div>}
        </S.Listing>
      </S.Container>
    </Layout>
  );
}

export default PRepListPage;
