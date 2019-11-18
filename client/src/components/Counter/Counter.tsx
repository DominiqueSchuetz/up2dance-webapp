import React from "react";
import { Grid } from "semantic-ui-react";

const Counter: React.FC = () => {
	return (
		<section>
			<Grid celled="internally" columns={1} textAlign="center" relaxed divided stretched stackable container>
				<Grid.Row stretched>
					<Grid.Column width={16}>
						<h1>HEADLINE ONE</h1>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<Grid celled="internally" columns={4} textAlign="center" relaxed divided stretched stackable container>
				<Grid.Row stretched>
					<Grid.Column width={4}>
						<h3>14 Tage</h3>
					</Grid.Column>
					<Grid.Column width={4}>
						<h3>12 Stunden</h3>
					</Grid.Column>
					<Grid.Column width={4}>
						<h3>43 Minuten</h3>
					</Grid.Column>
					<Grid.Column width={4}>
						<h3>15 Sekunden</h3>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</section>
	);
};

export default Counter;
