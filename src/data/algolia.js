import { getConfig } from '@edx/frontend-platform';
import algoliasearch from 'algoliasearch';

const METERS_IN_ONE_MILE = 1609;
const PRECISION_RADIUS_MILES = 50;

// initialize Algolia workers
const initializeSearchClient = () => algoliasearch(
  getConfig().ALGOLIA_APP_ID,
  getConfig().ALGOLIA_SEARCH_API_KEY,
);

const getLocationRestrictionFilter = (userCountry) => (
  `NOT blocked_in:"${userCountry}" AND (allowed_in:"null" OR allowed_in:"${userCountry}")`
);

const getPrecisionRadius = () => METERS_IN_ONE_MILE * PRECISION_RADIUS_MILES;

export {
  initializeSearchClient,
  getLocationRestrictionFilter,
  getPrecisionRadius,
};
