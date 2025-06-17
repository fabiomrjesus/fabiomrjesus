import { Route, Routes } from "react-router-dom";
import type { AppRoute } from "../models/route";

export function renderRoutes(routes:AppRoute[])
{
    const flatRoutes = flattenRoutes(routes, '');
    return <Routes>
      {flatRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
}

const flattenRoutes = (routes:AppRoute[], parentPath = '') => {
  const flattened:AppRoute[] = [];

  routes.forEach(({ path, element, children }) => {
    // Compute full path: avoid double slashes, ensure root stays '/'
    const fullPath = parentPath === '/' ? `/${path}` : `${parentPath}/${path}`;
    // If path is just '/', keep as '/'
    const normalizedPath = path === '/' ? '/' : fullPath.replace(/\/\//g, '/');

    flattened.push({ path: normalizedPath === '' ? '/' : normalizedPath, element });

    if (children) {
      // Recursively flatten children, passing current full path as parentPath
      const childParent = normalizedPath === '/' ? '' : normalizedPath;
      flattened.push(...flattenRoutes(children, childParent));
    }
  });

  return flattened;
};