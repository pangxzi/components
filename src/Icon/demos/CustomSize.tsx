import { Icon, StoryBook, useControls, useCreateStore, type IconProps } from '@datoou/components';
import * as LucideIcon from 'lucide-react';

export default () => {
  const store = useCreateStore();
  const control: IconProps | any = useControls(
    {
      icon: {
        options: LucideIcon,
        value: LucideIcon.Settings,
      },
      size: {
        options: ['large', 'normal', 'small'],
        value: 'large',
      },
      spin: false,
    },
    { store },
  );

  return (
    <StoryBook levaStore={store}>
      <Icon {...control} />
    </StoryBook>
  );
};
