import { useEffect, useState } from 'react';

import algoliasearchHelper from 'algoliasearch-helper';

import {
  getLocationRestrictionFilter,
  getPrecisionRadius,
  initializeSearchClient,
} from '../../../data/algolia';
import isOneTrustFunctionalCookieEnabled from '../../../data/utils/oneTrust';
import processCourseSearchResult from '../algoliaResultsParser';
import {
  LEVEL_FACET, MAX_RECOMMENDATIONS, PRODUCT_FACET, PRODUCT_TYPE_COURSE,
} from '../constants';

const INDEX_NAME = process.env.ALGOLIA_AUTHN_RECOMMENDATIONS_INDEX;

/**
 * This hooks returns Algolia recommendations only if functional cookies are enabled. * @param userCountry
 * @param educationLevel
 * @param shouldFetch
 * @returns {{isLoading: boolean, recommendations: *[]}}
 */
const useAlgoliaRecommendations = (userCountry, educationLevel) => {
  const functionalCookiesEnabled = isOneTrustFunctionalCookieEnabled();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!functionalCookiesEnabled) {
      setIsLoading(false);
      return;
    }

    const getSearchFiltersQueryString = () => {
      if (userCountry) {
        return getLocationRestrictionFilter(userCountry);
      }
      return '';
    };

    const algoliaSearchParams = {
      facets: [LEVEL_FACET, PRODUCT_FACET],
      filters: getSearchFiltersQueryString(),
      aroundLatLngViaIP: true,
      aroundRadius: 'all',
      aroundPrecision: [{ from: 0, value: getPrecisionRadius() }],
    };

    const searchClient = initializeSearchClient();
    const searchHelper = algoliasearchHelper(
      searchClient,
      INDEX_NAME,
      algoliaSearchParams,
    );

    searchHelper.addFacetRefinement(PRODUCT_FACET, PRODUCT_TYPE_COURSE);
    if (educationLevel) {
      searchHelper.addFacetRefinement(LEVEL_FACET, educationLevel);
    }

    const searchIndex = () => {
      searchHelper.search();
    };

    searchIndex();

    searchHelper.on('result', ({ results }) => {
      const parsedCourses = results.hits.slice(0, MAX_RECOMMENDATIONS).map(
        (course) => processCourseSearchResult(course),
      );
      setRecommendations(parsedCourses);
      setIsLoading(false);
    });

    searchHelper.on('error', () => setIsLoading(false));
  }, [educationLevel, functionalCookiesEnabled, userCountry]);

  return {
    recommendations,
    isLoading,
  };
};

export default useAlgoliaRecommendations;
