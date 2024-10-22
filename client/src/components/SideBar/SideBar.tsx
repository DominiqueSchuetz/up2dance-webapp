import React from 'react';
import { Grid, Header, Image, Segment, Sidebar, StrictSidebarProps } from 'semantic-ui-react';

const SideBar: React.FC<StrictSidebarProps> = (props) => {
  const { animation, direction, visible } = props;
  return (
    <>
      <Sidebar as={Segment} animation={animation} direction={direction} visible={visible}>
        <Grid textAlign="center">
          <Grid.Row columns={1}>
            <Grid.Column>
              <Header as="h3">New Content Awaits</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid columns={3} divided>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
          </Grid>
        </Grid>
      </Sidebar>
    </>
  );
};

export default SideBar;
