const { camelCaseObject } = require('@edx/frontend-platform');

const processCourseSearchResult = (searchResultCourse) => {
  const camelCasedResult = camelCaseObject(searchResultCourse);

  return {
    activeCourseRun: {
      key: camelCasedResult.activeRunKey,
      type: camelCasedResult.activeRunType,
      marketingUrl: camelCasedResult.marketingUrl,
      minEffort: camelCasedResult.minEffort,
      maxEffort: camelCasedResult.maxEffort,
      weeksToComplete: camelCasedResult.weeksToComplete,
    },
    allowedIn: camelCasedResult.allowedIn,
    blockedIn: camelCasedResult.blockedIn,
    cardType: 'course',
    courseType: 'course',
    image: {
      src: camelCasedResult.cardImageUrl,
    },
    inProspectus: true,
    owners: camelCasedResult.owners,
    prospectusPath: (new URL(camelCasedResult.marketingUrl)).pathname,
    title: camelCasedResult.title,
    uuid: camelCasedResult.uuid,
    recentEnrollmentCount: camelCasedResult.recentEnrollmentCount,
    objectID: `course-${camelCasedResult.uuid}`,
    productSource: {
      slug: camelCasedResult.productSource,
    },
  };
};

export default processCourseSearchResult;
