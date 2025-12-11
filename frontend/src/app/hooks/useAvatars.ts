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
    fetch('/api/avatars')
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          return;
        }
        setAvatarsMap(data);
      });
  }, []);

  return { avatarsMap };
};
