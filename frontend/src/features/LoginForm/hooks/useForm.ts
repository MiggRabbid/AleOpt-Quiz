import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { schema } from '../config';
import { routes } from '@/app/router/routes';

import type { FormData } from '../config';
import { useAuth } from '@/app/api/hooks';

export const useLoginForm = () => {
  // const router = useRouter();

  const { mutateAsync } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isSubmitting || isLoading) setIsFetching(true);
  }, [isSubmitting, isLoading]);

  const onSubmit = async ({ username, password }: FormData) => {
    mutateAsync({ username, password })
      .then(() => {
        console.log('Success');
      })
      .catch(() => {
        console.log('Error');
      });
  };

  const redirect = (role: string) => {
    // if (!role) return;
    // switch (role) {
    //   case 'Admin':
    //   case 'Owner':
    //     router.replace(routes.admin);
    //     break;
    //   default:
    //     router.replace(routes.profile);
    // }
  };

  return { register, handleSubmit, errors, isFetching, onSubmit, redirect };
};
