import * as React from 'react';

export interface Props {
  story: string;
}

const StoreStory: React.SFC<Props> = ({story}) => {
  return (
    <section>
      {story}
    </section>
  );
};

export default StoreStory;
