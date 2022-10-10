import { useEffect, useState } from 'react';

import Hero from 'components/pages/team/hero';
import Topfab from 'components/shared/FAB/topfab';
import LayoutMain from 'layouts/layouts/layout-main';

const Myteam = () => {
  const [info, setInfo] = useState(false);
  useEffect(() => {
    (async () => {
      setInfo(
        await (
          await fetch(`/api/team`, {
            credentials: 'include',
          })
        ).json()
      );
    })();
  }, []);

  if (!info) return <></>;
  return (
    <LayoutMain
      seo={{
        isRobotsNoindexPage: true,
      }}
      absolute={false}
      overflow
      withoutFooter
    >
      <Hero info={info} />
      <Topfab />
    </LayoutMain>
  );
};

export default Myteam;
