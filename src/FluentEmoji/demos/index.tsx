import {
  FluentEmoji,
  StoryBook,
  getEmoji,
  getEmojiNameByCharacter,
  useControls,
  useCreateStore,
  type FluentEmojiProps,
} from '@datoou/components';
import { Button, Flex } from 'antd';

export default () => {
  const store = useCreateStore();
  const control: FluentEmojiProps | any = useControls(
    {
      emoji: '😺',
      size: {
        max: 128,
        min: 16,
        step: 1,
        value: 64,
      },
    },
    { store },
  );

  return (
    <StoryBook levaStore={store}>
      <Flex align={'center'} vertical gap={8}>
        <Flex gap={16} vertical>
          <FluentEmoji type={'anim'} {...control} />
          <FluentEmoji type={'3d'} {...control} />
          <FluentEmoji type={'modern'} {...control} />
          <FluentEmoji type={'flat'} {...control} />
          <FluentEmoji type={'high-contrast'} {...control} />
          <FluentEmoji type={'pure'} {...control} />
        </Flex>
        <Button icon={getEmoji(control.emoji)}>{getEmojiNameByCharacter(control.emoji)}</Button>
      </Flex>
    </StoryBook>
  );
};
