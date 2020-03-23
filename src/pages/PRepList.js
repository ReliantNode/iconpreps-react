import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { take } from 'lodash-es';
import { useHistory, useLocation } from 'react-router-dom';
import noLogo from 'assets/no-logo.svg';
import Badge from 'components/Badge';
import { Card, CardList } from 'components/Cards';
import Category from 'components/Category';
import FiltersHeader from 'components/FiltersHeader';
import Layout from 'components/Layout';
import Loading from 'components/Loading';
import { Logo, LogoWrapper } from 'components/Logo';
import { usePReps } from 'components/PReps';
import SearchHeader from 'components/SearchHeader';
import { H5, H6, Text, UnstyledLink } from 'components/Typography';
import { sizes } from 'utils/designTokens';
import {
  buildPRepFilterQuery,
  mergePRepFiltersWithQuery,
  PREP_FILTERS,
  PREP_ORDERINGS,
} from 'utils/filters';
import { getLogoProxy } from 'utils/getLogoProxy';
import * as S from './PRepList.styles';
import PRepSearch from 'components/PRepSearch';

const INITIAL_FILTERS = mergePRepFiltersWithQuery(PREP_FILTERS, window.location.search);

function PRepListPage() {
  const history = useHistory();
  const location = useLocation();
  const { getPReps, hasPReps, isLoading } = usePReps();
  const [pReps, setPReps] = useState([]);
  const [filteredPReps, setFilteredPReps] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [tags, setTags] = useState([]);
  const [isShowingFilters, setIsShowingFilters] = useState(false);
  const [hasMorePReps, setHasMorePReps] = useState(false);
  const filtersEl = useRef();

  useEffect(() => {
    if (hasPReps) setPReps(getPReps());
  }, [hasPReps]); // eslint-disable-line

  useEffect(() => {
    setFilters(mergePRepFiltersWithQuery(PREP_FILTERS, location.search));
  }, [location.search]);

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
        !filters.categories.find(category => pRep.categories.includes(category))
      )
        return false;

      return true;
    });

    const ordered = filters.order.fn(filtered);

    const limited = take(ordered, filters.limit);
    setHasMorePReps(limited < ordered);

    setFilteredPReps(limited);
  }, [filters, pReps]);

  useEffect(() => {
    const tags = [];
    if (filters.query) {
      tags.push({
        label: `Search for: ${filters.query}`,
        rm: () => onFiltersChange({ query: '', limit: 20 }),
      });
    }
    if (filters.categories) {
      tags.push(
        ...filters.categories.map(category => ({
          label: category,
          rm: () => handleRemoveCategory(category),
        }))
      );
    }
    setTags(tags);
  }, [filters]);

  useLayoutEffect(() => {
    if (isShowingFilters) {
      const scrollTop = Math.abs(document.body.getBoundingClientRect().top) / 10;
      const headerOffset = Math.max(sizes.header - scrollTop, 0);
      filtersEl.current.style.top = `${headerOffset}rem`;
      filtersEl.current.style.paddingBottom = `${headerOffset}rem`;
    }

    document.body.style.overflow = isShowingFilters ? 'hidden' : '';
  }, [isShowingFilters]);

  function onFiltersChange(changedFilters) {
    const filterQuery = buildPRepFilterQuery({ ...filters, ...changedFilters });
    if (filterQuery !== location.search) {
      history.push(location.pathname + (filterQuery ? `?${filterQuery}` : ''));
    }
  }

  function handleChangeOrdering(orderValue) {
    onFiltersChange({ order: orderValue, limit: 20 });
  }

  function handleRemoveCategory(category) {
    onFiltersChange({ categories: filters.categories.filter(c => c !== category), limit: 20 });
  }

  function handleLoadMore() {
    onFiltersChange({ limit: 999 });
  }

  return (
    <Layout>
      <S.Container>
        <S.Filters showing={isShowingFilters} ref={filtersEl}>
          <FiltersHeader
            order={filters.order.value}
            orderings={Object.values(PREP_ORDERINGS)}
            onChangeOrdering={handleChangeOrdering}
            onCloseFilters={() => setIsShowingFilters(false)}
          />
          <PRepSearch filters={filters} onChange={onFiltersChange} />
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
                      <Logo
                        src={pRep.logo ? getLogoProxy(pRep.logo) : noLogo}
                        alt={`${pRep.name} logo`}
                      />
                    </LogoWrapper>

                    <S.PRepDetails>
                      <S.PRepName>
                        <UnstyledLink to={`/preps/${pRep.slug}`}>{pRep.name}</UnstyledLink>
                      </S.PRepName>
                      <Text muted>
                        {pRep.city}, {pRep.country}
                      </Text>
                    </S.PRepDetails>
                  </S.LogoAndDetails>

                  <S.PRepCategories>
                    {pRep.categories.length ? (
                      <>
                        <Category
                          category={pRep.categories[0]}
                          className="category main-category"
                        />
                        {pRep.categories.length > 1 && (
                          <Category
                            category={pRep.categories[1]}
                            className="category sub-category"
                          />
                        )}
                      </>
                    ) : (
                      <Text small muted className="no-category">
                        No projects added
                      </Text>
                    )}
                  </S.PRepCategories>

                  <S.PRepRank>
                    <S.PRepRankText>
                      <H6>Rank</H6>
                      <H5>#{pRep.rank}</H5>
                    </S.PRepRankText>
                    <S.RankBanner rank={pRep.rank} className="md-show" />
                    <Badge>{pRep.rank <= 22 ? 'Main' : 'Sub'} P-Rep</Badge>
                  </S.PRepRank>
                </Card>
              ))}
            </CardList>
          )}

          {hasMorePReps && (
            <S.LoadMoreButton type="button" onClick={handleLoadMore}>
              Load more P-Reps…
            </S.LoadMoreButton>
          )}

          {!hasPReps && isLoading && <Loading style={{ marginTop: '8rem' }} />}
          {hasPReps && !filteredPReps.length && (
            <S.MessageText>No P-Reps found matching the search criteria.</S.MessageText>
          )}
        </S.Listing>
      </S.Container>
    </Layout>
  );
}

export default PRepListPage;
