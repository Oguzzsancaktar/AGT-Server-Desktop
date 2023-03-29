type PageName = 'home' | 'login';

const selectAppRoute = (pageName: PageName): string => {
  switch (pageName) {
    case 'home':
      return '/';
    case 'login':
      return '/login';
    default:
      return '/';
  }
};

export default selectAppRoute;
