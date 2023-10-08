import { Link, useLocation } from 'react-router-dom';

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbItems = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;

    return (
      <li key={name}>
        {isLast ? (
          <span>{name}</span>
        ) : (
          <Link to={routeTo}>{name}</Link>
        )}
      </li>
    );
  });

  return (
    <div className="text-sm font-light text-gray-400 breadcrumbs">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {breadcrumbItems}
      </ul>
    </div>
  );
};

export default BreadCrumb;
