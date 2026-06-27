// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Suspense } from 'react';

// project imports
import Spinner from 'src/pages/spinner/Spinner';

// ===========================|| LOADABLE - LAZY LOADING ||=========================== //

const Loadable = (Component: any) => (props: any) =>
(
  <Suspense fallback={<Spinner />}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
