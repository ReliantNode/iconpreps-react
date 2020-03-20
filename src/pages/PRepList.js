import React, { useEffect, useReducer, useState } from 'react';
import { take } from 'lodash-es';
import Badge from 'components/Badge';
import { Card, CardList } from 'components/Cards';
import Category from 'components/Category';
import FiltersHeader from 'components/FiltersHeader';
import Layout from 'components/Layout';
import { Logo, LogoWrapper } from 'components/Logo';
import { usePReps } from 'components/PReps';
import RankBanner from 'components/RankBanner';
import SearchHeader from 'components/SearchHeader';
import { H5, H6, Text, UnstyledLink } from 'components/Typography';
import { FILTER_ACTIONS, PREP_FILTERS, PREP_ORDERINGS, pRepFilterReducer } from 'utils/filters';
import * as S from './PRepList.styles';
import PRepSearch from 'components/PRepSearch';

function PRepListPage() {
  const { getPReps, hasPReps, isLoading } = usePReps();
  const [pReps, setPReps] = useState([]);
  const [filteredPReps, setFilteredPReps] = useState([]);
  const [filters, filtersDispatch] = useReducer(pRepFilterReducer, PREP_FILTERS);
  const [tags, setTags] = useState([]);
  const [isShowingFilters, setIsShowingFilters] = useState(false);

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
        label: `Search for: ${filters.query}`,
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
        <S.Filters showing={isShowingFilters}>
          <FiltersHeader
            order={filters.order.value}
            orderings={Object.values(PREP_ORDERINGS)}
            onChangeOrdering={handleChangeOrdering}
            onCloseFilters={() => setIsShowingFilters(false)}
          />
          <PRepSearch filters={filters} dispatch={filtersDispatch} />
        </S.Filters>

        <S.Listing>
          <SearchHeader
            title="P-Reps"
            tags={tags}
            order={filters.order.value}
            orderings={Object.values(PREP_ORDERINGS)}
            onChangeOrdering={handleChangeOrdering}
            onShowFilters={() => setIsShowingFilters(true)}
          />

          {hasPReps && (
            <CardList style={{ marginTop: '2rem' }}>
              {filteredPReps.map(pRep => (
                <Card key={pRep.address}>
                  <S.LogoAndDetails>
                    <LogoWrapper>
                      {pRep.logo && <Logo src={pRep.logo} alt={`${pRep.name} logo`} />}
                    </LogoWrapper>

                    <S.PRepDetails>
                      <S.PRepName>
                        <UnstyledLink to={pRep.address}>{pRep.name}</UnstyledLink>
                      </S.PRepName>
                      <Text muted>
                        {pRep.city}, {pRep.country}
                      </Text>
                    </S.PRepDetails>
                  </S.LogoAndDetails>

                  {pRep.main_category ? (
                    <S.PRepCategories>
                      <Category category={pRep.main_category} className="category main-category" />
                      {pRep.sub_category && (
                        <Category category={pRep.sub_category} className="category sub-category" />
                      )}
                    </S.PRepCategories>
                  ) : (
                    <div style={{ flex: 1 }} />
                  )}

                  <S.PRepRank>
                    <S.PRepRankText>
                      <H6>Rank</H6>
                      <H5>#{pRep.rank}</H5>
                    </S.PRepRankText>
                    <RankBanner rank={pRep.rank} className="rank-banner" />
                    <Badge>{pRep.rank <= 22 ? 'Main' : 'Sub'} P-Rep</Badge>
                  </S.PRepRank>
                </Card>
              ))}
            </CardList>
          )}

          {!hasPReps && isLoading && <S.MessageText>Loading...</S.MessageText>}
          {hasPReps && !filteredPReps.length && (
            <S.MessageText>No P-Reps found matching the search criteria.</S.MessageText>
          )}
        </S.Listing>
      </S.Container>
    </Layout>
  );
}

export default PRepListPage;
