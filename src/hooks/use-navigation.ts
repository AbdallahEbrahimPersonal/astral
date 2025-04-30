import {
  useTransition,
  unstable_addTransitionType as addTransitionType,
} from 'react';
import { useRouter } from 'next/navigation';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type TransitionType = 'nav-forward' | 'nav-back' | 'nav-replace';

export const useNavigation = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const navigate = (
    path: string,
    options?: NavigateOptions & { transitionType?: TransitionType }
  ) => {
    startTransition(() => {
      const { transitionType, ...rest } = options || {};

      addTransitionType(transitionType || 'nav-replace');
      router.push(path, rest);
    });
  };

  return { isPending, navigate };
};
