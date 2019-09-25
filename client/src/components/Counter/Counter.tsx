import React, { Fragment } from "react";
import { Button, Container, Header, Icon, Image } from "semantic-ui-react";

const Counter: React.FC = (props) => {
	return (
		<section>
			<Container>
				<div>
					<Header textAlign="center" size="huge">
						Next Event
					</Header>
					<Header textAlign="center" size="huge">
						<Header.Content>24h : 56min : 36 sek</Header.Content>
					</Header>
				</div>
			</Container>
		</section>
	);
};

export default Counter;
