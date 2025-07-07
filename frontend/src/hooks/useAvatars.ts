import { useEffect, useState } from 'react';

type TypeAvatarsMap = {
  females: Record<string, string>;
  males: Record<string, string>;
};

export const useAvatars = () => {
  const [avatarsMap, setAvatarsMap] = useState<TypeAvatarsMap>({
    females: {},
    males: {},
  });

  useEffect(() => {
    console.log('----- useAvatars useEffect');
    fetch('/api/avatars')
      .then((res) => res.json())
      .then((data) => {
        console.log('data -', !!data);
        if (!data) {
          console.log('if  -', !data);
          return;
        }
        console.log('else -', !!data);
        setAvatarsMap(data);
      });
    console.groupEnd();
  }, []);

  return { avatarsMap };
};
